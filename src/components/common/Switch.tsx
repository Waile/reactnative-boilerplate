/**
 * SWITCH COMPONENT
 * 
 * THIS IS A REUSABLE TOGGLE SWITCH COMPONENT
 * IT PROVIDES CONSISTENT STYLING WITH LABEL AND STATUS
 */

import React from 'react';
import {
  View,
  Switch as RNSwitch,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from './Text';
import { colors, spacing, typography } from '../../theme';

// SWITCH PROPS INTERFACE
interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string | null;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  labelPosition?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  trackColor?: {
    false: string;
    true: string;
  };
  thumbColor?: {
    false: string;
    true: string;
  };
  testID?: string;
  description?: string;
}

/**
 * SWITCH COMPONENT
 * A customizable toggle switch with label
 */
const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
  error,
  containerStyle,
  labelStyle,
  labelPosition = 'left',
  size = 'medium',
  trackColor = {
    false: colors.backgroundLight,
    true: colors.primaryLight,
  },
  thumbColor = {
    false: colors.white,
    true: colors.primary,
  },
  testID,
  description,
}) => {
  // DETERMINE SIZE SCALE BASED ON SIZE PROP
  const getSizeScale = () => {
    switch (size) {
      case 'small':
        return 0.8;
      case 'large':
        return 1.2;
      case 'medium':
      default:
        return 1;
    }
  };

  const sizeScale = getSizeScale();
  
  // HANDLE PRESS ON THE ENTIRE COMPONENT
  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} disabled={disabled}>
      <View style={[styles.container, containerStyle]}>
        <View style={[
          styles.contentContainer,
          labelPosition === 'right' ? styles.contentReverse : null,
        ]}>
          {/* LABEL */}
          {label && (
            <View style={styles.labelContainer}>
              <Text
                style={[
                  styles.label,
                  disabled && styles.labelDisabled,
                  labelStyle,
                ]}
              >
                {label}
              </Text>
              
              {/* DESCRIPTION IF PROVIDED */}
              {description && (
                <Text style={styles.description}>
                  {description}
                </Text>
              )}
            </View>
          )}

          {/* SWITCH */}
          <RNSwitch
            value={value}
            onValueChange={onValueChange}
            disabled={disabled}
            trackColor={trackColor}
            thumbColor={
              disabled
                ? colors.disabled
                : value
                  ? thumbColor.true
                  : thumbColor.false
            }
            ios_backgroundColor={trackColor.false}
            style={[
              styles.switch,
              { transform: [{ scaleX: sizeScale }, { scaleY: sizeScale }] },
            ]}
            testID={testID}
          />
        </View>

        {/* ERROR MESSAGE */}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.small,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentReverse: {
    flexDirection: 'row-reverse',
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    ...typography.body,
    color: colors.text,
  },
  labelDisabled: {
    color: colors.textDisabled,
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.tiny,
  },
  switch: {
    marginHorizontal: spacing.small,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.small,
  },
});

export default Switch;
