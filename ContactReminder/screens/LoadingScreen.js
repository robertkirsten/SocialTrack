import * as React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

export default class LoadingScreen extends React.Component {
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