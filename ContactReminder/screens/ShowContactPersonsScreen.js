import * as React from 'react';
import {
  SectionList, StyleSheet, Text, View, Button, RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { Popup } from 'popup-ui';
import Constants from 'expo-constants';
import { RepositoryFactory } from '../API/RepositoryFactory';

const deviceID = Constants.deviceId;
const contactedUsers = RepositoryFactory.get('contactedUsersRepository');

export default class ShowContactPersonsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personNamesWithTitle: [],
      refreshing: false,
    };
  }

  async componentDidMount() {
    this.getContactedUsers();
  }

  getContactedUsers() {
    return contactedUsers.getUsers(deviceID)
      .then((res) => {
        for (const person of res.data) {
          person.time = moment(person.time);
        }
        this.setState({ personNamesWithTitle: this.transformData(res.data) });
      })
      .catch((error) => {
        Popup.show({
          type: 'Danger',
          callback: () => Popup.hide(),
          title: 'Download failed',
          textBody: 'Sorry! Could not get your recent(ly) contacted persons!',
        });
        console.log('Error occured: ', error);
      });
  }

  transformData(contactPersonsList) {
    const persons = contactPersonsList.sort((a, b) => a.timestamp > b.timestamp);
    let currentDate = '';
    const personNamesWithTitle = [];

    for (const person of persons) {
      const personTime = moment(person.timestamp).locale('de').format('HH [Uhr] DD.MM.YYYY');

      if (personTime !== currentDate) {
        currentDate = personTime;
        personNamesWithTitle.push({
          title: currentDate,
          data: [],
        });
      }

      console.log(person);
      personNamesWithTitle[personNamesWithTitle.length - 1].data.push({
        infected: person.infected,
        name: `${person.firstname} ${person.lastname}`,
      });
    }

    return personNamesWithTitle;
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getContactedUsers().then(() => {
      this.setState({ refreshing: false });
    })
  }

  render() {
    const { personNamesWithTitle } = this.state;
    return (
      <View style={styles.container}>
        <SectionList
         refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          sections={personNamesWithTitle}
          renderItem={({ item }) => <Text style={item.infected ? styles.itemInfected : styles.itemNotInfected}>{item.name}</Text>}
          renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  itemInfected: {
    backgroundColor: 'orangered',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  itemNotInfected: {
    backgroundColor: 'lightgreen',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
