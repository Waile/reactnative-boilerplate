/**
 * TYPOGRAPHY CONFIGURATION
 * 
 * THIS FILE DEFINES ALL TYPOGRAPHY STYLES USED IN THE APP
 * CENTRALIZING TYPOGRAPHY ENSURES CONSISTENT TEXT APPEARANCE ACROSS THE APP
 */

import { TextStyle } from 'react-native';
import { colors } from './colors';

// FONT FAMILY DEFINITIONS
const fontFamily = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

// FONT SIZES FOR DIFFERENT CONTEXTS
const fontSize = {
  tiny: 10,
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
  xlarge: 20,
  xxlarge: 24,
  huge: 28,
  giant: 32,
};

// LINE HEIGHT MULTIPLIERS FOR BETTER READABILITY
const lineHeightMultiplier = {
  tight: 1.15,
  normal: 1.5,
  loose: 1.75,
};

// TEXT STYLE VARIANTS
export const typography = {
  // HEADINGS
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.giant,
    lineHeight: fontSize.giant * lineHeightMultiplier.tight,
    color: colors.text.primary,
    fontWeight: 'bold',
  } as TextStyle,
  
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.huge,
    lineHeight: fontSize.huge * lineHeightMultiplier.tight,
    color: colors.text.primary,
    fontWeight: 'bold',
  } as TextStyle,
  
  h3: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxlarge,
    lineHeight: fontSize.xxlarge * lineHeightMultiplier.tight,
    color: colors.text.primary,
    fontWeight: 'bold',
  } as TextStyle,
  
  h4: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xlarge,
    lineHeight: fontSize.xlarge * lineHeightMultiplier.tight,
    color: colors.text.primary,
    fontWeight: '500',
  } as TextStyle,
  
  // BODY TEXT
  body1: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.medium,
    lineHeight: fontSize.medium * lineHeightMultiplier.normal,
    color: colors.text.primary,
  } as TextStyle,
  
  body2: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.regular,
    lineHeight: fontSize.regular * lineHeightMultiplier.normal,
    color: colors.text.primary,
  } as TextStyle,
  
  // SMALLER TEXT
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.small,
    lineHeight: fontSize.small * lineHeightMultiplier.normal,
    color: colors.text.secondary,
  } as TextStyle,
  
  // BUTTON TEXT
  button: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.medium,
    lineHeight: fontSize.medium * lineHeightMultiplier.tight,
    fontWeight: '500',
    color: colors.white,
  } as TextStyle,
};
