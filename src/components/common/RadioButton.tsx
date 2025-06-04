/**
 * RADIO BUTTON COMPONENT
 * 
 * THIS IS A REUSABLE RADIO BUTTON COMPONENT
 * IT PROVIDES CONSISTENT STYLING WITH LABEL
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Text from './Text';
import { colors, spacing, typography } from '../../theme';

// RADIO BUTTON PROPS INTERFACE
interface RadioButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  radioStyle?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
  labelPosition?: 'right' | 'left';
  testID?: string;
}

/**
 * RADIO BUTTON COMPONENT
 * A customizable radio button with label
 */
const RadioButton: React.FC<RadioButtonProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  containerStyle,
  labelStyle,
  radioStyle,
  size = 'medium',
  labelPosition = 'right',
  testID,
}) => {
  // DETERMINE SIZE DIMENSIONS
  const getSize = () => {
    switch (size) {
      case 'small':
        return { outer: 18, inner: 8 };
      case 'large':
        return { outer: 28, inner: 14 };
      case 'medium':
      default:
        return { outer: 22, inner: 10 };
    }
  };

  const { outer: outerSize, inner: innerSize } = getSize();

  // HANDLE PRESS EVENT
  const handlePress = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.container,
        labelPosition === 'left' ? styles.reverseContainer : null,
        containerStyle,
      ]}
      testID={testID}
    >
      {/* RADIO BUTTON */}
      <View
        style={[
          styles.radio,
          { width: outerSize, height: outerSize, borderRadius: outerSize / 2 },
          checked ? styles.radioChecked : styles.radioUnchecked,
          disabled && styles.radioDisabled,
          radioStyle,
        ]}
      >
        {checked && (
          <View
            style={[
              styles.radioInner,
              {
                width: innerSize,
                height: innerSize,
                borderRadius: innerSize / 2,
              },
              disabled && styles.radioInnerDisabled,
            ]}
          />
        )}
      </View>

      {/* LABEL */}
      {label && (
        <Text
          style={[
            styles.label,
            labelPosition === 'left' ? styles.labelLeft : styles.labelRight,
            disabled && styles.labelDisabled,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.small,
  },
  reverseContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  radio: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioChecked: {
    borderColor: colors.primary,
  },
  radioUnchecked: {
    borderColor: colors.border,
  },
  radioDisabled: {
    borderColor: colors.disabled,
    opacity: 0.6,
  },
  radioInner: {
    backgroundColor: colors.primary,
  },
  radioInnerDisabled: {
    backgroundColor: colors.disabled,
  },
  label: {
    ...typography.body,
    color: colors.text,
  },
  labelRight: {
    marginLeft: spacing.medium,
  },
  labelLeft: {
    marginRight: spacing.medium,
  },
  labelDisabled: {
    color: colors.textDisabled,
  },
});

export default RadioButton;
