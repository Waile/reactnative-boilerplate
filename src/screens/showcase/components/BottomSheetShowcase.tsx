/**
 * BOTTOM SHEET SHOWCASE COMPONENT
 * 
 * THIS COMPONENT DEMONSTRATES THE BOTTOM SHEET COMPONENT WITH DIFFERENT CONFIGURATIONS
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, BottomSheet } from '../../../components/common';
import { spacing } from '../../../theme';

/**
 * Bottom Sheet showcase component
 * Demonstrates different bottom sheet variants and configurations
 */
const BottomSheetShowcase: React.FC = () => {
  const [basicSheetVisible, setBasicSheetVisible] = useState(false);
  const [customSheetVisible, setCustomSheetVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button
          title="Basic Sheet"
          onPress={() => setBasicSheetVisible(true)}
          style={styles.button}
        />
        
        <Button
          title="Custom Sheet"
          onPress={() => setCustomSheetVisible(true)}
          style={styles.button}
          variant="secondary"
        />
      </View>

      {/* Basic Bottom Sheet Example */}
      <BottomSheet
        visible={basicSheetVisible}
        onClose={() => setBasicSheetVisible(false)}
        title="Basic Bottom Sheet"
      >
        <Text style={styles.sheetText}>
          This is a basic bottom sheet with default styling and a title.
          Bottom sheets are great for displaying content without navigating away.
        </Text>
        <Button
          title="Close"
          onPress={() => setBasicSheetVisible(false)}
          variant="outline"
          style={styles.sheetButton}
        />
      </BottomSheet>

      {/* Custom Bottom Sheet Example */}
      <BottomSheet
        visible={customSheetVisible}
        onClose={() => setCustomSheetVisible(false)}
        title="Custom Bottom Sheet"
        height={400} // Custom height
        closeOnBackdropPress={true} // Close on backdrop press
        enableDragToClose={true} // Enable drag to close
      >
        <View style={styles.customContent}>
          <Text style={styles.headerText}>Custom Bottom Sheet</Text>
          
          <Text style={styles.sheetText}>
            This bottom sheet has custom height and behavior settings.
            You can drag it down to close or tap the backdrop.
          </Text>
          
          <Text style={styles.sheetText}>
            Bottom sheets can contain any content, including:
          </Text>
          
          <View style={styles.optionList}>
            <Text style={styles.optionText}>• Forms and inputs</Text>
            <Text style={styles.optionText}>• Action menus</Text>
            <Text style={styles.optionText}>• Filtering options</Text>
            <Text style={styles.optionText}>• Additional information</Text>
          </View>
          
          <Button
            title="Close Sheet"
            onPress={() => setCustomSheetVisible(false)}
            style={styles.sheetButton}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.medium,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
  },
  sheetText: {
    marginBottom: spacing.medium,
  },
  sheetButton: {
    marginTop: spacing.medium,
  },
  customContent: {
    padding: spacing.medium,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.large,
  },
  optionList: {
    marginVertical: spacing.medium,
  },
  optionText: {
    marginBottom: spacing.small,
  },
});

export default BottomSheetShowcase;
