import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ToastAndroid,
  TouchableOpacity, Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Root, Popup } from 'popup-ui';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as AwesomeButton from 'react-awesome-button';
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
import { CustomButton } from '../components/customButton';

import { RepositoryFactory } from '../API/RepositoryFactory';

const { deviceId } = Constants;

const infectedUser = RepositoryFactory.get('infectedUser');
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.state = {
      healthyDialogVisible: false,
      infectedDialogVisible: false,
    };
  }


  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  postInfectionMethod(userId) {
    if (this._isMounted) {
      return infectedUser.postInfectedUser(userId)
        .then((res) => {
          /*
          console.log('Infection succesfully added');
          Popup.show({
            type: 'Success',
            callback: () => Popup.hide(),
            title: 'Sie haben hiermit 1000 Leben gerettet! Dank Dir endet die Quarantäne!',
          });
          */

          this.setState({ infectedDialogVisible: true });

          /* Alert.alert('Lebensretter!', 'Sie haben hiermit 1000 Leben gerettet! Dank Dir endet die Quarantäne!', [{
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          }]); */
          console.log(res.data);
        })
        .catch((error) => {
          Popup.show({
            type: 'Danger',
            callback: () => Popup.hide(),
            title: 'Upload failed',
            textBody: 'Sorry! Please upload again!',
          });
          console.log('Error occured: ', error);
        });
    }
  }

  postHealthenedMethod(userId) {
    if (this._isMounted) {
      return infectedUser.postHealthenedUser(userId)
        .then((res) => {
          /*
            console.log('Infection succesfully added');
            Popup.show({
              type: 'Success',
              callback: () => Popup.hide(),
              title: 'Sie haben hiermit 1000 Leben gerettet! Dank Dir endet die Quarantäne!',
            });
            */
          this.setState({ healthyDialogVisible: true });

          // Alert.alert('Sie sind gesund!', 'BLABLA', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
          console.log(res.data);
        })
        .catch((error) => {
          Alert.alert('Das hat nicht geklappt!', 'BLABLA', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
          console.log('Error occured: ', error);
        });
    }
  }

  render() {
    return (
      <Root>
        <View style={styles.container}>
          <Dialog
            visible={this.state.healthyDialogVisible}
            dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
            onTouchOutside={() => {
              this.setState({ healthyDialogVisible: false });
            }}
            dialogTitle={<DialogTitle title="Sie sind gesund!"/>}
            footer={
              <DialogFooter>
                <DialogButton
                  text="OK"
                  onPress={() => {
                    this.setState({ healthyDialogVisible: false });
                  }}
                />
              </DialogFooter>
            }
          >
            <DialogContent>
              <Text>Sie haben hiermit 1000 Leben gerettet! Dank Dir endet die Quarantäne</Text>
            </DialogContent>
          </Dialog>

          <Dialog
            visible={this.state.infectedDialogVisible}
            dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
            onTouchOutside={() => {
              this.setState({ infectedDialogVisible: false });
            }}
            dialogTitle={<DialogTitle title="Sie sind infiziert!"/>}
            footer={
              <DialogFooter>
                <DialogButton
                  text="OK"
                  onPress={() => {
                    this.setState({ infectedDialogVisible: false });
                  }}
                />
              </DialogFooter>
            }
          >
            <DialogContent>
              <Text>Oh nein, das ist blöd. Aber wir werden umgehend deine Kontaktpersonen informieren.</Text>
            </DialogContent>
          </Dialog>

          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.getStartedContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Sie haben sich infiziert? </Text>
              <Text style={styles.getStartedText}>Dann melden Sie dies bitte hier, um sich und andere zu
                schützen! </Text>
              <Text style={styles.getStartedText}> </Text>
              <CustomButton
                title="   Ich bin gesund!   "
                onPress={() => this.postHealthenedMethod(deviceId)}
                // style={{ /* some styles for button */ }}
                // textStyle={{ /* styles for button title */ }}
              />

              <Text> </Text>
              <Text> </Text>
              <CustomButton
                id="test"
                title="   Ich bin krank!   "

                onPress={() =>  Alert.alert('Überprüfung', 'Sind Sie wirklich infiziert?', [{ text: 'Ja', onPress: () => this.postInfectionMethod(deviceId) }, { text: 'Nein', onPress: () => console.log("Nein Pressed")}])}
                style={{ backgroundColor: '#c00200', shadowColor: '#c00004' }}
                // textStyle={{ /* styles for button title */ }}
              />
              <Text style={styles.getStartedText}> </Text>
            </View>
          </ScrollView>

        </View>
      </Root>
    );
  }
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
    color: '#f03434',
    borderColor: '#f03434',
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
        shadowOffset: { width: 0, height: -3 },
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
