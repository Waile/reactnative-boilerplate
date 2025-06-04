/**
 * TOAST SHOWCASE COMPONENT
 * 
 * Demonstrates the Toast notification system with different variants
 */

import React from 'react';
import { View, Alert } from 'react-native';
import { Button, useToast } from '../../../components/common';
import { spacing } from '../../../theme';

const ToastShowcase: React.FC = () => {
  const { showToast } = useToast();
  
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <Button
        title="Success Toast"
        onPress={() => 
          showToast('Operation completed successfully!', { 
            type: 'success',
            actionLabel: 'Undo',
            onAction: () => Alert.alert('Undo pressed'),
          })}
        style={{ marginBottom: spacing.medium, width: '48%' }}
      />
      
      <Button
        title="Error Toast"
        onPress={() => 
          showToast('Something went wrong!', { 
            type: 'error',
            duration: 5000,
          })}
        style={{ marginBottom: spacing.medium, width: '48%' }}
      />
      
      <Button
        title="Warning Toast"
        onPress={() => 
          showToast('This action may have consequences', { 
            type: 'warning',
          })}
        style={{ marginBottom: spacing.medium, width: '48%' }}
      />
      
      <Button
        title="Info Toast"
        onPress={() => 
          showToast('New updates are available', { 
            type: 'info',
          })}
        style={{ marginBottom: spacing.medium, width: '48%' }}
      />
    </View>
  );
};

export default ToastShowcase;
