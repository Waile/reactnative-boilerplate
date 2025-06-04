/**
 * AVATAR COMPONENT
 * 
 * THIS IS A REUSABLE AVATAR COMPONENT FOR DISPLAYING USER PROFILE IMAGES
 * IT SUPPORTS DIFFERENT SIZES, SHAPES, AND FALLBACK MECHANISMS
 */

import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
import Text from './Text';
import { colors, spacing } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

// AVATAR PROPS INTERFACE
interface AvatarProps {
  source?: ImageSourcePropType | null;
  name?: string;
  size?: number | 'small' | 'medium' | 'large' | 'xlarge';
  shape?: 'circle' | 'square' | 'rounded';
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  textStyle?: TextStyle;
  iconName?: string;
  iconColor?: string;
  backgroundColor?: string;
  loadingIndicatorColor?: string;
  onPress?: () => void;
  testID?: string;
}

/**
 * AVATAR COMPONENT
 * A versatile avatar component for displaying user images or initials
 */
const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'medium',
  shape = 'circle',
  containerStyle,
  imageStyle,
  textStyle,
  iconName,
  iconColor = colors.white,
  backgroundColor,
  loadingIndicatorColor = colors.primary,
  testID,
}) => {
  // STATE
  const [isLoading, setIsLoading] = useState(!!source);
  const [hasError, setHasError] = useState(false);
  
  // DETERMINE AVATAR SIZE
  const getAvatarSize = (): number => {
    if (typeof size === 'number') {
      return size;
    }
    
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 64;
      case 'xlarge':
        return 96;
      case 'medium':
      default:
        return 48;
    }
  };
  
  // CALCULATE RADIUS BASED ON SHAPE AND SIZE
  const getRadius = (): number => {
    const avatarSize = getAvatarSize();
    
    switch (shape) {
      case 'circle':
        return avatarSize / 2;
      case 'rounded':
        return 8;
      case 'square':
      default:
        return 0;
    }
  };
  
  // GET INITIALS FROM NAME
  const getInitials = (): string => {
    if (!name) return '';
    
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (
      nameParts[0].charAt(0).toUpperCase() + 
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };
  
  // GET BACKGROUND COLOR BASED ON NAME
  const getBackgroundColor = (): string => {
    if (backgroundColor) return backgroundColor;
    
    // IF HAS NAME, GENERATE CONSISTENT COLOR FROM NAME
    if (name) {
      const colorOptions = [
        colors.primary,
        colors.secondary,
        colors.tertiary,
        colors.accent,
        colors.info,
      ];
      
      let sum = 0;
      for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i);
      }
      
      return colorOptions[sum % colorOptions.length];
    }
    
    // DEFAULT COLOR
    return colors.primary;
  };
  
  // AVATAR SIZE AND SHAPE STYLES
  const avatarSize = getAvatarSize();
  const radius = getRadius();
  const bgColor = getBackgroundColor();
  
  // FONT SIZE BASED ON AVATAR SIZE
  const fontSize = Math.floor(avatarSize * 0.4);
  
  return (
    <View
      style={[
        styles.container,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: radius,
          backgroundColor: bgColor,
        },
        containerStyle,
      ]}
      testID={testID}
    >
      {/* IMAGE IF SOURCE IS AVAILABLE AND NO ERROR */}
      {source && !hasError ? (
        <Image
          source={source}
          style={[
            styles.image,
            { borderRadius: radius },
            imageStyle,
          ]}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      ) : null}
      
      {/* LOADING INDICATOR */}
      {isLoading && (
        <ActivityIndicator
          color={loadingIndicatorColor}
          size="small"
          style={styles.loader}
        />
      )}
      
      {/* INITIALS FALLBACK */}
      {(hasError || !source) && name && (
        <Text
          style={[
            styles.initials,
            { fontSize },
            textStyle,
          ]}
        >
          {getInitials()}
        </Text>
      )}
      
      {/* ICON FALLBACK */}
      {(hasError || !source) && !name && iconName && (
        <Icon
          name={iconName}
          size={avatarSize * 0.5}
          color={iconColor}
        />
      )}
      
      {/* DEFAULT ICON IF NOTHING ELSE AVAILABLE */}
      {(hasError || !source) && !name && !iconName && (
        <Icon
          name="person"
          size={avatarSize * 0.5}
          color={iconColor}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  initials: {
    color: colors.white,
    fontWeight: 'bold',
  },
  loader: {
    position: 'absolute',
  },
});

export default Avatar;
