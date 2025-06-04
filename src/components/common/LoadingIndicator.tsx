/**
 * LOADING INDICATOR COMPONENT
 * 
 * THIS IS A REUSABLE LOADING ANIMATION COMPONENT
 * IT PROVIDES CONSISTENT LOADING STATES THROUGHOUT THE APP
 */

import React from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Modal,
} from 'react-native';
import Text from './Text';
import { colors, spacing } from '../../theme';

// LOADING INDICATOR PROPS
interface LoadingIndicatorProps {
  loading?: boolean;
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  fullscreen?: boolean;
  overlay?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

/**
 * LOADING INDICATOR COMPONENT
 * Shows an activity indicator with optional text
 */
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  loading = true,
  size = 'large',
  color = colors.primary,
  message,
  fullscreen = false,
  overlay = false,
  containerStyle,
  textStyle,
  testID,
}) => {
  // IF NOT LOADING, RENDER NOTHING
  if (!loading) {
    return null;
  }

  // MAIN CONTENT
  const content = (
    <View
      style={[
        styles.container,
        fullscreen && styles.fullscreen,
        overlay && styles.overlay,
        containerStyle,
      ]}
      testID={testID}
    >
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text style={[styles.message, textStyle]}>
          {message}
        </Text>
      )}
    </View>
  );

  // RENDER AS MODAL FOR OVERLAY VARIANT
  if (overlay) {
    return (
      <Modal transparent visible={loading} animationType="fade">
        {content}
      </Modal>
    );
  }

  // RENDER STANDARD VIEW
  return content;
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  fullscreen: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  message: {
    marginTop: spacing.medium,
    color: colors.text,
    textAlign: 'center',
  },
});

export default LoadingIndicator;
