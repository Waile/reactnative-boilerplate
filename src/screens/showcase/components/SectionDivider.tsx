/**
 * SECTION DIVIDER COMPONENT
 * 
 * A simple divider with title for separating sections in the showcase
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components/common';
import { colors, spacing, typography } from '../../../theme';

interface SectionDividerProps {
  title: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ title }) => (
  <View style={styles.sectionDivider}>
    <Text preset="h2" style={styles.sectionTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  sectionDivider: {
    marginVertical: spacing.medium,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    paddingBottom: spacing.small,
  },
  sectionTitle: {
    color: colors.primary,
  },
});
