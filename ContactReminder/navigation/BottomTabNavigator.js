import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import ShowQRCodeScreen from '../screens/ShowQRCodeScreen';
import ShowContactPersonsScreen from '../screens/ShowContactPersonsScreen';
import HomeScreen from "../screens/HomeScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="ScanContactPersonScreen"
        component={ShowQRCodeScreen}
        options={{
          title: 'Kontaktperson scannen',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person-add" />,
        }}
      />
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Übersicht',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-information" />,
        }}
      />
      <BottomTab.Screen
        name="ShowContactPersonsScreen"
        component={ShowContactPersonsScreen}
        options={{
          title: 'Meine Kontakte',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  /*const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':*/
      return 'CoronaTracking';
    /*case 'Links':
      return 'Links to learn more';
  }*/
}
