import * as React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Button,
    ToastAndroid,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Root, Popup } from 'popup-ui'
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from "react-native-elements";
import { RepositoryFactory } from '../API/RepositoryFactory';
const user = RepositoryFactory.get('user');


export default class SettingsScreen extends React.Component {

    state = {
        firstname: '',
        lastname: '',
    };
    async _storeData()  {
        const {firstname, lastname} = this.state;
        try {
            await AsyncStorage.setItem('lastname', lastname);
            await AsyncStorage.setItem('firstname', firstname);
        } catch (error) {
            // Error saving data
        }
        //TODO: CHANGE ID
        await this.postUser(5);

    };
    async _retrieveData(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // Our data is fetched successfully
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    async postUser(userid){

        const {firstname, lastname} = this.state;
        console.log(firstname);
        console.log(lastname);

        return user.postUserData(userid,0, firstname,lastname)
            .then(res => {
                console.log("Fetched successfully all contacted Users");
                //console.log(res.data);
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
    render() {
        return(
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
                onChangeText={text => this.setState({firstname: text})}
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
                onChangeText={text => this.setState({lastname: text})}
            />

            <Button
                title="SAVE"
                onPress={() => this._storeData()}/>

        </View>
        );
    }
}