/**
 * INTERNATIONALIZATION UTILITY
 * 
 * THIS UTILITY PROVIDES MULTI-LANGUAGE SUPPORT
 * IT SIMPLIFIES LOCALIZATION OF TEXT THROUGHOUT THE APP
 */

import { useCallback } from 'react';
import { NativeModules, Platform } from 'react-native';
import Storage from './storage';

// LANGUAGES SUPPORTED BY THE APP
export enum Language {
  ENGLISH = 'en',
  SPANISH = 'es',
  FRENCH = 'fr',
  // ADD ADDITIONAL LANGUAGES AS NEEDED
}

// TRANSLATION KEYS INTERFACE
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// GET DEVICE LANGUAGE
export const getDeviceLanguage = (): Language => {
  // GET DEVICE LOCALE
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  // EXTRACT LANGUAGE CODE
  const languageCode = deviceLanguage.substring(0, 2);

  // CHECK IF LANGUAGE IS SUPPORTED
  const isSupported = Object.values(Language).includes(languageCode as Language);
  
  return isSupported ? (languageCode as Language) : Language.ENGLISH;
};

// STORAGE KEY FOR LANGUAGE PREFERENCE
const LANGUAGE_KEY = '@app_language_preference';

// DEFAULT TRANSLATIONS
const DEFAULT_TRANSLATIONS: Translations = {
  [Language.ENGLISH]: {
    welcome: 'Welcome',
    login: 'Log In',
    signup: 'Sign Up',
    logout: 'Log Out',
    email: 'Email',
    password: 'Password',
    username: 'Username',
    settings: 'Settings',
    profile: 'Profile',
    home: 'Home',
    explore: 'Explore',
    notifications: 'Notifications',
    error: 'Error',
    retry: 'Retry',
    cancel: 'Cancel',
    confirm: 'Confirm',
    loading: 'Loading...',
    success: 'Success',
    noData: 'No data available',
    search: 'Search',
    // ADD MORE TRANSLATIONS AS NEEDED
  },
  [Language.SPANISH]: {
    welcome: 'Bienvenido',
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    logout: 'Cerrar Sesión',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    username: 'Nombre de Usuario',
    settings: 'Configuraciones',
    profile: 'Perfil',
    home: 'Inicio',
    explore: 'Explorar',
    notifications: 'Notificaciones',
    error: 'Error',
    retry: 'Reintentar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    loading: 'Cargando...',
    success: 'Éxito',
    noData: 'No hay datos disponibles',
    search: 'Buscar',
    // ADD MORE TRANSLATIONS AS NEEDED
  },
  [Language.FRENCH]: {
    welcome: 'Bienvenue',
    login: 'Connexion',
    signup: "S'inscrire",
    logout: 'Déconnexion',
    email: 'Email',
    password: 'Mot de passe',
    username: "Nom d'utilisateur",
    settings: 'Paramètres',
    profile: 'Profil',
    home: 'Accueil',
    explore: 'Explorer',
    notifications: 'Notifications',
    error: 'Erreur',
    retry: 'Réessayer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    loading: 'Chargement...',
    success: 'Succès',
    noData: 'Aucune donnée disponible',
    search: 'Rechercher',
    // ADD MORE TRANSLATIONS AS NEEDED
  },
};

// GLOBAL CURRENT LANGUAGE
let currentLanguage: Language | null = null;

/**
 * INITIALIZE LANGUAGE SETTINGS
 * LOADS USER PREFERENCE OR DEFAULTS TO DEVICE LANGUAGE
 */
export const initializeLanguage = async (): Promise<Language> => {
  try {
    // TRY TO LOAD SAVED LANGUAGE PREFERENCE
    const savedLanguage = await Storage.get<Language>(LANGUAGE_KEY);
    
    // IF NO SAVED PREFERENCE, USE DEVICE LANGUAGE
    const language = savedLanguage || getDeviceLanguage();
    currentLanguage = language;
    
    // SAVE LANGUAGE PREFERENCE FOR FUTURE USE
    await Storage.set(LANGUAGE_KEY, language);
    
    return language;
  } catch (error) {
    // DEFAULT TO ENGLISH ON ERROR
    currentLanguage = Language.ENGLISH;
    return Language.ENGLISH;
  }
};

/**
 * CHANGE APP LANGUAGE
 * @param language - New language to set
 */
export const changeLanguage = async (language: Language): Promise<void> => {
  try {
    // SAVE NEW LANGUAGE PREFERENCE
    await Storage.set(LANGUAGE_KEY, language);
    currentLanguage = language;
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
};

/**
 * TRANSLATE KEY TO CURRENT LANGUAGE
 * @param key - Translation key
 * @param defaultText - Default text if key not found
 */
export const translate = (key: string, defaultText?: string): string => {
  // USE ENGLISH AS FALLBACK IF CURRENT LANGUAGE NOT SET
  const language = currentLanguage || Language.ENGLISH;
  
  // GET TRANSLATION FOR KEY
  const translation = DEFAULT_TRANSLATIONS[language]?.[key];
  
  // RETURN TRANSLATION, DEFAULT TEXT OR KEY ITSELF
  return translation || defaultText || key;
};

/**
 * TRANSLATION HOOK
 * PROVIDES TRANSLATE FUNCTION FOR COMPONENTS
 */
export const useTranslation = () => {
  const t = useCallback((key: string, defaultText?: string): string => {
    return translate(key, defaultText);
  }, []);
  
  return { t };
};

export default {
  initializeLanguage,
  changeLanguage,
  translate,
  useTranslation,
  getDeviceLanguage,
  Language,
};
