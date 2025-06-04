/**
 * BOTTOM SHEET COMPONENT
 * 
 * THIS IS A REUSABLE BOTTOM SHEET COMPONENT
 * IT PROVIDES A CONSISTENT WAY TO DISPLAY CONTENT FROM THE BOTTOM OF THE SCREEN
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Dimensions,
  ViewStyle,
  ScrollView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from './Text';
import { colors, spacing, typography } from '../../theme';

// WINDOW DIMENSIONS
const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

// BOTTOM SHEET PROPS INTERFACE
interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  snapPoints?: number[];
  initialSnapIndex?: number;
  backdropOpacity?: number;
  closeOnBackdropPress?: boolean;
  closeOnDragDown?: boolean;
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  handleIndicatorStyle?: ViewStyle;
  animationDuration?: number;
  scrollable?: boolean;
  testID?: string;
}

/**
 * BOTTOM SHEET COMPONENT
 * A customizable bottom sheet component
 */
const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  title,
  snapPoints = [0.9], // Default to 90% of screen height
  initialSnapIndex = 0,
  backdropOpacity = 0.5,
  closeOnBackdropPress = true,
  closeOnDragDown = true,
  containerStyle,
  headerStyle,
  contentContainerStyle,
  handleIndicatorStyle,
  animationDuration = 300,
  scrollable = true,
  testID,
}) => {
  // REFS AND HOOKS
  const bottomSheetHeight = useRef(new Animated.Value(0)).current;
  const backdrop = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.Value(0)).current;
  const panResponderRef = useRef(null);
  const insets = useSafeAreaInsets();
  
  // CALCULATE SNAP POINTS IN PIXELS
  const getSnapPointsInPixels = () => {
    return snapPoints.map(point => {
      // HANDLE PERCENTAGE OR DECIMAL VALUES
      if (point <= 1) {
        return SCREEN_HEIGHT * point;
      }
      // HANDLE PIXEL VALUES
      return point;
    });
  };
  
  const snapPointsInPixels = getSnapPointsInPixels();
  const maxHeight = Math.max(...snapPointsInPixels);
  const initialHeight = snapPointsInPixels[initialSnapIndex] || snapPointsInPixels[0];
  
  // SET UP PAN RESPONDER
  useEffect(() => {
    panResponderRef.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newValue = Math.max(0, -gestureState.dy);
        
        // LIMIT DRAGGING BEYOND MAX AND MIN HEIGHT
        if (newValue <= maxHeight && newValue >= 0) {
          pan.setValue(newValue);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // DETERMINE WHICH SNAP POINT TO SNAP TO
        if (gestureState.dy > 50 && closeOnDragDown) {
          // DRAGGED DOWN SIGNIFICANTLY - CLOSE
          closeSheet();
        } else {
          // FIND CLOSEST SNAP POINT
          const currentHeight = pan._value;
          let closestSnapPoint = snapPointsInPixels[0];
          let minDistance = Math.abs(currentHeight - snapPointsInPixels[0]);
          
          snapPointsInPixels.forEach(point => {
            const distance = Math.abs(currentHeight - point);
            if (distance < minDistance) {
              minDistance = distance;
              closestSnapPoint = point;
            }
          });
          
          // ANIMATE TO CLOSEST SNAP POINT
          Animated.spring(pan, {
            toValue: closestSnapPoint,
            useNativeDriver: false,
            bounciness: 4,
          }).start();
        }
      },
    });
  }, [maxHeight, snapPointsInPixels, closeOnDragDown]);
  
  // HANDLE VISIBILITY CHANGES
  useEffect(() => {
    if (visible) {
      // SET INITIAL HEIGHT
      pan.setValue(initialHeight);
      
      // ANIMATE BOTTOM SHEET UP
      Animated.timing(bottomSheetHeight, {
        toValue: initialHeight,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
      
      // FADE IN BACKDROP
      Animated.timing(backdrop, {
        toValue: backdropOpacity,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    } else {
      // ANIMATE BOTTOM SHEET DOWN
      Animated.timing(bottomSheetHeight, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
      
      // FADE OUT BACKDROP
      Animated.timing(backdrop, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, initialHeight]);
  
  // CLOSE BOTTOM SHEET
  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(bottomSheetHeight, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(backdrop, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }),
    ]).start(() => {
      onClose();
    });
  };
  
  // INTERPOLATE HEIGHT FOR ANIMATION
  const animatedHeight = pan.interpolate({
    inputRange: [0, maxHeight],
    outputRange: [0, maxHeight],
    extrapolate: 'clamp',
  });
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeSheet}
      statusBarTranslucent
    >
      {/* BACKDROP */}
      <TouchableWithoutFeedback onPress={closeOnBackdropPress ? closeSheet : undefined}>
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: backdrop },
          ]}
        />
      </TouchableWithoutFeedback>
      
      {/* BOTTOM SHEET CONTAINER */}
      <Animated.View
        style={[
          styles.container,
          {
            height: animatedHeight,
            paddingBottom: insets.bottom,
          },
          containerStyle,
        ]}
        testID={testID}
      >
        {/* HANDLE FOR DRAGGING */}
        <View
          style={styles.handleContainer}
          {...panResponderRef.current?.panHandlers}
        >
          <View style={[styles.handle, handleIndicatorStyle]} />
        </View>
        
        {/* HEADER WITH TITLE */}
        {title && (
          <View style={[styles.header, headerStyle]}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        
        {/* CONTENT */}
        {scrollable ? (
          <ScrollView
            style={styles.contentScrollView}
            contentContainerStyle={[
              styles.contentContainer,
              contentContainerStyle,
            ]}
            showsVerticalScrollIndicator={true}
            bounces={true}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.contentContainer, contentContainerStyle]}>
            {children}
          </View>
        )}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    zIndex: 1,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 2,
    elevation: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.small,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  header: {
    padding: spacing.medium,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h3,
    textAlign: 'center',
  },
  contentScrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.medium,
  },
});

export default BottomSheet;
