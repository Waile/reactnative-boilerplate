/**
 * APP NAVIGATOR
 * 
 * THIS IS THE MAIN NAVIGATION CONTAINER THAT HOLDS ALL APP NAVIGATION
 * IT SETS UP THE NAVIGATION CONTAINER AND THEME CONFIGURATION
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { colors } from '../theme';
// Import without file extension
import MainStackNavigator from './MainStackNavigator';

// CUSTOM NAVIGATION THEME
const navigationTheme = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.background.primary,
    card: colors.background.primary,
    text: colors.text.primary,
    border: colors.lightGray,
    notification: colors.error,
  },
  // Required fonts property with structure matching Theme type
  fonts: {
    regular: { fontFamily: 'System', fontWeight: 'normal' as const },
    medium: { fontFamily: 'System', fontWeight: '500' as const },
    bold: { fontFamily: 'System', fontWeight: 'bold' as const },
    heavy: { fontFamily: 'System', fontWeight: '800' as const }
  }
};

const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      {/* STATUS BAR CONFIGURATION */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background.primary}
      />
      
      {/* NAVIGATION CONTAINER WITH CUSTOM THEME */}
      <NavigationContainer theme={navigationTheme}>
        {/* MAIN STACK NAVIGATOR COMPONENT */}
        <MainStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
