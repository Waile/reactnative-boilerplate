/**
 * NAVIGATION TYPES
 * 
 * THIS FILE DEFINES TYPE DEFINITIONS FOR REACT NAVIGATION
 * STRONG TYPING ENSURES TYPE SAFETY WHEN NAVIGATING BETWEEN SCREENS
 */

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// MAIN STACK NAVIGATOR ROUTE PARAMETERS
export type RootStackParamList = {
  Home: undefined;
  Details: { id: string; title: string };
  Profile: undefined;
  Settings: undefined;
  ComponentsShowcase: undefined;
};

// TAB NAVIGATOR ROUTE PARAMETERS
export type TabParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
  NotificationsTab: undefined;
  ProfileTab: undefined;
};

// NAVIGATION PROP TYPES FOR EACH SCREEN
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
export type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

// ROUTE PROP TYPES FOR EACH SCREEN
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
export type SettingsScreenRouteProp = RouteProp<RootStackParamList, 'Settings'>;

// COMBINED PROPS FOR SCREENS
export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export type DetailsScreenProps = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

export type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

export type SettingsScreenProps = {
  navigation: SettingsScreenNavigationProp;
  route: SettingsScreenRouteProp;
};
