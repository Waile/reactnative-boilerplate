/**
 * HOME SCREEN
 * 
 * THIS IS THE MAIN LANDING SCREEN OF THE APPLICATION
 * IT DEMONSTRATES PROPER COMPONENT STRUCTURE AND STYLING PRACTICES
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Text from '../components/common/Text';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  // NAVIGATION HOOK FOR TYPE-SAFE NAVIGATION
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  // NAVIGATION HANDLERS
  const goToDetails = () => {
    navigation.navigate('Details', { id: '123', title: 'Item Details' });
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* HEADER SECTION */}
        <View style={styles.headerContainer}>
          <Text style={typography.h2}>Welcome</Text>
          <Text style={[typography.body2, styles.subtitle]}>
            This is a boilerplate React Native application built with best practices
          </Text>
        </View>
        
        {/* CONTENT SECTION */}
        <View style={styles.cardsContainer}>
          <Card 
            title="Feature One"
            description="This demonstrates a reusable card component with consistent styling"
            onPress={goToDetails}
            style={styles.card}
          />
          
          <Card 
            title="Feature Two" 
            description="Cards use the theme's typography, colors, and spacing for consistency"
            onPress={goToDetails}
            style={styles.card}
          />
          
          <Card 
            title="Feature Three"
            description="Each component is modular and follows the separation of concerns principle"
            onPress={goToDetails}
            style={styles.card}
          />
        </View>
        
        {/* ACTION SECTION */}
        <View style={styles.actionContainer}>
          <Button 
            title="Go to Details" 
            onPress={goToDetails}
            style={styles.button}
          />
          <Button 
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
            variant="secondary"
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// STYLES USING THEME VARIABLES FOR CONSISTENCY
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xxlarge,
  },
  headerContainer: {
    padding: spacing.large,
    backgroundColor: colors.primary,
  },
  subtitle: {
    color: colors.lightGray,
    marginTop: spacing.small,
  },
  cardsContainer: {
    padding: spacing.medium,
  },
  card: {
    marginBottom: spacing.medium,
  },
  actionContainer: {
    padding: spacing.medium,
  },
  button: {
    marginBottom: spacing.medium,
  },
});

export default HomeScreen;
