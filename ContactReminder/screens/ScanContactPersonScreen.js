import React, { useState, useEffect, Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Barcode from 'react-native-barcode-builder';

import { MonoText } from '../components/StyledText';

export default class ScanContactPersonScreen extends Component {
  state = {
    hasPermission: null,
    scanned: false,
    scanning: false,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

    handleBarCodeScanned ({ type, data }) {
      this.setState({
        scanned: true
      });
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

  barcodescan() {
    const {
      hasCameraPermission, 
      scanned
    } = this.state;

    if (hasCameraPermission === null) {
      return <Text> Requesting for camera permission </Text>;
    }
    if (hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    }
    return ( 
    <View style = {
        {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }
      }>
      <BarCodeScanner onBarCodeScanned = { scanned ? undefined : this.handleBarCodeScanned }
      style = { StyleSheet.absoluteFillObject }/>
      {
        scanned && ( <Button
          title = { 'Tap to Scan Again' }
          onPress = {
            () => this.setState({
              scanned: false
            })
          }/>
        )
      } 
      <Button
        title="Stop scanning"
        onPress={() => this.setState({ scanning: false })} />
      </View>
    );
  }

  render() {
    const {
      scanning,
    } = this.state;

    if (scanning) {
      return this.barcodescan();
    }

    return (
      <View>
        <Barcode value="Hello World" format="CODE128" />
        <Button
          title="Press me to scan code"
          onPress={() => this.setState({ scanning: true })} />
      </View>
    )
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
