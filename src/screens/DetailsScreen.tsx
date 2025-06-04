/**
 * DETAILS SCREEN
 * 
 * THIS SCREEN DEMONSTRATES RECEIVING AND USING NAVIGATION PARAMETERS
 * IT SHOWS HOW TO ACCESS ROUTE PARAMS IN A TYPE-SAFE MANNER
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DetailsScreenProps } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import Button from '../components/common/Button';
import Text from '../components/common/Text';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailsScreen = ({ navigation, route }: DetailsScreenProps) => {
  // EXTRACT PARAMETERS FROM ROUTE
  const { id, title } = route.params;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* HEADER SECTION */}
          <View style={styles.header}>
            <Text style={typography.h3}>{title}</Text>
            <Text style={[typography.caption, styles.idText]}>ID: {id}</Text>
          </View>
          
          {/* DETAILS CONTENT */}
          <View style={styles.detailsContainer}>
            <Text style={[typography.body1, styles.paragraph]}>
              This screen demonstrates how to receive and use navigation parameters.
              The title and ID are passed through the navigation route parameters.
            </Text>
            
            <Text style={[typography.body1, styles.paragraph]}>
              In a real app, you would typically use the ID to fetch data from an API
              or access specific content from your local state management.
            </Text>
            
            <View style={styles.separator} />
            
            <Text style={typography.h4}>Features</Text>
            <Text style={[typography.body2, styles.listItem]}>
              • Type-safe navigation with properly typed parameters
            </Text>
            <Text style={[typography.body2, styles.listItem]}>
              • Consistent UI using shared theme variables
            </Text>
            <Text style={[typography.body2, styles.listItem]}>
              • Separation of navigation logic from UI components
            </Text>
          </View>
          
          {/* ACTIONS */}
          <View style={styles.actions}>
            <Button 
              title="Go Back" 
              onPress={() => navigation.goBack()}
              variant="secondary"
              style={styles.button}
            />
          </View>
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
  content: {
    padding: spacing.medium,
  },
  header: {
    marginBottom: spacing.large,
  },
  idText: {
    marginTop: spacing.tiny,
    color: colors.text.secondary,
  },
  detailsContainer: {
    marginBottom: spacing.large,
  },
  paragraph: {
    marginBottom: spacing.medium,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: spacing.large,
  },
  listItem: {
    marginBottom: spacing.small,
  },
  actions: {
    marginTop: spacing.medium,
  },
  button: {
    marginBottom: spacing.medium,
  },
});

export default DetailsScreen;
