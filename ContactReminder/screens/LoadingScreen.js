import * as React from 'react';
import {
  Text,
  View,
  AsyncStorage,
  Button,
    ActivityIndicator
} from 'react-native';
import { Root, Popup } from 'popup-ui'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from "react-native-elements";
import { RepositoryFactory } from '../API/RepositoryFactory';
import Constants from 'expo-constants';

const deviceID = Constants.deviceId;
const user = RepositoryFactory.get('user');


export default class LoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  state = {

  };



  setStateIfMounted(obj) {
    if (this._isMounted) {
      this.setState(obj);
    }
  }

  render() {
    return(
      <View>
        <Text>  </Text>
        <Text>  </Text>
        <Text>  </Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}