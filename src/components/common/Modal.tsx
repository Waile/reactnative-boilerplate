/**
 * MODAL COMPONENT
 * 
 * THIS IS A REUSABLE MODAL COMPONENT
 * IT PROVIDES CONSISTENT STYLING AND BEHAVIOR FOR DIALOGS AND OVERLAYS
 */

import React from 'react';
import {
  View,
  Modal as RNModal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ViewStyle,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Text from './Text';
import Button from './Button';
import { colors, spacing, typography } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

// WINDOW DIMENSIONS
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

// MODAL PROPS INTERFACE
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  backdropStyle?: ViewStyle;
  closeOnBackdropPress?: boolean;
  showCloseButton?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  size?: 'small' | 'medium' | 'large' | 'full';
  scrollable?: boolean;
  avoidKeyboard?: boolean;
  position?: 'center' | 'bottom';
  closeButtonPosition?: 'inside' | 'header';
  testID?: string;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  primaryAction?: {
    label: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
  };
}

/**
 * MODAL COMPONENT
 * A customizable modal dialog component
 */
const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  footer,
  containerStyle,
  contentStyle,
  backdropStyle,
  closeOnBackdropPress = true,
  showCloseButton = true,
  animationType = 'fade',
  size = 'medium',
  scrollable = true,
  avoidKeyboard = true,
  position = 'center',
  closeButtonPosition = 'header',
  testID,
  headerLeft,
  headerRight,
  primaryAction,
  secondaryAction,
}) => {
  // CALCULATE MODAL WIDTH BASED ON SIZE
  const getModalWidth = () => {
    switch (size) {
      case 'small':
        return windowWidth * 0.7;
      case 'medium':
        return windowWidth * 0.85;
      case 'large':
        return windowWidth * 0.95;
      case 'full':
        return windowWidth;
      default:
        return windowWidth * 0.85;
    }
  };

  // CALCULATE MODAL HEIGHT BASED ON SIZE
  const getModalMaxHeight = () => {
    switch (size) {
      case 'small':
        return windowHeight * 0.3;
      case 'medium':
        return windowHeight * 0.6;
      case 'large':
        return windowHeight * 0.8;
      case 'full':
        return windowHeight;
      default:
        return windowHeight * 0.6;
    }
  };

  // MODAL WIDTH AND HEIGHT
  const modalWidth = getModalWidth();
  const modalMaxHeight = getModalMaxHeight();

  // HANDLE BACKDROP PRESS
  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  // RENDER MODAL HEADER
  const renderHeader = () => {
    const hasHeaderContent = title || showCloseButton || headerLeft || headerRight;
    
    if (!hasHeaderContent) {
      return null;
    }
    
    return (
      <View style={styles.header}>
        {/* LEFT SIDE OF HEADER */}
        {headerLeft || <View style={styles.headerSide} />}
        
        {/* TITLE */}
        {title && (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        )}
        
        {/* RIGHT SIDE OF HEADER */}
        {headerRight || (
          <View style={styles.headerSide}>
            {showCloseButton && closeButtonPosition === 'header' && (
              <TouchableOpacity
                onPress={onClose}
                hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color={colors.icon} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  // RENDER MODAL FOOTER
  const renderFooter = () => {
    // USE CUSTOM FOOTER IF PROVIDED
    if (footer) {
      return <View style={styles.footer}>{footer}</View>;
    }
    
    // RENDER DEFAULT ACTIONS IF PROVIDED
    if (primaryAction || secondaryAction) {
      return (
        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            {secondaryAction && (
              <Button
                label={secondaryAction.label}
                onPress={secondaryAction.onPress}
                variant="outlined"
                loading={secondaryAction.loading}
                disabled={secondaryAction.disabled}
                style={[
                  styles.footerButton,
                  primaryAction ? styles.secondaryButton : null,
                ]}
              />
            )}
            {primaryAction && (
              <Button
                label={primaryAction.label}
                onPress={primaryAction.onPress}
                variant="primary"
                loading={primaryAction.loading}
                disabled={primaryAction.disabled}
                style={styles.footerButton}
              />
            )}
          </View>
        </View>
      );
    }
    
    return null;
  };

  // MODAL CONTENT
  const modalContent = (
    <View
      style={[
        styles.container,
        {
          width: size === 'full' ? '100%' : modalWidth,
          maxHeight: size === 'full' ? '100%' : modalMaxHeight,
        },
        position === 'bottom' && styles.bottomContainer,
        containerStyle,
      ]}
      testID={testID}
    >
      {/* CLOSE BUTTON (INSIDE POSITION) */}
      {showCloseButton && closeButtonPosition === 'inside' && (
        <TouchableOpacity
          style={styles.insideCloseButton}
          onPress={onClose}
          hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
        >
          <Icon name="close" size={20} color={colors.icon} />
        </TouchableOpacity>
      )}

      {/* MODAL HEADER */}
      {renderHeader()}

      {/* MODAL CONTENT */}
      <View style={[styles.content, contentStyle]}>
        {scrollable ? (
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </View>

      {/* MODAL FOOTER */}
      {renderFooter()}
    </View>
  );

  return (
    <RNModal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View
          style={[
            styles.backdrop,
            position === 'bottom' && styles.bottomBackdrop,
            backdropStyle,
          ]}
        >
          <TouchableWithoutFeedback>
            {avoidKeyboard ? (
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
              >
                {modalContent}
              </KeyboardAvoidingView>
            ) : (
              modalContent
            )}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomBackdrop: {
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bottomContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    padding: spacing.medium,
  },
  headerSide: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    flex: 1,
    textAlign: 'center',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  insideCloseButton: {
    position: 'absolute',
    top: spacing.small,
    right: spacing.small,
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.medium,
  },
  scrollContent: {
    flexGrow: 1,
  },
  footer: {
    padding: spacing.medium,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerButton: {
    minWidth: 100,
  },
  secondaryButton: {
    marginRight: spacing.medium,
  },
});

export default Modal;
