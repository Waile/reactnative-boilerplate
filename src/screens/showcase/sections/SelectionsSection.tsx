/**
 * SELECTIONS SECTION COMPONENT
 * 
 * Demonstrates selection controls like checkboxes, switches, selects, and radio buttons
 */

import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { 
  Text, 
  Checkbox, 
  Switch, 
  Select, 
  RadioButton, 
  RadioGroup,
  RadioOption 
} from '../../../components/common';
import { spacing, colors } from '../../../theme';

const SelectionsSection: React.FC = () => {
  // State for the interactive components
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [switchValue, setSwitchValue] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>('1');
  const [selectedRadio, setSelectedRadio] = useState<string | number>('1');
  
  // Sample data
  const selectOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];
  
  const radioOptions: RadioOption[] = [
    { label: 'Option A', value: '1' },
    { label: 'Option B', value: '2' },
    { label: 'Disabled Option', value: '3', disabled: true },
  ];
  
  return (
    <ScrollView style={{ padding: spacing.medium }}>
      <Text preset="h2">Checkboxes</Text>
      
      <Checkbox
        label="Basic Checkbox"
        checked={checkboxValue}
        onChange={() => setCheckboxValue(!checkboxValue)}
        style={{ marginVertical: spacing.small }}
      />
      
      <Checkbox
        label="Checked Checkbox"
        checked={true}
        onChange={() => {}}
        style={{ marginVertical: spacing.small }}
      />
      
      <Checkbox
        label="Disabled Checkbox"
        checked={true}
        disabled={true}
        onChange={() => {}}
        style={{ marginVertical: spacing.small }}
      />
      
      <Checkbox
        label="With Error"
        checked={true}
        error="This selection is problematic"
        onChange={() => {}}
        style={{ marginVertical: spacing.small }}
      />
      
      <Text preset="h2" style={{ marginTop: spacing.medium }}>Switches</Text>
      
      <Switch
        label="Basic Switch"
        value={switchValue}
        onValueChange={() => setSwitchValue(!switchValue)}
        style={{ marginVertical: spacing.small }}
      />
      
      <Switch
        label="With Description"
        description="This describes what the switch does"
        value={true}
        onValueChange={() => {}}
        style={{ marginVertical: spacing.small }}
      />
      
      <Switch
        label="Disabled Switch"
        value={true}
        disabled={true}
        onValueChange={() => {}}
        style={{ marginVertical: spacing.small }}
      />
      
      <Text preset="h2" style={{ marginTop: spacing.medium }}>Select Dropdowns</Text>
      
      <Select
        label="Basic Select"
        options={selectOptions}
        value={selectedOption}
        onSelect={(value) => setSelectedOption(value as string)}
        style={{ marginVertical: spacing.small }}
      />
      
      <Select
        label="With Placeholder"
        options={selectOptions}
        placeholder="Choose an option"
        value=""
        onSelect={() => {}}
        style={{ marginVertical: spacing.small }}
      />
      
      <Select
        label="Disabled Select"
        options={selectOptions}
        value="1"
        disabled={true}
        onSelect={() => {}}
        style={{ marginVertical: spacing.small }}
      />
      
      <Text preset="h2" style={{ marginTop: spacing.medium }}>Radio Buttons</Text>
      
      <View style={{ marginVertical: spacing.small }}>
        <RadioButton
          label="Individual Radio Button"
          checked={true}
          onChange={() => {}}
        />
      </View>
      
      <View style={{ marginVertical: spacing.small }}>
        <RadioButton
          label="Unchecked Radio Button"
          checked={false}
          onChange={() => {}}
        />
      </View>
      
      <View style={{ marginVertical: spacing.medium }}>
        <Text style={{ marginBottom: spacing.small }}>Radio Button Sizes:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <RadioButton
            label="Small"
            checked={true}
            size="small"
            onChange={() => {}}
          />
          <RadioButton
            label="Medium"
            checked={true}
            size="medium"
            onChange={() => {}}
          />
          <RadioButton
            label="Large"
            checked={true}
            size="large"
            onChange={() => {}}
          />
        </View>
      </View>
      
      <Text preset="h2" style={{ marginTop: spacing.medium }}>Radio Groups</Text>
      
      <RadioGroup
        label="Vertical Radio Group"
        options={radioOptions}
        value={selectedRadio}
        onChange={setSelectedRadio}
        style={{ marginVertical: spacing.medium }}
        direction="vertical"
      />
      
      <RadioGroup
        label="Horizontal Radio Group"
        options={radioOptions.slice(0, 2)} // Using just the first two for better horizontal layout
        value={selectedRadio}
        onChange={setSelectedRadio}
        style={{ marginVertical: spacing.medium }}
        direction="horizontal"
      />
    </ScrollView>
  );
};

export default SelectionsSection;
