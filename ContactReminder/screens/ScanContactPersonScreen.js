import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Platform
} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {RepositoryFactory} from '../API/RepositoryFactory';
import {Popup} from "popup-ui";
import Constants from 'expo-constants';
import Root from "popup-ui/src/basic/Root";

const deviceID = Constants.deviceId;
const contactedUser = RepositoryFactory.get('contactedUsersRepository');

export default class ScanContactPersonScreen extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      hasPermission: null,
    };
  }

  async postscannedID(scannedId) {

    try {
      console.log("HALLO");
      const res = await contactedUser.postcontactedUsers(deviceID, scannedId);

    } catch (error) {
      Alert.alert("Problem!", 'Bitte den QR-Code erneut scannen!',[{text: 'OK', onPress: () => console.log('OK Pressed')},]);
      console.log("Error occured: ", error);
    }
  }

  async componentDidMount() {
    this._isMounted = true;
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    if (this._isMounted) {
      this.setState({hasPermission: status === 'granted'});
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  handleBarCodeScanned = async ({type, data}) =>{
    try {
      await this.postscannedID(data);
    }
    catch(error) {

    }
    this.props.navigation.goBack();
  };

  render() {
    const {hasCameraPermission} = this.state;

    if (hasCameraPermission === null) {
      return <Text> Requesting for camera permission </Text>;
    }
    if (hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    }

    return (
        <Root>
      <View style={styles.container}>
        <View style={styles.getStartedContainer}>
          <Text style={{marginBottom: 10}}>Scanne den Barcode einer anderen Person, um euch zu verbinden.</Text>
        </View>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={{flex: 1, marginBottom: 20}}
        />
      </View>
        </Root>
    );
  }
}

ScanContactPersonScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
