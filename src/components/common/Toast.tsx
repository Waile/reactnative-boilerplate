/**
 * TOAST COMPONENT AND CONTEXT
 * 
 * THIS IS A GLOBAL TOAST NOTIFICATION SYSTEM
 * IT PROVIDES A CONSISTENT WAY TO SHOW FEEDBACK TO USERS
 */

import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Text from './Text';
import { colors, spacing, typography } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

// TOAST TYPES
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// TOAST POSITION
export type ToastPosition = 'top' | 'bottom';

// TOAST ITEM INTERFACE
export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

// TOAST CONTEXT VALUE INTERFACE
interface ToastContextValue {
  showToast: (message: string, options?: {
    type?: ToastType;
    duration?: number;
    actionLabel?: string;
    onAction?: () => void;
  }) => void;
  hideToast: (id: string) => void;
  hideAllToasts: () => void;
}

// TOAST PROVIDER PROPS
interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  offset?: number;
}

// CREATE TOAST CONTEXT
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * TOAST ITEM COMPONENT
 * Renders a single toast notification
 */
const ToastItem: React.FC<{
  toast: ToastItem;
  onHide: () => void;
  style?: ViewStyle;
}> = ({ toast, onHide, style }) => {
  // ANIMATION VALUE
  const opacity = useRef(new Animated.Value(0)).current;
  
  // HANDLE ANIMATION
  useEffect(() => {
    // FADE IN
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // AUTO HIDE AFTER DURATION
    const hideTimeout = setTimeout(() => {
      hideToast();
    }, toast.duration || 3000);
    
    return () => clearTimeout(hideTimeout);
  }, []);
  
  // HIDE TOAST WITH ANIMATION
  const hideToast = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onHide();
    });
  };
  
  // GET ICON AND COLORS BASED ON TYPE
  const getToastTypeProps = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: 'check-circle',
          color: colors.success,
          backgroundColor: colors.successLight,
        };
      case 'error':
        return {
          icon: 'error',
          color: colors.error,
          backgroundColor: colors.errorLight,
        };
      case 'warning':
        return {
          icon: 'warning',
          color: colors.warning,
          backgroundColor: colors.warningLight,
        };
      case 'info':
      default:
        return {
          icon: 'info',
          color: colors.info,
          backgroundColor: colors.infoLight,
        };
    }
  };
  
  const { icon, color, backgroundColor } = getToastTypeProps();
  
  return (
    <Animated.View 
      style={[
        styles.toastContainer,
        { backgroundColor, opacity },
        style,
      ]}
    >
      {/* ICON */}
      <Icon name={icon} size={24} color={color} style={styles.icon} />
      
      {/* MESSAGE */}
      <Text style={[styles.message, { flex: 1 }]}>
        {toast.message}
      </Text>
      
      {/* ACTION BUTTON */}
      {toast.actionLabel && toast.onAction && (
        <TouchableOpacity
          onPress={() => {
            toast.onAction?.();
            hideToast();
          }}
          style={styles.actionButton}
        >
          <Text style={[styles.actionText, { color }]}>
            {toast.actionLabel}
          </Text>
        </TouchableOpacity>
      )}
      
      {/* CLOSE BUTTON */}
      <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
        <Icon name="close" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * TOAST PROVIDER COMPONENT
 * Manages toast notifications globally
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'bottom',
  offset = 0,
}) => {
  // STATE
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  
  // GENERATE UNIQUE ID
  const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // SHOW TOAST
  const showToast = (message: string, options?: {
    type?: ToastType;
    duration?: number;
    actionLabel?: string;
    onAction?: () => void;
  }) => {
    const newToast: ToastItem = {
      id: generateId(),
      message,
      type: options?.type || 'info',
      duration: options?.duration || 3000,
      actionLabel: options?.actionLabel,
      onAction: options?.onAction,
    };
    
    setToasts(currentToasts => [newToast, ...currentToasts]);
  };
  
  // HIDE SPECIFIC TOAST
  const hideToast = (id: string) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  };
  
  // HIDE ALL TOASTS
  const hideAllToasts = () => {
    setToasts([]);
  };
  
  // CONTEXT VALUE
  const contextValue: ToastContextValue = {
    showToast,
    hideToast,
    hideAllToasts,
  };
  
  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* TOAST CONTAINER */}
      <SafeAreaView
        style={[
          styles.container,
          position === 'top' ? { top: offset } : { bottom: offset },
        ]}
        pointerEvents="box-none"
      >
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onHide={() => hideToast(toast.id)}
            style={{
              marginTop: position === 'top' ? 0 : spacing.small,
              marginBottom: position === 'top' ? spacing.small : 0,
            }}
          />
        ))}
      </SafeAreaView>
    </ToastContext.Provider>
  );
};

/**
 * USE TOAST HOOK
 * Hook for using toast notifications
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: spacing.medium,
    alignItems: 'center',
  },
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: 8,
    marginVertical: spacing.tiny,
    minHeight: 50,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: spacing.small,
  },
  message: {
    ...typography.body,
    color: colors.text,
    flexShrink: 1,
  },
  actionButton: {
    marginLeft: spacing.small,
    padding: spacing.small,
  },
  actionText: {
    ...typography.buttonText,
  },
  closeButton: {
    padding: spacing.small,
    marginLeft: spacing.small,
  },
});
