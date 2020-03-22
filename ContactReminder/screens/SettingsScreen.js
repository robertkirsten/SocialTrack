/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';
import { Root, Popup } from 'popup-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Constants from 'expo-constants';
import { RepositoryFactory } from '../API/RepositoryFactory';
import LoadingScreen from './LoadingScreen';

const deviceID = Constants.deviceId;
const user = RepositoryFactory.get('user');

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      loading: true,
      firstname: '',
      lastname: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    console.log('test');
    user.getUser(deviceID)
      .then((res) => {
        console.log("test", res.data);
        if (res.data) {
          console.log('already registered');
          this.props.navigation.replace('Root');
        } else {
          console.log('not registered');
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  postUser(userid) {
    const { firstname, lastname } = this.state;

    return user.postUserData(userid, 0, firstname, lastname)
      .then((res) => {
        console.log('Fetched successfully all contacted Users');
        this.props.navigation.replace('Root');
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

  setStateIfMounted(obj) {
    if (this._isMounted) {
      this.setState(obj);
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <LoadingScreen />;
    }
    return (
      <View>
        <Root>
          <Text> </Text>
        </Root>
        <Input
          placeholder='INSERT FIRSTNAME'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
          onChangeText={(text) => this.setStateIfMounted({ firstname: text })}
        />
        <Text> </Text>
        <Input
          placeholder='INSERT LASTNAME'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
          onChangeText={(text) => this.setStateIfMounted({ lastname: text })}
        />
        <Button
          title="SAVE"
          onPress={() => this.postUser(deviceID)}/>
      </View>
    );
  }
}
