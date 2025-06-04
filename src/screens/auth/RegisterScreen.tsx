/**
 * REGISTER SCREEN
 * 
 * THIS IS A SAMPLE IMPLEMENTATION OF THE REGISTRATION FORM
 * IT DEMONSTRATES HOW TO USE FORM VALIDATION AND SUBMISSION
 */

import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { colors, spacing, typography } from '../../theme';
import { Form, FormValues } from '../../components/common/Form';
import FormField from '../../components/common/FormField';
import Text from '../../components/common/Text';
import Button from '../../components/common/Button';
import { validateEmail, validateRequired, validateMinLength, validateMatch } from '../../utils/validation';
import { register } from '../../store/slices/authSlice';
import { useApi } from '../../hooks/useApi';
import { handleError, createError, ErrorType } from '../../utils/errorHandler';
import { useTranslation } from '../../utils/i18n';

// REGISTER FORM VALUES TYPE
interface RegisterFormValues extends FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

// INITIAL FORM STATE
const initialValues: RegisterFormValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

/**
 * REGISTER SCREEN COMPONENT
 * Handles user registration
 */
const RegisterScreen: React.FC = () => {
  // HOOKS
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  // API HOOK
  const { loading, execute: executeRegister } = useApi<{ token: string }, RegisterFormValues>(
    async (data) => {
      // THIS WOULD BE REPLACED WITH ACTUAL API CALL
      // Example: return api.post('/auth/register', data);
      
      // Simulate API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful response
      return { token: 'sample-registration-token' };
    }
  );

  // FORM VALIDATION CONFIG
  const validators = {
    fullName: [validateRequired(t('validation.nameRequired'))],
    email: [validateRequired(t('validation.emailRequired')), validateEmail()],
    password: [
      validateRequired(t('validation.passwordRequired')),
      validateMinLength(8, t('validation.passwordMinLength', { length: 8 })),
    ],
    confirmPassword: [
      validateRequired(t('validation.confirmPasswordRequired')),
      validateMatch('password', t('validation.passwordsDoNotMatch')),
    ],
    acceptTerms: [
      (value) => (!value ? t('validation.acceptTermsRequired') : null),
    ],
  };

  // HANDLE REGISTRATION SUBMISSION
  const handleRegister = async (values: RegisterFormValues) => {
    try {
      // EXCLUDE CONFIRM PASSWORD FROM API CALL
      const { confirmPassword, ...registrationData } = values;
      
      const response = await executeRegister(registrationData as any);
      
      if (response?.token) {
        // DISPATCH REGISTRATION ACTION
        dispatch(register({
          token: response.token,
          user: {
            id: '1',
            email: values.email,
            name: values.fullName,
          },
        }));
        
        // NAVIGATE TO HOME OR VERIFICATION SCREEN
        // navigation.navigate('EmailVerification');
      }
    } catch (error) {
      handleError(
        createError(
          ErrorType.AUTH,
          t('register.registrationFailed'),
          error,
          { email: values.email },
          'RegisterScreen.handleRegister'
        )
      );
    }
  };

  // HANDLE LOGIN NAVIGATION
  const navigateToLogin = () => {
    // navigation.navigate('Login');
  };

  // HANDLE TERMS NAVIGATION
  const navigateToTerms = () => {
    // navigation.navigate('Terms');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{t('register.createAccount')}</Text>
            <Text style={styles.subtitle}>{t('register.subtitle')}</Text>
          </View>

          {/* REGISTER FORM */}
          <Form
            initialValues={initialValues}
            validators={validators}
            onSubmit={handleRegister}
            submitLabel={t('register.createAccount')}
            loading={loading}
          >
            {({ values, errors, setValue, setTouched, touched }) => (
              <View style={styles.formContainer}>
                {/* FULL NAME FIELD */}
                <FormField
                  type="text"
                  name="fullName"
                  label={t('register.fullName')}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setValue={setValue}
                  setTouched={setTouched}
                  required
                  textInputProps={{
                    autoCapitalize: 'words',
                    leftIcon: 'person',
                  }}
                />

                {/* EMAIL FIELD */}
                <FormField
                  type="email"
                  name="email"
                  label={t('register.email')}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setValue={setValue}
                  setTouched={setTouched}
                  required
                  textInputProps={{
                    autoCapitalize: 'none',
                    leftIcon: 'email',
                    autoComplete: 'email',
                  }}
                />

                {/* PASSWORD FIELD */}
                <FormField
                  type="password"
                  name="password"
                  label={t('register.password')}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setValue={setValue}
                  setTouched={setTouched}
                  required
                  textInputProps={{
                    leftIcon: 'lock',
                    rightIcon: 'visibility',
                    onRightIconPress: () => {
                      // Toggle password visibility would go here
                    },
                    secureTextEntry: true,
                  }}
                />

                {/* CONFIRM PASSWORD FIELD */}
                <FormField
                  type="password"
                  name="confirmPassword"
                  label={t('register.confirmPassword')}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setValue={setValue}
                  setTouched={setTouched}
                  required
                  textInputProps={{
                    leftIcon: 'lock',
                    rightIcon: 'visibility',
                    onRightIconPress: () => {
                      // Toggle password visibility would go here
                    },
                    secureTextEntry: true,
                  }}
                />

                {/* TERMS AND CONDITIONS CHECKBOX */}
                <View style={styles.termsContainer}>
                  <FormField
                    type="checkbox"
                    name="acceptTerms"
                    values={values}
                    errors={errors}
                    touched={touched}
                    setValue={setValue}
                    setTouched={setTouched}
                    checkboxLabel=""
                  />
                  <View style={styles.termsTextContainer}>
                    <Text style={styles.termsText}>
                      {t('register.iAccept')}{' '}
                    </Text>
                    <TouchableOpacity onPress={navigateToTerms}>
                      <Text style={styles.termsLink}>
                        {t('register.termsAndConditions')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {errors.acceptTerms && touched.acceptTerms && (
                  <Text style={styles.termsError}>{errors.acceptTerms}</Text>
                )}
              </View>
            )}
          </Form>

          {/* ALREADY HAVE ACCOUNT */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              {t('register.alreadyHaveAccount')}
            </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>
                {t('register.loginLink')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.medium,
  },
  headerContainer: {
    marginBottom: spacing.large,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.small,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  formContainer: {
    marginBottom: spacing.large,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  termsTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  termsText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  termsLink: {
    ...typography.bodySmallBold,
    color: colors.primary,
  },
  termsError: {
    ...typography.caption,
    color: colors.error,
    marginBottom: spacing.medium,
    marginLeft: spacing.large,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.medium,
  },
  loginText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  loginLink: {
    ...typography.bodyBold,
    color: colors.primary,
    marginLeft: spacing.small,
  },
});

export default RegisterScreen;
