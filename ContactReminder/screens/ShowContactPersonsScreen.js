import * as React  from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {RepositoryFactory} from './../API/RepositoryFactory'
import moment from 'moment';
import {Popup} from "popup-ui";

const contactedUsers = RepositoryFactory.get('contactedUsersRepository');

export default class ShowContactPersonsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactPersonsList: [
        {
          name: "Johannes",
          id: "2",
          scan: "qr",
          timestamp: moment("20111031", "YYYYMMDD"),
        },
        {
          name: "Jana",
          id: "3",
          scan: "qr",
          timestamp: moment().startOf('day'),
        },
        {
          name: "Tim",
          id: "1",
          scan: "bluetooth",
          timestamp: moment().startOf('hour'),
        }
      ],
      personNamesWithTitle: [],
    }
  }
  
  async componentDidMount() {
    const { contactPersonsList } = this.state;

    this.fetchData(contactPersonsList);
  }
async getcontactedUsers(userId){
    return contactedUsers.getUsers(userId).then(res => {
      console.log("Fetched successfully all contacted Users");
      console.log(res.data);
    })
        .catch(error => {
          Popup.show({
            type: 'Danger',
            callback: () => Popup.hide(),
            title: 'Download failed',
            textBody: 'Sorry! Could not get your recent(ly) contacted persons!',

          });
          console.log("Error occured: ", error);
        });
}
//async ?
  fetchData(contactPersonsList, userId) {
   // const persons = this.getcontactedUsers(userId);
    //exchange this for API-Call
    const persons = contactPersonsList.sort((a, b) => a.timestamp > b.timestamp);
    let currentDate = '';
    let personNamesWithTitle = [];
    
    for (const person of persons) {
      const personTime = moment(person.timestamp).locale('de').format('DD.MM.YYYY');

      if (personTime !== currentDate) {
        currentDate = personTime;
        personNamesWithTitle.push({
          'title': currentDate,
          'data': []
        });
      }

      personNamesWithTitle[personNamesWithTitle.length-1].data.push(person.name);
    }

    this.setState({ personNamesWithTitle: personNamesWithTitle });
    return personNamesWithTitle;
  }

  OptionButton({ icon, label, onPress, isLastOption }) {
    return (
      <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.optionIconContainer}>
            <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>{label}</Text>
          </View>
        </View>
      </RectButton>
    );
  }

  render() {
    const { personNamesWithTitle } = this.state;
    return (
      <View style={styles.container}>
        <this.OptionButton />
        <SectionList
          sections={ personNamesWithTitle }
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});