/**
 * MAIN STACK NAVIGATOR
 * 
 * THIS FILE DEFINES THE PRIMARY NAVIGATION STACK FOR THE APP
 * IT CONTAINS ALL MAIN SCREENS AND THEIR NAVIGATION OPTIONS
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import TabNavigator from './TabNavigator';
import ShowcaseNavigator from './ShowcaseNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../theme';

// CREATE THE STACK NAVIGATOR
const Stack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0, // REMOVE SHADOW ON ANDROID
          shadowOpacity: 0, // REMOVE SHADOW ON IOS
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        cardStyle: { backgroundColor: colors.background.primary },
      }}
    >
      {/* HOME SCREEN - CONTAINS TAB NAVIGATOR */}
      <Stack.Screen 
        name="Home" 
        component={TabNavigator}
        options={{ 
          headerShown: false 
        }} 
      />
      
      {/* DETAILS SCREEN WITH DYNAMIC TITLE */}
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={({ route }) => ({ 
          title: route.params?.title || 'Details',
        })} 
      />
      
      {/* SETTINGS SCREEN */}
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: 'Settings'
        }} 
      />
      
      {/* COMPONENTS SHOWCASE */}
      <Stack.Screen 
        name="ComponentsShowcase" 
        component={ShowcaseNavigator} 
        options={{ 
          headerShown: false
        }} 
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
