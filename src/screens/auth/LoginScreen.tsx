/**
 * LOGIN SCREEN
 * 
 * THIS IS A SAMPLE IMPLEMENTATION OF THE FORM SYSTEM
 * IT DEMONSTRATES HOW TO USE FORM, FORMFIELD AND VALIDATION
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { colors, spacing, typography } from '../../theme';
import { Form, FormValues } from '../../components/common/Form';
import FormField from '../../components/common/FormField';
import Text from '../../components/common/Text';
import Button from '../../components/common/Button';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import { validateEmail, validateRequired } from '../../utils/validation';
import { login } from '../../store/slices/authSlice';
import { useApi } from '../../hooks/useApi';
import { handleError, createError, ErrorType } from '../../utils/errorHandler';
import { useTranslation } from '../../utils/i18n';

// LOGIN FORM VALUES TYPE
interface LoginFormValues extends FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

// INITIAL FORM STATE
const initialValues: LoginFormValues = {
  email: '',
  password: '',
  rememberMe: false,
};

/**
 * LOGIN SCREEN COMPONENT
 * Handles user authentication
 */
const LoginScreen: React.FC = () => {
  // HOOKS
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  // STATE
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  
  // API HOOKS
  const { loading, execute: executeLogin } = useApi<{ token: string }, LoginFormValues>(
    async (data) => {
      // THIS WOULD BE REPLACED WITH ACTUAL API CALL
      // Example: return api.post('/auth/login', data);
      
      // Simulate API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful response
      return { token: 'sample-auth-token' };
    }
  );

  // FORM VALIDATION CONFIG
  const validators = {
    email: [validateRequired(t('validation.emailRequired')), validateEmail()],
    password: [validateRequired(t('validation.passwordRequired'))],
  };

  // HANDLE LOGIN SUBMISSION
  const handleLogin = async (values: LoginFormValues) => {
    try {
      const response = await executeLogin(values);
      
      if (response?.token) {
        // DISPATCH LOGIN ACTION
        dispatch(login({
          token: response.token,
          user: {
            id: '1',
            email: values.email,
            name: 'Sample User',
          },
          rememberMe: values.rememberMe,
        }));
        
        // NAVIGATE TO HOME
        // navigation.navigate('Home');
      }
    } catch (error) {
      handleError(
        createError(
          ErrorType.AUTH,
          t('login.loginFailed'),
          error,
          { email: values.email },
          'LoginScreen.handleLogin'
        )
      );
    }
  };

  // HANDLE FORGOT PASSWORD
  const handleForgotPassword = async () => {
    try {
      setForgotPasswordLoading(true);
      
      // SIMULATE API CALL
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // NAVIGATE TO PASSWORD RESET
      // navigation.navigate('ForgotPassword');
    } catch (error) {
      handleError(
        createError(
          ErrorType.AUTH,
          t('login.forgotPasswordFailed'),
          error,
          undefined,
          'LoginScreen.handleForgotPassword'
        )
      );
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  // HANDLE SIGNUP NAVIGATION
  const navigateToSignup = () => {
    // navigation.navigate('Signup');
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
          {/* LOGO AND HEADER */}
          <View style={styles.headerContainer}>
            {/* Add your app logo here */}
            <View style={styles.logoPlaceholder}>
              {/* <Image source={require('../../assets/images/logo.png')} style={styles.logo} /> */}
            </View>
            <Text style={styles.title}>{t('login.welcome')}</Text>
            <Text style={styles.subtitle}>{t('login.subtitle')}</Text>
          </View>

          {/* LOGIN FORM */}
          <Form
            initialValues={initialValues}
            validators={validators}
            onSubmit={handleLogin}
            submitLabel={t('login.loginButton')}
            loading={loading}
            hideSubmitButton
          >
            {({ values, errors, setValue, setTouched, touched, handleSubmit }) => (
              <View style={styles.formContainer}>
                {/* EMAIL FIELD */}
                <FormField
                  type="email"
                  name="email"
                  label={t('login.email')}
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
                  label={t('login.password')}
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

                {/* REMEMBER ME CHECKBOX */}
                <FormField
                  type="checkbox"
                  name="rememberMe"
                  checkboxLabel={t('login.rememberMe')}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setValue={setValue}
                  setTouched={setTouched}
                />

                {/* FORGOT PASSWORD */}
                <TouchableOpacity
                  style={styles.forgotPasswordContainer}
                  onPress={handleForgotPassword}
                  disabled={forgotPasswordLoading}
                >
                  <Text style={styles.forgotPasswordText}>
                    {t('login.forgotPassword')}
                  </Text>
                  {forgotPasswordLoading && <LoadingIndicator size="small" />}
                </TouchableOpacity>

                {/* LOGIN BUTTON */}
                <Button
                  label={t('login.loginButton')}
                  onPress={handleSubmit}
                  loading={loading}
                  variant="primary"
                  size="large"
                  style={styles.loginButton}
                />

                {/* OR DIVIDER */}
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>{t('common.or')}</Text>
                  <View style={styles.divider} />
                </View>

                {/* SOCIAL LOGIN BUTTONS PLACEHOLDER */}
                <View style={styles.socialLoginContainer}>
                  {/* Replace with actual social login buttons */}
                  <Button
                    label={t('login.googleLogin')}
                    onPress={() => {}}
                    variant="outlined"
                    size="large"
                    style={styles.socialButton}
                    // leftIcon="google"
                  />
                </View>

                {/* SIGNUP LINK */}
                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>
                    {t('login.noAccount')}
                  </Text>
                  <TouchableOpacity onPress={navigateToSignup}>
                    <Text style={styles.signupLink}>
                      {t('login.signupLink')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Form>
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
    alignItems: 'center',
    marginBottom: spacing.extraLarge,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.small,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: spacing.large,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: spacing.small,
    marginBottom: spacing.medium,
  },
  forgotPasswordText: {
    ...typography.buttonText,
    color: colors.primary,
  },
  loginButton: {
    marginVertical: spacing.medium,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.large,
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginHorizontal: spacing.medium,
  },
  socialLoginContainer: {
    marginBottom: spacing.large,
  },
  socialButton: {
    marginBottom: spacing.medium,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.medium,
  },
  signupText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  signupLink: {
    ...typography.bodyBold,
    color: colors.primary,
    marginLeft: spacing.small,
  },
});

export default LoginScreen;
