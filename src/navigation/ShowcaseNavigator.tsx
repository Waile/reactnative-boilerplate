/**
 * SHOWCASE NAVIGATOR
 * 
 * NAVIGATION CONFIGURATION FOR COMPONENTS SHOWCASE SCREENS
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ComponentsShowcaseScreen from '../screens/showcase/ComponentsShowcaseScreen';
import { colors } from '../theme';

// STACK PARAM LIST
export type ShowcaseStackParamList = {
  ComponentsShowcase: undefined;
};

// CREATE NAVIGATOR
const Stack = createStackNavigator<ShowcaseStackParamList>();

/**
 * SHOWCASE STACK NAVIGATOR
 * Stack navigator for showcase screens
 */
const ShowcaseNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="ComponentsShowcase"
        component={ComponentsShowcaseScreen}
        options={{
          title: 'UI Components Demo',
        }}
      />
    </Stack.Navigator>
  );
};

export default ShowcaseNavigator;
