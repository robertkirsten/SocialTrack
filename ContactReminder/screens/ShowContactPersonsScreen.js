import * as React from 'react';
import {
  SectionList, StyleSheet, Text, View, RefreshControl,
} from 'react-native';
import moment from 'moment';
import Constants from 'expo-constants';
import { RepositoryFactory } from '../API/RepositoryFactory';
import LoadingScreen from './LoadingScreen';

const deviceID = Constants.deviceId;
const contactedUsers = RepositoryFactory.get('contactedUsersRepository');

export default class ShowContactPersonsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      personNamesWithTitle: [],
      refreshing: false,
    };

    this.onRefresh = () => {
      this.setState({ refreshing: true });
      this.getContactedUsers().then(() => {
        this.setState({ refreshing: false });
      });
    };
  }

  async componentDidMount() {
    this.getContactedUsers();
  }

  getContactedUsers() {
    return contactedUsers.getUsers(deviceID)
      .then((res) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const person of res.data) {
          person.time = moment(person.time);
        }
        const transformedData = this.transformData(res.data);
        this.setState({ personNamesWithTitle: transformedData, loading: false });
      })
      .catch((error) => {
        console.log('Error occured: ', error);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  transformData(contactPersonsList) {
    const persons = contactPersonsList.sort((a, b) => a.timestamp > b.timestamp);
    let currentDate = '';
    const personNamesWithTitle = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const person of persons) {
      const personTime = moment(person.timestamp).format('DD.MM.YYYY, HH [Uhr]');

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

  render() {
    const { personNamesWithTitle, loading } = this.state;
    if (loading) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.container}>
        { personNamesWithTitle.length === 0
        && <Text>Sie haben bisher keine Kontaktperson hinzugefügt.</Text>
        }

        <SectionList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          sections={personNamesWithTitle}
          renderItem={({ item }) => <Text
          style={item.infected ? styles.itemInfected : styles.itemNotInfected}>{item.name}</Text>}
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
