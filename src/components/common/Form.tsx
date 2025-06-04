/**
 * FORM COMPONENT
 * 
 * THIS IS A REUSABLE FORM COMPONENT THAT HANDLES VALIDATION AND SUBMISSION
 * IT PROVIDES A CONSISTENT WAY TO BUILD FORMS THROUGHOUT THE APP
 */

import React, { useState, useCallback, ReactNode, createContext, useContext } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { colors, spacing } from '../../theme';
import Button from './Button';
import Text from './Text';
import { handleError, createError, ErrorType } from '../../utils/errorHandler';

// FORM FIELD VALUE TYPES
export type FormFieldValue = string | number | boolean | null | undefined;

// FORM VALUES INTERFACE
export interface FormValues {
  [key: string]: FormFieldValue;
}

// FORM ERRORS INTERFACE
export interface FormErrors {
  [key: string]: string | null;
}

// VALIDATION FUNCTION TYPE
export type ValidatorFn = (value: FormFieldValue, allValues?: FormValues) => string | null;

// FIELD VALIDATORS CONFIG
export interface FieldValidators {
  [key: string]: ValidatorFn[];
}

// FORM SUBMIT HANDLER
export type FormSubmitHandler<T extends FormValues> = (values: T) => void | Promise<void>;

// FORM COMPONENT PROPS
interface FormProps<T extends FormValues> {
  initialValues: T;
  validators?: FieldValidators;
  onSubmit: FormSubmitHandler<T>;
  children: ReactNode | ((props: FormChildrenProps<T>) => ReactNode);
  submitLabel?: string;
  style?: ViewStyle;
  scrollable?: boolean;
  keyboardAvoidingEnabled?: boolean;
  loading?: boolean;
  submitDisabled?: boolean;
  hideSubmitButton?: boolean;
}

// PROPS PASSED TO CHILDREN
// CREATE FORM CONTEXT
export const FormContext = createContext<FormChildrenProps<any> | null>(null);

// USE FORM HOOK - PROVIDES ACCESS TO FORM CONTEXT
export function useForm<T extends FormValues>(): FormChildrenProps<T> {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a Form component');
  }
  return context as FormChildrenProps<T>;
}

// USE FORM FIELD HOOK - PROVIDES ACCESS TO A SPECIFIC FORM FIELD
export function useFormField(fieldName: string) {
  const { values, errors, touched, setValue, setTouched } = useForm();
  
  return {
    value: values[fieldName],
    error: errors[fieldName] || null,
    touched: touched[fieldName] || false,
    handleChange: (value: FormFieldValue) => {
      setValue(fieldName, value);
      setTouched(fieldName, true);
    },
    setTouched: (isTouched = true) => setTouched(fieldName, isTouched),
  };
}

export interface FormChildrenProps<T extends FormValues> {
  values: T;
  errors: FormErrors;
  setValue: (name: keyof T, value: FormFieldValue) => void;
  setValues: (updates: Partial<T>) => void;
  handleSubmit: () => void;
  isValid: boolean;
  touched: Record<keyof T, boolean>;
  setTouched: (field: keyof T, isTouched?: boolean) => void;
  resetForm: () => void;
}

/**
 * FORM COMPONENT
 * Manages form state, validation, and submission
 */
const Form = <T extends FormValues>({
  initialValues,
  validators = {},
  onSubmit,
  children,
  submitLabel = 'Submit',
  style,
  scrollable = true,
  keyboardAvoidingEnabled = true,
  loading = false,
  submitDisabled = false,
  hideSubmitButton = false,
}: FormProps<T>): React.ReactElement => {
  // FORM STATE
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouchedState] = useState<Record<keyof T, boolean>>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = false;
      return acc;
    }, {} as Record<keyof T, boolean>)
  );

  // UPDATE A SINGLE FIELD VALUE
  const setValue = useCallback(
    (name: keyof T, value: FormFieldValue) => {
      setValues(prev => ({ ...prev, [name]: value }));
      
      // VALIDATE FIELD ON CHANGE IF IT'S BEEN TOUCHED
      if (touched[name]) {
        validateField(name, value);
      }
    },
    [touched, validators]
  );

  // SET MULTIPLE VALUES AT ONCE
  const setMultipleValues = useCallback(
    (updates: Partial<T>) => {
      setValues(prev => ({ ...prev, ...updates }));
      
      // VALIDATE UPDATED FIELDS IF THEY'VE BEEN TOUCHED
      Object.keys(updates).forEach(key => {
        if (touched[key as keyof T]) {
          validateField(key as keyof T, updates[key as keyof T]);
        }
      });
    },
    [touched, validators]
  );

  // MARK FIELD AS TOUCHED
  const setTouched = useCallback(
    (field: keyof T, isTouched: boolean = true) => {
      setTouchedState(prev => ({ ...prev, [field]: isTouched }));
      
      // VALIDATE FIELD WHEN MARKED AS TOUCHED
      if (isTouched) {
        validateField(field, values[field]);
      }
    },
    [values, validators]
  );

  // VALIDATE A SINGLE FIELD
  const validateField = useCallback(
    (name: keyof T, value: FormFieldValue) => {
      const fieldValidators = validators[name as string];
      
      if (!fieldValidators || fieldValidators.length === 0) {
        return null;
      }
      
      // RUN ALL VALIDATORS FOR THE FIELD
      let error: string | null = null;
      
      for (const validator of fieldValidators) {
        error = validator(value, values);
        if (error) {
          break;
        }
      }
      
      // UPDATE ERRORS STATE
      setErrors(prev => ({ ...prev, [name]: error }));
      
      return error;
    },
    [values, validators]
  );

  // VALIDATE ALL FIELDS
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    // VALIDATE EACH FIELD
    Object.keys(validators).forEach(key => {
      const fieldValidators = validators[key];
      const value = values[key as keyof T];
      
      if (fieldValidators && fieldValidators.length > 0) {
        let fieldError: string | null = null;
        
        for (const validator of fieldValidators) {
          fieldError = validator(value, values);
          if (fieldError) {
            break;
          }
        }
        
        newErrors[key] = fieldError;
        
        if (fieldError) {
          isValid = false;
        }
      }
    });
    
    // UPDATE ERRORS STATE
    setErrors(newErrors);
    
    return isValid;
  }, [values, validators]);

  // HANDLE FORM SUBMISSION
  const handleSubmit = useCallback(async () => {
    // MARK ALL FIELDS AS TOUCHED
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Record<keyof T, boolean>);
    
    setTouchedState(allTouched);
    
    // VALIDATE ALL FIELDS
    const isValid = validateForm();
    
    if (!isValid) {
      return;
    }
    
    try {
      // CALL SUBMIT HANDLER
      await onSubmit(values);
    } catch (error) {
      // HANDLE SUBMISSION ERROR
      handleError(
        createError(
          ErrorType.APP,
          'Form submission failed',
          error,
          undefined,
          'Form.handleSubmit'
        )
      );
    }
  }, [values, validateForm, onSubmit]);

  // RESET FORM TO INITIAL STATE
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouchedState(
      Object.keys(initialValues).reduce((acc, key) => {
        acc[key as keyof T] = false;
        return acc;
      }, {} as Record<keyof T, boolean>)
    );
  }, [initialValues]);

  // CHECK IF FORM IS VALID
  const isValid = Object.values(errors).every(error => !error);

  // FORM CHILDREN PROPS
  const childrenProps: FormChildrenProps<T> = {
    values,
    errors,
    setValue,
    setValues: setMultipleValues,
    handleSubmit,
    isValid,
    touched,
    setTouched,
    resetForm,
  };

  // RENDER CONTENT
  const content = (
    <FormContext.Provider value={childrenProps}>
      {typeof children === 'function' ? children(childrenProps) : children}
      
      {!hideSubmitButton && (
        <View style={styles.submitContainer}>
          <Button
            title={submitLabel}
            onPress={handleSubmit}
            disabled={submitDisabled || loading || !isValid}
            isLoading={loading}
            variant="primary"
            size="large"
          />
        </View>
      )}
    </FormContext.Provider>
  );

  // CONDITIONALLY WRAP WITH SCROLL VIEW
  const wrappedContent = scrollable ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {content}
    </ScrollView>
  ) : (
    content
  );

  // CONDITIONALLY WRAP WITH KEYBOARD AVOIDING VIEW
  return keyboardAvoidingEnabled ? (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      {wrappedContent}
    </KeyboardAvoidingView>
  ) : (
    <View style={[styles.container, style]}>{wrappedContent}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.medium,
  },
  submitContainer: {
    marginTop: spacing.large,
    marginBottom: spacing.medium,
  },
});

export default Form;
