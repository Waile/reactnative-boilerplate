/**
 * CUSTOM BUTTON COMPONENT
 * 
 * THIS COMPONENT PROVIDES A STANDARDIZED BUTTON WITH VARIOUS STYLE VARIANTS
 * IT ENSURES CONSISTENT BUTTON APPEARANCE AND BEHAVIOR THROUGHOUT THE APP
 */

import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacityProps, 
  View 
} from 'react-native';
import Text from './Text';
import { colors, spacing, borderRadius } from '../../theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = ({ 
  title, 
  variant = 'primary', 
  size = 'medium',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style, 
  ...rest 
}: ButtonProps) => {
  // DETERMINE STYLES BASED ON VARIANT AND SIZE PROPS
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];
  
  // DETERMINE TEXT COLOR BASED ON VARIANT
  const textColor = {
    primary: colors.white,
    secondary: colors.white,
    outline: colors.primary,
    text: colors.primary,
  }[variant];

  return (
    <TouchableOpacity 
      style={buttonStyles} 
      disabled={disabled || isLoading} 
      activeOpacity={0.7}
      {...rest}
    >
      <View style={styles.contentContainer}>
        {/* LEFT ICON */}
        {leftIcon && !isLoading && <View style={styles.iconLeft}>{leftIcon}</View>}
        
        {/* LOADING SPINNER OR TITLE */}
        {isLoading ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : (
          <Text 
            style={[
              styles.buttonText, 
              styles[`${size}Text`], 
              { color: textColor },
              disabled && styles.disabledText
            ]}
          >
            {title}
          </Text>
        )}
        
        {/* RIGHT ICON */}
        {rightIcon && !isLoading && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

// BUTTON STYLES USING THEME VARIABLES FOR CONSISTENCY
const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // VARIANT STYLES
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  // SIZE STYLES
  small: {
    paddingVertical: spacing.tiny,
    paddingHorizontal: spacing.medium,
  },
  medium: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.large,
  },
  large: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.xlarge,
  },
  // TEXT SIZE STYLES
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // STATE STYLES
  disabled: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },
  disabledText: {
    color: colors.darkGray,
  },
  buttonText: {
    fontWeight: '500',
  },
  // ICON STYLES
  iconLeft: {
    marginRight: spacing.small,
  },
  iconRight: {
    marginLeft: spacing.small,
  },
});

export default Button;
