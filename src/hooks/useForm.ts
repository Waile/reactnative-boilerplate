/**
 * FORM HOOK
 * 
 * THIS HOOK SIMPLIFIES FORM STATE MANAGEMENT AND VALIDATION
 * IT PROVIDES COMMON FORM HANDLING FUNCTIONALITY
 */

import { useState, useCallback } from 'react';
import { validateForm } from '../utils/validation';

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => boolean;
};

interface UseFormResult<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (field: keyof T, value: any) => void;
  handleBlur: (field: keyof T) => void;
  handleSubmit: (onSubmit: (values: T) => void) => void;
  reset: () => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setValues: (values: Partial<T>) => void;
  isValid: boolean;
}

const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules?: ValidationRules<T>
): UseFormResult<T> => {
  // STATE FOR FORM VALUES, ERRORS, AND TOUCHED FIELDS
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  
  // VALIDATE A SINGLE FIELD
  const validateField = useCallback(
    (field: keyof T, value: any): string | null => {
      if (!validationRules || !validationRules[field]) return null;
      
      const isValid = validationRules[field]!(value);
      return isValid ? null : `Invalid ${String(field)}`;
    },
    [validationRules]
  );
  
  // VALIDATE ALL FIELDS
  const validateFields = useCallback((): boolean => {
    if (!validationRules) return true;
    
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach((field) => {
      const key = field as keyof T;
      const error = validateField(key, values[key]);
      
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  }, [validationRules, values, validateField]);
  
  // HANDLE INPUT CHANGE
  const handleChange = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      
      // VALIDATE ON CHANGE IF FIELD HAS BEEN TOUCHED
      if (touched[field]) {
        const error = validateField(field, value);
        setErrors((prev) => ({
          ...prev,
          [field]: error || undefined,
        }));
      }
    },
    [touched, validateField]
  );
  
  // HANDLE INPUT BLUR (VALIDATE ON BLUR)
  const handleBlur = useCallback(
    (field: keyof T) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const error = validateField(field, values[field]);
      setErrors((prev) => ({
        ...prev,
        [field]: error || undefined,
      }));
    },
    [values, validateField]
  );
  
  // HANDLE FORM SUBMISSION
  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void) => {
      // MARK ALL FIELDS AS TOUCHED
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched as Partial<Record<keyof T, boolean>>);
      
      // VALIDATE ALL FIELDS
      const isValid = validateFields();
      
      if (isValid) {
        onSubmit(values);
      }
    },
    [values, validateFields]
  );
  
  // RESET FORM TO INITIAL VALUES
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);
  
  // SET A SPECIFIC FIELD VALUE
  const setFieldValue = useCallback(
    (field: keyof T, value: any) => {
      handleChange(field, value);
    },
    [handleChange]
  );
  
  // SET MULTIPLE VALUES AT ONCE
  const setFormValues = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  }, []);
  
  // CHECK IF FORM IS VALID
  const isValid = Object.keys(errors).length === 0;
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setValues: setFormValues,
    isValid,
  };
};

export default useForm;
