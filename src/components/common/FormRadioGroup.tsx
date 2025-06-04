/**
 * FORM RADIO GROUP COMPONENT
 * 
 * THIS IS A FORM-CONNECTED RADIO GROUP COMPONENT
 * IT PROVIDES INTEGRATION WITH THE FORM COMPONENT FOR RADIO GROUP
 */

import React from 'react';
import { ViewStyle } from 'react-native';
import RadioGroup, { RadioOption } from './RadioGroup';
import { useFormField } from './Form';

// FORM RADIO GROUP PROPS INTERFACE
interface FormRadioGroupProps {
  name: string;
  options: RadioOption[];
  label?: string;
  containerStyle?: ViewStyle;
  direction?: 'vertical' | 'horizontal';
  size?: 'small' | 'medium' | 'large';
  required?: boolean;
  disabled?: boolean;
  testID?: string;
}

/**
 * FORM RADIO GROUP COMPONENT
 * A form-connected radio group component
 */
const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  name,
  options,
  label,
  containerStyle,
  direction = 'vertical',
  size = 'medium',
  required = false,
  disabled = false,
  testID,
}) => {
  // GET FORM FIELD PROPS FROM FORM CONTEXT
  const {
    value,
    error,
    touched,
    handleChange,
  } = useFormField(name);
  
  // HANDLE RADIO GROUP CHANGE
  const handleRadioChange = (selectedValue: string | number) => {
    handleChange(selectedValue);
  };
  
  // ONLY SHOW ERROR IF FIELD HAS BEEN TOUCHED
  const showError = touched && !!error;
  
  return (
    <RadioGroup
      options={options}
      value={value || null}
      onChange={handleRadioChange}
      label={label}
      error={showError ? error : null}
      containerStyle={containerStyle}
      required={required}
      disabled={disabled}
      direction={direction}
      size={size}
      testID={testID || `form-radio-group-${name}`}
    />
  );
};

export default FormRadioGroup;
