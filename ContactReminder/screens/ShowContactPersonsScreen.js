//import * as React, , { Component } from 'react';
import React, {Component} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import {RepositoryFactory} from './../API/RepositoryFactory'
import moment from "moment";

const contactPersonsRepository = RepositoryFactory.get('contactPersons');

export default class ShowContactPersonsScreen extends Component {
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
      contactPersonsListonlyQR: [],
    }
  }

  //SAMPLE CODE
  /*
  contactPersonsListonlyQR: [
    {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
    {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
    ],
   */
  render() {
    const {contactPersonsListonlyQR} = this.state.contactPersonsListonlyQR;
    const contactPersonsList = this.state.contactPersonsList;
    //fetchData(contactPersonsList);
    return (
      <View style={styles.container}>
        <SectionList
          sections={fetchData(contactPersonsList)}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

//async
function fetchData(contactPersonsList) {
  //this.state.contactPersonsList = await contactPersonsRepository.get(id);

  const persons = Object.values(contactPersonsList).sort(compare);
  let currentDate = '';
  let personsWithTitle = [];

  for (let i = 0; i < persons.length; i++) {
    const person = persons[i];

    if (person === persons[0] || moment(persons[i - 1].timestamp).locale('de').format('DD.MM.YYYY')
      !== moment(person.timestamp).locale('de').format('DD.MM.YYYY')) {
      currentDate = moment(person.timestamp).locale('de').format('DD.MM.YYYY');

      personsWithTitle.push({
        'title': currentDate,
        'data': []
      });
    }
    personsWithTitle[personsWithTitle.length - 1].data.push(person.name);
  }
  return personsWithTitle;

  //this.state.contactPersonsListonlyQR = arraywithqr;
  //console.log(this.state.contactPersonsListonlyQR);
}

function compare(a, b) {
  if (a.timestamp > b.timestamp) {
    return -1;
  } else if (a.timestamp < b.timestamp) {
    return 1;
  }
  return 0;
}


function OptionButton({icon, label, onPress, isLastOption}) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)"/>
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
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
