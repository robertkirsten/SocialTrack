import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RepositoryFactory } from '../API/RepositoryFactory';
import { Root, Popup } from 'popup-ui'
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Elements from 'react-native-elements';




const deviceId = Constants.deviceId;

const infectedUser = RepositoryFactory.get('infectedUser');

export default class HomeScreen extends React.Component {

  componentWillUnmount() {

  }

  state ={
    isInfected: true,
  };

  render() {
    return (
        <Root>
        <View style={styles.container}>


          <View>

          </View>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Sie haben sich infiziert? </Text>
            <Text style={styles.getStartedText}>Dann melden Sie dies bitte hier, um sich und andere zu schützen! </Text>
            <Text style={styles.getStartedText}> </Text>
            <TouchableOpacity
                style={{
                  borderWidth:1,
                  borderColor:'rgba(0,0,0,0.2)',
                  alignItems:'center',
                  justifyContent:'center',
                  width:100,
                  height:100,
                  backgroundColor:'#ff7b79',
                  borderRadius:50,
                  text: 'SE'
                }}
                onPress={() => postInfectionMethod(5)}
            >
              <Icon name={"close"}  size={60} color="#ff0000" />
            </TouchableOpacity>
            <Text style={styles.getStartedText}> </Text>
            <Text style={{fontWeight: 'bold'}}> Hier Klicken!</Text>
          </View>
        </ScrollView>

      </View>
        </Root>
    );
  }
}



async function postInfectionMethod(userId){
  return await infectedUser.postInfectedUser(5).then(res => {
    console.log("Infection succesfully added");
    Popup.show({
      type: 'Success',
      callback: () => Popup.hide(),
      title: 'Sie haben hiermit 1000 Leben gerettet! Dank Dir endet die Quarantäne!',
    });
    console.log(res.data);
  })
      .catch(error => {
        Popup.show({
          type: 'Danger',
          callback: () => Popup.hide(),
          title: 'Upload failed',
          textBody: 'Sorry! Please upload again!',
        });
        console.log("Error occured: ", error);
      });
}
HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infectedButton: {
    width: 100,
    borderRadius: 5,
    padding: 10,
    color: "#f03434",
    borderColor: "#f03434",
    borderWidth: 2,

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
