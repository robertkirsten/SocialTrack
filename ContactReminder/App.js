import * as React from 'react';
import {
  Button, Platform, StatusBar, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import ScanContactPersonScreen from './screens/ScanContactPersonScreen';
import SettingsScreen from './screens/SettingsScreen';
// import navigation from "react-awesome-button/demo/components/navigation/navigation";


const spaceMonoFont = require('./assets/fonts/SpaceMono-Regular.ttf');

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': spaceMonoFont,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  // eslint-disable-next-line react/prop-types
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  }
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
<<<<<<< HEAD
        <Stack.Navigator initialRouteName={'SettingsScreen'}>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
=======
        <Stack.Navigator>
          <Stack.Screen name="Root" component={BottomTabNavigator}/>
>>>>>>> 8463ca7fd650ff57fdc9030d86bc63d16497068f
          <Stack.Screen name="ScanContactPersonScreen" component={ScanContactPersonScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
