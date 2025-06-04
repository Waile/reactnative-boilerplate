/**
 * INPUTS SECTION COMPONENT
 * 
 * Demonstrates different text input components and variants
 */

import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TextField, Text } from '../../../components/common';
import { spacing } from '../../../theme';

const InputsSection: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <ScrollView style={{ padding: spacing.medium }}>
      <Text preset="h2">Text Fields</Text>
      
      <TextField
        label="Standard Field"
        placeholder="Enter text"
        style={{ marginVertical: spacing.small }}
      />
      
      <TextField
        label="With Left Icon"
        placeholder="Search"
        leftIcon="search"
        style={{ marginVertical: spacing.small }}
      />
      
      <TextField
        label="Password Field"
        placeholder="Enter password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        rightIcon={showPassword ? "visibility" : "visibility-off"}
        onRightIconPress={togglePasswordVisibility}
        style={{ marginVertical: spacing.small }}
      />
      
      <Text preset="h2" style={{ marginTop: spacing.medium }}>Validation States</Text>
      
      <TextField
        label="Error State"
        value="Invalid input"
        error="This field has an error"
        style={{ marginVertical: spacing.small }}
      />
      
      <TextField
        label="Disabled Field"
        value="Can't edit this"
        disabled={true}
        style={{ marginVertical: spacing.small }}
      />
      
      <TextField
        label="With Helper Text"
        placeholder="Enter username"
        helperText="Your username must be unique"
        style={{ marginVertical: spacing.small }}
      />
      
      <Text preset="h2" style={{ marginTop: spacing.medium }}>Field Variants</Text>
      
      <TextField
        label="Outlined Field"
        placeholder="Outlined variant"
        variant="outlined"
        style={{ marginVertical: spacing.small }}
      />
      
      <TextField
        label="Filled Field"
        placeholder="Filled variant"
        variant="filled"
        style={{ marginVertical: spacing.small }}
      />
      
      <TextField
        label="Underlined Field"
        placeholder="Underlined variant"
        variant="underlined"
        style={{ marginVertical: spacing.small }}
      />
      
      <Text preset="h2" style={{ marginTop: spacing.medium }}>Multiline Input</Text>
      
      <TextField
        label="Multiline Text Area"
        placeholder="Enter a longer text..."
        multiline={true}
        numberOfLines={4}
        style={{ marginVertical: spacing.small }}
      />
    </ScrollView>
  );
};

export default InputsSection;
