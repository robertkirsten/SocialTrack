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


export default class SettingsScreen extends React.Component {
    render() {

        return(
        <View style={styles.container}>
            <Text>HALLO</Text>
        </View>
        );
    }
}