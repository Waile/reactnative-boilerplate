/**
 * FORM FIELD COMPONENT
 * 
 * THIS IS A WRAPPER FOR FORM INPUT COMPONENTS
 * IT CONNECTS FORM STATE TO INDIVIDUAL INPUT COMPONENTS
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { FormValues, FormErrors } from './Form';
import TextField, { TextFieldProps } from './TextField';
import Checkbox from './Checkbox';
import Switch from './Switch';
import Select, { SelectOption } from './Select';
import { spacing } from '../../theme';

// FORM FIELD TYPES
export type FieldType = 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'switch' | 'textarea';

// BASE FORM FIELD PROPS
interface BaseFormFieldProps {
  name: string;
  label?: string;
  values: FormValues;
  errors: FormErrors;
  touched: Record<string, boolean>;
  setValue: (name: string, value: any) => void;
  setTouched: (name: string, touched: boolean) => void;
  containerStyle?: ViewStyle;
  required?: boolean;
  disabled?: boolean;
  testID?: string;
}

// TEXT FIELD PROPS
interface TextFormFieldProps extends BaseFormFieldProps {
  type: Extract<FieldType, 'text' | 'email' | 'password' | 'number' | 'textarea'>;
  textInputProps?: Partial<TextFieldProps>;
}

// SELECT FIELD PROPS
interface SelectFormFieldProps extends BaseFormFieldProps {
  type: Extract<FieldType, 'select'>;
  options: SelectOption[];
  placeholder?: string;
}

// CHECKBOX FIELD PROPS
interface CheckboxFormFieldProps extends BaseFormFieldProps {
  type: Extract<FieldType, 'checkbox'>;
  checkboxLabel?: string;
}

// SWITCH FIELD PROPS
interface SwitchFormFieldProps extends BaseFormFieldProps {
  type: Extract<FieldType, 'switch'>;
  description?: string;
}

// COMBINED FORM FIELD PROPS
type FormFieldProps = 
  | TextFormFieldProps 
  | SelectFormFieldProps 
  | CheckboxFormFieldProps 
  | SwitchFormFieldProps;

/**
 * FORM FIELD COMPONENT
 * Connects form state to input components
 */
const FormField: React.FC<FormFieldProps> = (props) => {
  const {
    name,
    label,
    values,
    errors,
    touched,
    setValue,
    setTouched,
    containerStyle,
    required = false,
    disabled = false,
    testID,
    type,
  } = props;

  // CURRENT VALUE AND ERROR
  const value = values[name];
  const error = errors[name];
  const isTouched = touched[name];

  // HANDLE FIELD BLUR EVENT
  const handleBlur = () => {
    setTouched(name, true);
  };

  // RENDER BASED ON FIELD TYPE
  const renderField = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        const textProps = (props as TextFormFieldProps).textInputProps || {};
        
        return (
          <TextField
            label={label}
            value={value as string}
            onChangeText={(text) => setValue(name, text)}
            onBlur={handleBlur}
            error={error}
            touched={isTouched}
            required={required}
            secureTextEntry={type === 'password'}
            keyboardType={type === 'email' ? 'email-address' : type === 'number' ? 'numeric' : 'default'}
            disabled={disabled}
            testID={testID}
            {...textProps}
          />
        );

      case 'textarea':
        const textareaProps = (props as TextFormFieldProps).textInputProps || {};
        
        return (
          <TextField
            label={label}
            value={value as string}
            onChangeText={(text) => setValue(name, text)}
            onBlur={handleBlur}
            error={error}
            touched={isTouched}
            required={required}
            multiline
            numberOfLines={4}
            style={{ textAlignVertical: 'top', minHeight: 120 }}
            disabled={disabled}
            testID={testID}
            {...textareaProps}
          />
        );

      case 'select':
        const { options, placeholder } = props as SelectFormFieldProps;
        
        return (
          <Select
            label={label}
            options={options}
            value={value as string | number}
            onSelect={(selectedValue) => setValue(name, selectedValue)}
            error={error}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            testID={testID}
          />
        );

      case 'checkbox':
        const { checkboxLabel } = props as CheckboxFormFieldProps;
        
        return (
          <Checkbox
            label={checkboxLabel || label}
            checked={Boolean(value)}
            onChange={(checked) => setValue(name, checked)}
            error={error}
            required={required}
            disabled={disabled}
            testID={testID}
          />
        );

      case 'switch':
        const { description } = props as SwitchFormFieldProps;
        
        return (
          <Switch
            label={label}
            value={Boolean(value)}
            onValueChange={(newValue) => setValue(name, newValue)}
            error={error}
            description={description}
            disabled={disabled}
            testID={testID}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {renderField()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.medium,
  },
});

export default FormField;
