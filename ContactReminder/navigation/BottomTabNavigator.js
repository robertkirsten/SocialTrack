import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import ScanContactPersonScreen from '../screens/ScanContactPersonScreen';
import ShowContactPersonsScreen from '../screens/ShowContactPersonsScreen';

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
        name="Home"
        component={ScanContactPersonScreen}
        options={{
          title: 'Kontaktperson scannen',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-camera" />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={ShowContactPersonsScreen}
        options={{
          title: 'Meine Kontakte',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
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
