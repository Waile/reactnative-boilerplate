/**
 * VALIDATION UTILITIES
 * 
 * THIS FILE CONTAINS COMMON VALIDATION FUNCTIONS USED THROUGHOUT THE APP
 * CENTRALIZING VALIDATION LOGIC ENSURES CONSISTENT VALIDATION RULES
 */

// EMAIL VALIDATION
export const isValidEmail = (email: string): boolean => {
  // REGEX FOR EMAIL VALIDATION
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// PASSWORD VALIDATION
export const isValidPassword = (password: string): boolean => {
  // PASSWORD MUST BE AT LEAST 8 CHARACTERS
  // MUST CONTAIN AT LEAST 1 UPPERCASE, 1 LOWERCASE, AND 1 NUMBER
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// USERNAME VALIDATION
export const isValidUsername = (username: string): boolean => {
  // USERNAME MUST BE 3-20 CHARACTERS
  // ONLY ALPHANUMERIC CHARACTERS AND UNDERSCORES ALLOWED
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// PHONE NUMBER VALIDATION
export const isValidPhoneNumber = (phone: string): boolean => {
  // BASIC INTERNATIONAL PHONE FORMAT
  // MODIFY ACCORDING TO YOUR SPECIFIC REQUIREMENTS
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
};

// URL VALIDATION
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// EMPTY CHECK
export const isEmpty = (value: string | null | undefined): boolean => {
  return value === null || value === undefined || value.trim() === '';
};

// FORM VALIDATION HELPER
export const validateForm = (
  form: Record<string, any>,
  rules: Record<string, (value: any) => boolean>
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.keys(rules).forEach(field => {
    const isValid = rules[field](form[field]);
    if (!isValid) {
      errors[field] = `Invalid ${field}`;
    }
  });
  
  return errors;
};
