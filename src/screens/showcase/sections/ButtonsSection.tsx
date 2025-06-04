/**
 * BUTTONS SECTION COMPONENT
 * 
 * Demonstrates various button variants and states
 */

import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Text } from '../../../components/common';
import { spacing } from '../../../theme';

const ButtonsSection: React.FC = () => {
  return (
    <ScrollView style={{ padding: spacing.medium }}>
      <Text preset="h2">Button Variants</Text>
      
      <Button 
        title="Primary Button" 
        variant="primary" 
        style={{ marginVertical: spacing.small }} 
      />
      
      <Button 
        title="Secondary Button" 
        variant="secondary" 
        style={{ marginVertical: spacing.small }} 
      />
      
      <Button 
        title="Outlined Button" 
        variant="outline" 
        style={{ marginVertical: spacing.small }} 
      />
      
      <Button 
        title="Text Button" 
        variant="text" 
        style={{ marginVertical: spacing.small }} 
      />
      
      <Button 
        title="Text Link" 
        variant="text" 
        style={{ marginVertical: spacing.small }} 
      />
      
      <Text preset="h2" style={{ marginTop: spacing.medium }}>Button States</Text>
      
      <Button 
        title="With Icons" 
        leftIcon={<Text>⭐</Text>} 
        rightIcon={<Text>→</Text>} 
        style={{ marginVertical: spacing.small }} 
      />
      
      <Button 
        title="Loading State" 
        isLoading={true}
        style={{ marginVertical: spacing.small }} 
      />
      
      <Button 
        title="Disabled Button" 
        disabled={true}
        style={{ marginVertical: spacing.small }} 
      />
      
      <Text preset="h2" style={{ marginTop: spacing.medium }}>Button Sizes</Text>
      
      <Button 
        title="Small Button" 
        size="small"
        style={{ marginVertical: spacing.small }} 
      />
      
      <Button 
        title="Medium Button" 
        size="medium"
        style={{ marginVertical: spacing.small }} 
      />
      
      <Button 
        title="Large Button" 
        size="large"
        style={{ marginVertical: spacing.small }} 
      />
    </ScrollView>
  );
};

export default ButtonsSection;
