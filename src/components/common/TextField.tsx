/**
 * TEXT FIELD COMPONENT
 * 
 * THIS IS A REUSABLE TEXT INPUT COMPONENT
 * IT PROVIDES CONSISTENT STYLING AND ERROR HANDLING
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Text from './Text';
import { colors, typography, spacing } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

// TEXT FIELD PROPS INTERFACE
export interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string | null;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  touched?: boolean;
  required?: boolean;
  helperText?: string;
  variant?: 'outlined' | 'filled' | 'underlined';
}

/**
 * TEXT FIELD COMPONENT
 * A styled text input with label, icons, and error handling
 */
const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  leftIcon,
  rightIcon,
  onRightIconPress,
  touched = false,
  required = false,
  helperText,
  variant = 'outlined',
  ...props
}) => {
  // STATE FOR FOCUS
  const [isFocused, setIsFocused] = useState(false);

  // DETERMINE IF ERROR SHOULD BE SHOWN
  const showError = error && (touched || isFocused);

  // DETERMINE CONTAINER STYLES BASED ON STATE AND VARIANT
  const getContainerStyle = () => {
    const baseStyle = [styles.container];

    // ADD VARIANT-SPECIFIC STYLES
    if (variant === 'outlined') {
      baseStyle.push(styles.outlinedContainer);
      if (isFocused) baseStyle.push(styles.outlinedContainerFocused);
      if (showError) baseStyle.push(styles.outlinedContainerError);
    } else if (variant === 'filled') {
      baseStyle.push(styles.filledContainer);
      if (isFocused) baseStyle.push(styles.filledContainerFocused);
      if (showError) baseStyle.push(styles.filledContainerError);
    } else if (variant === 'underlined') {
      baseStyle.push(styles.underlinedContainer);
      if (isFocused) baseStyle.push(styles.underlinedContainerFocused);
      if (showError) baseStyle.push(styles.underlinedContainerError);
    }

    return [...baseStyle, containerStyle];
  };

  // DETERMINE INPUT STYLES BASED ON STATE AND VARIANT
  const getInputStyle = () => {
    const baseStyle = [styles.input];

    if (leftIcon) baseStyle.push(styles.inputWithLeftIcon);
    if (rightIcon) baseStyle.push(styles.inputWithRightIcon);
    if (variant === 'filled') baseStyle.push(styles.filledInput);
    if (showError) baseStyle.push(styles.inputError);

    return [...baseStyle, inputStyle];
  };

  return (
    <View style={styles.wrapper}>
      {/* LABEL */}
      {label && (
        <View style={styles.labelContainer}>
          <Text
            style={[
              styles.label,
              isFocused && styles.focusedLabel,
              showError && styles.errorLabel,
              labelStyle,
            ]}
          >
            {label}
            {required && <Text style={styles.requiredAsterisk}> *</Text>}
          </Text>
        </View>
      )}

      {/* INPUT CONTAINER */}
      <View style={getContainerStyle()}>
        {/* LEFT ICON */}
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            style={styles.leftIcon}
            color={showError ? colors.error : isFocused ? colors.primary : colors.textSecondary}
          />
        )}

        {/* TEXT INPUT */}
        <TextInput
          style={getInputStyle()}
          placeholderTextColor={colors.textPlaceholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* RIGHT ICON */}
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            <Icon
              name={rightIcon}
              size={20}
              color={showError ? colors.error : isFocused ? colors.primary : colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* ERROR MESSAGE OR HELPER TEXT */}
      {(showError || helperText) && (
        <Text
          style={[
            styles.helperText,
            showError && styles.errorText,
            errorStyle,
          ]}
        >
          {showError ? error : helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.medium,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    minHeight: 56,
  },
  outlinedContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  outlinedContainerFocused: {
    borderColor: colors.primary,
  },
  outlinedContainerError: {
    borderColor: colors.error,
  },
  filledContainer: {
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filledContainerFocused: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  filledContainerError: {
    borderBottomColor: colors.error,
    borderBottomWidth: 2,
  },
  underlinedContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderRadius: 0,
  },
  underlinedContainerFocused: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  underlinedContainerError: {
    borderBottomColor: colors.error,
    borderBottomWidth: 2,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: spacing.small,
  },
  label: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  focusedLabel: {
    color: colors.primary,
  },
  errorLabel: {
    color: colors.error,
  },
  requiredAsterisk: {
    color: colors.error,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    minHeight: 56,
  },
  filledInput: {
    paddingTop: spacing.medium,
  },
  inputWithLeftIcon: {
    paddingLeft: spacing.small,
  },
  inputWithRightIcon: {
    paddingRight: spacing.small,
  },
  inputError: {
    color: colors.text, // Keep text color normal, just show error state in border
  },
  leftIcon: {
    marginLeft: spacing.medium,
  },
  rightIcon: {
    marginRight: spacing.medium,
  },
  helperText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.small,
    marginLeft: spacing.small,
  },
  errorText: {
    color: colors.error,
  },
});

export default TextField;
