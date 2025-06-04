/**
 * ANALYTICS UTILITY
 * 
 * THIS UTILITY PROVIDES CENTRALIZED ANALYTICS TRACKING
 * IT ABSTRACTS ANALYTICS PROVIDER IMPLEMENTATION DETAILS
 */

import config from '../config/config';

// EVENT CATEGORIES
export enum EventCategory {
  NAVIGATION = 'navigation',
  USER = 'user',
  CONTENT = 'content',
  ENGAGEMENT = 'engagement',
  ERROR = 'error',
  PERFORMANCE = 'performance',
}

// STANDARD EVENT PROPERTIES
export interface EventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

// ANALYTICS INITIALIZATION OPTIONS
interface AnalyticsConfig {
  userId?: string;
  userProperties?: Record<string, any>;
  enableTracking: boolean;
}

// GLOBAL ANALYTICS STATE
let isInitialized = false;
let analyticsConfig: AnalyticsConfig = {
  enableTracking: config.enableAnalytics,
};

/**
 * INITIALIZE ANALYTICS PROVIDERS
 * MUST BE CALLED DURING APP STARTUP
 * 
 * @param options - Configuration options
 */
export const initialize = async (options?: Partial<AnalyticsConfig>): Promise<void> => {
  if (isInitialized) {
    console.log('Analytics already initialized');
    return;
  }
  
  try {
    // MERGE PROVIDED OPTIONS WITH DEFAULTS
    analyticsConfig = {
      ...analyticsConfig,
      ...options,
    };
    
    // SKIP IF TRACKING IS DISABLED
    if (!analyticsConfig.enableTracking) {
      console.log('Analytics tracking is disabled');
      return;
    }

    // INITIALIZE ANALYTICS PROVIDERS HERE
    // EXAMPLES WOULD INCLUDE:
    // - GOOGLE ANALYTICS
    // - FIREBASE ANALYTICS
    // - MIXPANEL
    // - AMPLITUDE
    // ETC.
    
    // EXAMPLE:
    // await Analytics.setup('YOUR-API-KEY', {
    //   userId: analyticsConfig.userId,
    // });
    
    console.log('Analytics initialized successfully');
    isInitialized = true;
    
    // SET USER PROPERTIES IF PROVIDED
    if (analyticsConfig.userId) {
      await identifyUser(analyticsConfig.userId, analyticsConfig.userProperties);
    }
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
  }
};

/**
 * TRACK SCREEN VIEW
 * 
 * @param screenName - Name of screen viewed
 * @param properties - Additional properties
 */
export const trackScreenView = async (
  screenName: string,
  properties?: EventProperties
): Promise<void> => {
  if (!analyticsConfig.enableTracking) return;
  
  try {
    // IMPLEMENT SCREEN TRACKING
    // EXAMPLE:
    // await Analytics.logScreen(screenName, properties);
    
    console.log(`ANALYTICS: Screen view - ${screenName}`, properties);
  } catch (error) {
    console.error('Failed to track screen view:', error);
  }
};

/**
 * TRACK EVENT
 * 
 * @param eventName - Name of event
 * @param category - Event category 
 * @param properties - Additional properties
 */
export const trackEvent = async (
  eventName: string,
  category: EventCategory,
  properties?: EventProperties
): Promise<void> => {
  if (!analyticsConfig.enableTracking) return;
  
  try {
    // INCLUDE CATEGORY IN PROPERTIES
    const eventProps = {
      category,
      ...properties,
    };
    
    // IMPLEMENT EVENT TRACKING
    // EXAMPLE:
    // await Analytics.logEvent(eventName, eventProps);
    
    console.log(`ANALYTICS: Event - ${eventName} (${category})`, eventProps);
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

/**
 * IDENTIFY USER FOR PERSONALIZED ANALYTICS
 * 
 * @param userId - Unique user identifier
 * @param userProperties - User attributes
 */
export const identifyUser = async (
  userId: string,
  userProperties?: Record<string, any>
): Promise<void> => {
  if (!analyticsConfig.enableTracking) return;
  
  try {
    analyticsConfig.userId = userId;
    analyticsConfig.userProperties = userProperties;
    
    // IMPLEMENT USER IDENTIFICATION
    // EXAMPLE:
    // await Analytics.identify(userId, userProperties);
    
    console.log(`ANALYTICS: User identified - ${userId}`, userProperties);
  } catch (error) {
    console.error('Failed to identify user:', error);
  }
};

/**
 * TRACK USER TIMING FOR PERFORMANCE MONITORING
 * 
 * @param category - Timing category (e.g., "API", "Rendering")
 * @param variable - What is being timed (e.g., "login", "productList")
 * @param time - Time in milliseconds
 * @param properties - Additional properties
 */
export const trackTiming = async (
  category: string,
  variable: string,
  time: number,
  properties?: EventProperties
): Promise<void> => {
  if (!analyticsConfig.enableTracking) return;
  
  try {
    const timingProps = {
      category,
      variable,
      time,
      ...properties,
    };
    
    // IMPLEMENT TIMING TRACKING
    // EXAMPLE:
    // await Analytics.logTiming(category, variable, time, properties);
    
    console.log(`ANALYTICS: Timing - ${category}.${variable} (${time}ms)`, properties);
  } catch (error) {
    console.error('Failed to track timing:', error);
  }
};

/**
 * TRACK APPLICATION ERROR
 * 
 * @param error - Error object or message
 * @param fatal - Whether error was fatal
 */
export const trackError = async (
  error: Error | string,
  fatal: boolean = false
): Promise<void> => {
  if (!analyticsConfig.enableTracking) return;
  
  try {
    const errorMessage = error instanceof Error ? error.message : error;
    const errorProps = {
      message: errorMessage,
      fatal,
      stack: error instanceof Error ? error.stack : undefined,
    };
    
    // IMPLEMENT ERROR TRACKING
    // EXAMPLE:
    // await Analytics.logError(errorMessage, errorProps);
    
    console.log(`ANALYTICS: Error - ${errorMessage} (Fatal: ${fatal})`, errorProps);
  } catch (err) {
    console.error('Failed to track error:', err);
  }
};

/**
 * RESET USER DATA
 * CALL ON LOGOUT
 */
export const resetUser = async (): Promise<void> => {
  if (!analyticsConfig.enableTracking) return;
  
  try {
    analyticsConfig.userId = undefined;
    analyticsConfig.userProperties = undefined;
    
    // IMPLEMENT USER RESET
    // EXAMPLE:
    // await Analytics.reset();
    
    console.log('ANALYTICS: User reset');
  } catch (error) {
    console.error('Failed to reset user:', error);
  }
};

/**
 * DISABLE ALL ANALYTICS TRACKING
 */
export const disableTracking = (): void => {
  analyticsConfig.enableTracking = false;
  console.log('ANALYTICS: Tracking disabled');
};

/**
 * ENABLE ANALYTICS TRACKING
 */
export const enableTracking = (): void => {
  analyticsConfig.enableTracking = true;
  console.log('ANALYTICS: Tracking enabled');
};

export default {
  initialize,
  trackScreenView,
  trackEvent,
  identifyUser,
  trackTiming,
  trackError,
  resetUser,
  disableTracking,
  enableTracking,
  EventCategory,
};
