/**
 * TAB NAVIGATOR
 * 
 * THIS FILE DEFINES THE BOTTOM TAB NAVIGATION FOR THE APP
 * IT ORGANIZES THE MAIN SECTIONS OF THE APP INTO TABS
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme';

// CREATE THE TAB NAVIGATOR
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.lightGray,
          elevation: 0,
        },
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0, // REMOVE SHADOW ON ANDROID
          shadowOpacity: 0, // REMOVE SHADOW ON IOS
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    >
      {/* HOME TAB */}
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      
      {/* EXPLORE TAB */}
      <Tab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Icon name="explore" color={color} size={size} />
          ),
        }}
      />
      
      {/* NOTIFICATIONS TAB */}
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Icon name="notifications" color={color} size={size} />
          ),
          tabBarBadge: 3, // EXAMPLE OF NOTIFICATION BADGE
        }}
      />
      
      {/* PROFILE TAB */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
