/**
 * BADGE COMPONENT
 * 
 * THIS IS A REUSABLE BADGE COMPONENT
 * IT PROVIDES A CONSISTENT WAY TO DISPLAY NOTIFICATION COUNTS AND STATUS INDICATORS
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Text from './Text';
import { colors, spacing, typography } from '../../theme';

// BADGE PROPS INTERFACE
interface BadgeProps {
  value?: number | string;
  color?: string;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  visible?: boolean;
  maxValue?: number;
  dot?: boolean;
  bordered?: boolean;
  borderColor?: string;
  children?: React.ReactNode;
  testID?: string;
}

/**
 * BADGE COMPONENT
 * A versatile badge component for displaying counts and status indicators
 */
const Badge: React.FC<BadgeProps> = ({
  value,
  color = colors.white,
  backgroundColor = colors.error,
  size = 'medium',
  position = 'top-right',
  containerStyle,
  textStyle,
  visible = true,
  maxValue = 99,
  dot = false,
  bordered = false,
  borderColor = colors.background,
  children,
  testID,
}) => {
  // IF NOT VISIBLE, JUST RENDER CHILDREN OR NOTHING
  if (!visible) {
    return children ? <>{children}</> : null;
  }

  // GET SIZE VALUES
  const getSizeValues = () => {
    switch (size) {
      case 'small':
        return {
          minWidth: 16,
          height: 16,
          fontSize: 10,
          padding: 2,
          dotSize: 8,
        };
      case 'large':
        return {
          minWidth: 24,
          height: 24,
          fontSize: 14,
          padding: 4,
          dotSize: 12,
        };
      case 'medium':
      default:
        return {
          minWidth: 20,
          height: 20,
          fontSize: 12,
          padding: 3,
          dotSize: 10,
        };
    }
  };

  const { minWidth, height, fontSize, padding, dotSize } = getSizeValues();

  // FORMAT VALUE FOR DISPLAY
  const getDisplayValue = () => {
    if (dot) return null;
    
    if (typeof value === 'number' && value > maxValue) {
      return `${maxValue}+`;
    }
    
    return value?.toString();
  };

  const displayValue = getDisplayValue();

  // POSITION STYLES
  const getPositionStyles = (): ViewStyle => {
    if (!children) return {};

    const positionStyles: ViewStyle = {
      position: 'absolute',
      zIndex: 1,
    };

    switch (position) {
      case 'top-left':
        return {
          ...positionStyles,
          top: -height / 2,
          left: -minWidth / 2,
        };
      case 'bottom-right':
        return {
          ...positionStyles,
          bottom: -height / 2,
          right: -minWidth / 2,
        };
      case 'bottom-left':
        return {
          ...positionStyles,
          bottom: -height / 2,
          left: -minWidth / 2,
        };
      case 'top-right':
      default:
        return {
          ...positionStyles,
          top: -height / 2,
          right: -minWidth / 2,
        };
    }
  };

  const positionStyles = getPositionStyles();

  // BADGE ELEMENT
  const badgeElement = (
    <View
      style={[
        styles.badge,
        {
          backgroundColor,
          minWidth: dot ? dotSize : minWidth,
          height: dot ? dotSize : height,
          borderRadius: dot ? dotSize / 2 : height / 2,
          padding: dot ? 0 : padding,
        },
        bordered && {
          borderWidth: 2,
          borderColor,
        },
        !children && styles.standaloneBadge,
        containerStyle,
        children ? positionStyles : {},
      ]}
      testID={testID}
    >
      {displayValue && (
        <Text
          style={[
            styles.text,
            { color, fontSize },
            textStyle,
          ]}
        >
          {displayValue}
        </Text>
      )}
    </View>
  );

  // IF THERE ARE CHILDREN, WRAP THEM AND POSITION THE BADGE
  if (children) {
    return (
      <View style={styles.container}>
        {children}
        {badgeElement}
      </View>
    );
  }

  // STANDALONE BADGE
  return badgeElement;
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  standaloneBadge: {
    alignSelf: 'flex-start',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 2,
  },
});

export default Badge;
