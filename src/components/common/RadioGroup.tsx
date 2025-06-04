/**
 * RADIO GROUP COMPONENT
 * 
 * THIS IS A COMPONENT FOR MANAGING A GROUP OF RADIO BUTTONS
 * IT HANDLES STATE MANAGEMENT AND LAYOUT FOR MULTIPLE OPTIONS
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Text from './Text';
import RadioButton from './RadioButton';
import { colors, spacing, typography } from '../../theme';

// RADIO OPTION INTERFACE
export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

// RADIO GROUP PROPS INTERFACE
interface RadioGroupProps {
  options: RadioOption[];
  value: string | number | null;
  onChange: (value: string | number) => void;
  label?: string;
  error?: string | null;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  required?: boolean;
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal';
  size?: 'small' | 'medium' | 'large';
  testID?: string;
}

/**
 * RADIO GROUP COMPONENT
 * A group of radio buttons with shared state management
 */
const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  label,
  error,
  containerStyle,
  labelStyle,
  required = false,
  disabled = false,
  direction = 'vertical',
  size = 'medium',
  testID,
}) => {
  // HANDLE RADIO BUTTON CHANGE
  const handleRadioChange = (selectedValue: string | number) => {
    if (value !== selectedValue) {
      onChange(selectedValue);
    }
  };
  
  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {/* GROUP LABEL */}
      {label && (
        <View style={styles.labelContainer}>
          <Text
            style={[
              styles.label,
              labelStyle,
            ]}
          >
            {label}
            {required && <Text style={styles.requiredAsterisk}> *</Text>}
          </Text>
        </View>
      )}
      
      {/* RADIO OPTIONS */}
      <View
        style={[
          styles.optionsContainer,
          direction === 'horizontal' ? styles.horizontalDirection : styles.verticalDirection,
        ]}
      >
        {options.map((option) => (
          <RadioButton
            key={option.value.toString()}
            label={option.label}
            checked={value === option.value}
            onChange={() => handleRadioChange(option.value)}
            disabled={disabled || option.disabled}
            size={size}
            containerStyle={
              direction === 'horizontal'
                ? styles.horizontalRadioButton
                : styles.verticalRadioButton
            }
            testID={`${testID}-option-${option.value}`}
          />
        ))}
      </View>
      
      {/* ERROR MESSAGE */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.medium,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: spacing.small,
  },
  label: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  requiredAsterisk: {
    color: colors.error,
  },
  optionsContainer: {
    marginTop: spacing.small,
  },
  verticalDirection: {
    flexDirection: 'column',
  },
  horizontalDirection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  verticalRadioButton: {
    marginVertical: spacing.small / 2,
  },
  horizontalRadioButton: {
    marginRight: spacing.large,
    marginVertical: spacing.small / 2,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.small,
  },
});

export default RadioGroup;
