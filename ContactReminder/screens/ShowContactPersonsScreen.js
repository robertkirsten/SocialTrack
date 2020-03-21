import * as React  from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {RepositoryFactory} from './../API/RepositoryFactory'
import moment from 'moment';

const contactPersonsRepository = RepositoryFactory.get('contactPersons');

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

//async ?
  fetchData(contactPersonsList) {
    //this.state.contactPersonsList = await contactPersonsRepository.get(id);
    const personNames = contactPersonsList.map(p => p.name).sort((a, b) => a.localeCompare(b))
    let currentLetter = '';
    let personNamesWithTitle = [];
    
    for (const name of personNames){
      if (name.charAt(0).toUpperCase() !== currentLetter){
        currentLetter = name.charAt(0);
        personNamesWithTitle.push({
          'title': currentLetter,
          'data': []
        });
      }
      personNamesWithTitle[personNamesWithTitle.length-1].data.push(name);
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
        <SectionList
          sections= { personNamesWithTitle }
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
