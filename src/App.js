import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator,  } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { Gesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture'
import { Image } from 'react-native-reanimated/lib/typescript/Animated'

//Screens
import HomeStackNavigator from './screens/HomePage'
import SearchPage from './screens/SearchPage'
import ReelsPage from './screens/ReelsPage'
import ProfilePage from './screens/ProfilePage'
import StoryPage from './screens/StoryPage'
import CreatePage from './screens/CreatePage'
import Camera from './screens/Camera'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="HomeTab"
      component={HomeStackNavigator}
      options={{
        tabBarLabel: '',
        headerShown: false,
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={25} color={'black'} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchPage}
      options={{
        tabBarLabel: '',
        title: 'Search',
        tabBarIcon: ({ color, size }) => (
          <Icon name="search" size={20} color={'black'} />
        ),
      }}
    />
    <Tab.Screen
      name="Create"
      component={CreatePage}
      options={{
        tabBarLabel: '',
        title: 'Create',
        tabBarIcon: ({ color, size }) => (
          <Icon name="plus-square" size={20} color={'black'} />
        ),
      }}
    />
    <Tab.Screen
      name="Reels"
      component={ReelsPage}
      options={{
        tabBarLabel: '',
        title: 'Reels',
        tabBarIcon: ({ color, size }) => (
          <Icon name="video-camera" size={20} color={'black'} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfilePage}
      options={{
        tabBarLabel: '',
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon name="user-circle" size={20} color={'black'} />
        ),
      }}
    />
  </Tab.Navigator>
);


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="HomeTab"
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoryPage"
          component={StoryPage}
          options={{
            headerShown: false,
            tabBarVisible: false, // Hide the tabs for StoryPage
          }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{
            headerShown: false,
            tabBarVisible: false, // Hide the tabs for StoryPage
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({})