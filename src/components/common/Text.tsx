/**
 * CUSTOM TEXT COMPONENT
 * 
 * THIS COMPONENT WRAPS THE NATIVE TEXT COMPONENT WITH CONSISTENT STYLING
 * IT ENSURES TEXT APPEARANCE IS STANDARDIZED THROUGHOUT THE APP
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography } from '../../theme';

interface TextProps extends RNTextProps {
  preset?: keyof typeof typography;
  children: React.ReactNode;
}

const Text = ({ preset = 'body1', style, children, ...rest }: TextProps) => {
  // MERGE DEFAULT STYLE FROM TYPOGRAPHY PRESET WITH CUSTOM STYLES
  const textStyles = [typography[preset], style];
  
  return (
    <RNText style={textStyles} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;
