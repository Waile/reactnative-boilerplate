/**
 * CUSTOM CARD COMPONENT
 * 
 * THIS COMPONENT PROVIDES A STANDARDIZED CARD LAYOUT WITH CONSISTENT STYLING
 * IT'S USED FOR DISPLAYING CONTENT IN A CONTAINED, ELEVATED UI ELEMENT
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import Text from './Text';
import { colors, spacing, borderRadius } from '../../theme';

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

const Card = ({
  title,
  description,
  children,
  footer,
  style,
  onPress,
}: CardProps) => {
  // WRAPPER COMPONENT BASED ON WHETHER CARD IS PRESSABLE
  const Wrapper = onPress ? TouchableOpacity : View;
  const wrapperProps = onPress ? { activeOpacity: 0.7, onPress } : {};

  return (
    <Wrapper style={[styles.card, style]} {...wrapperProps}>
      {/* CARD HEADER - SHOWN IF TITLE EXISTS */}
      {title && (
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
      )}
      
      {/* CARD CONTENT - EITHER DESCRIPTION OR CUSTOM CHILDREN */}
      <View style={styles.cardContent}>
        {description ? (
          <Text style={styles.cardDescription}>{description}</Text>
        ) : (
          children
        )}
      </View>
      
      {/* CARD FOOTER - OPTIONAL */}
      {footer && <View style={styles.cardFooter}>{footer}</View>}
    </Wrapper>
  );
};

// CARD STYLES USING THEME VARIABLES FOR CONSISTENCY
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  cardContent: {
    padding: spacing.medium,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  cardFooter: {
    padding: spacing.medium,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Card;
