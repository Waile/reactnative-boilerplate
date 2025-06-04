/**
 * CHECKBOX COMPONENT
 * 
 * THIS IS A REUSABLE CHECKBOX COMPONENT
 * IT SUPPORTS DIFFERENT STATES AND LABELS
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
import Icon from 'react-native-vector-icons/MaterialIcons';

// CHECKBOX PROPS INTERFACE
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string | null;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  size?: 'small' | 'medium' | 'large';
  required?: boolean;
  labelPosition?: 'right' | 'left';
  testID?: string;
}

/**
 * CHECKBOX COMPONENT
 * A customizable checkbox with label
 */
const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  error,
  containerStyle,
  labelStyle,
  size = 'medium',
  required = false,
  labelPosition = 'right',
  testID,
}) => {
  // DETERMINE SIZE DIMENSIONS
  const getSize = () => {
    switch (size) {
      case 'small':
        return { box: 18, icon: 16 };
      case 'large':
        return { box: 28, icon: 24 };
      case 'medium':
      default:
        return { box: 24, icon: 20 };
    }
  };

  const { box: boxSize, icon: iconSize } = getSize();

  // HANDLE PRESS EVENT
  const handlePress = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* RENDER CONTENT BASED ON LABEL POSITION */}
      <View style={[
        styles.contentContainer,
        labelPosition === 'left' ? styles.contentReverse : null,
      ]}>
        {/* CHECKBOX */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePress}
          disabled={disabled}
          style={[
            styles.checkbox,
            { width: boxSize, height: boxSize },
            checked ? styles.checked : styles.unchecked,
            disabled && styles.disabled,
            error ? styles.error : null,
          ]}
          testID={testID}
        >
          {checked && (
            <Icon
              name="check"
              size={iconSize}
              color={disabled ? colors.gray : colors.white}
            />
          )}
        </TouchableOpacity>

        {/* LABEL */}
        {label && (
          <View style={styles.labelContainer}>
            <Text
              style={[
                styles.label,
                labelPosition === 'left' ? styles.labelLeft : styles.labelRight,
                disabled && styles.labelDisabled,
                labelStyle,
              ]}
            >
              {label}
              {required && <Text style={styles.requiredAsterisk}> *</Text>}
            </Text>
          </View>
        )}
      </View>

      {/* ERROR MESSAGE */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.small,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentReverse: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 4,
  },
  checked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  unchecked: {
    backgroundColor: 'transparent',
    borderColor: colors.gray,
  },
  disabled: {
    backgroundColor: colors.lightGray,
    borderColor: colors.gray,
    opacity: 0.6,
  },
  error: {
    borderColor: colors.error,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    ...typography.body1,
    color: colors.text.primary,
  },
  labelRight: {
    marginLeft: spacing.medium,
  },
  labelLeft: {
    marginRight: spacing.medium,
  },
  labelDisabled: {
    color: colors.gray,
  },
  requiredAsterisk: {
    color: colors.error,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.small,
    marginLeft: spacing.medium + 24, // Align with label
  },
});

export default Checkbox;
