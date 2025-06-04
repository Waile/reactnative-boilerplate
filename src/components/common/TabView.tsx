/**
 * TAB VIEW COMPONENT
 * 
 * THIS IS A REUSABLE TAB VIEW FOR NAVIGATION WITHIN SCREENS
 * IT PROVIDES CONSISTENT STYLING AND BEHAVIOR FOR TABS
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  FlatList,
} from 'react-native';
import Text from './Text';
import { colors, spacing, typography } from '../../theme';

// TAB ITEM INTERFACE
export interface TabItem {
  key: string;
  label: string;
  icon?: string; // Icon name
  badge?: number | string; // Badge value
  content: React.ReactNode; // Tab content
  disabled?: boolean;
}

// TAB VIEW PROPS INTERFACE
interface TabViewProps {
  tabs: TabItem[];
  initialTabKey?: string;
  onChange?: (tabKey: string) => void;
  tabBarStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  tabTextStyle?: TextStyle;
  activeTabTextStyle?: TextStyle;
  contentContainerStyle?: ViewStyle;
  scrollable?: boolean;
  indicatorStyle?: ViewStyle;
  indicatorColor?: string;
  swipeable?: boolean;
  centered?: boolean;
  equalWidth?: boolean;
  testID?: string;
}

/**
 * TAB VIEW COMPONENT
 * A customizable tab view for within-screen navigation
 */
const TabView: React.FC<TabViewProps> = ({
  tabs,
  initialTabKey,
  onChange,
  tabBarStyle,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle,
  contentContainerStyle,
  scrollable = true,
  indicatorStyle,
  indicatorColor = colors.primary,
  swipeable = true,
  centered = false,
  equalWidth = false,
  testID,
}) => {
  // STATE
  const [activeTabKey, setActiveTabKey] = useState<string>(initialTabKey || (tabs.length > 0 ? tabs[0].key : ''));
  const [tabWidths, setTabWidths] = useState<{ [key: string]: number }>({});
  const [tabPositions, setTabPositions] = useState<{ [key: string]: number }>({});
  const [contentWidth, setContentWidth] = useState<number>(Dimensions.get('window').width);
  
  // REFS
  const tabScrollViewRef = useRef<ScrollView>(null);
  const contentScrollViewRef = useRef<ScrollView>(null);
  const indicatorAnimation = useRef(new Animated.Value(0)).current;
  
  // FIND ACTIVE TAB INDEX
  const activeTabIndex = tabs.findIndex(tab => tab.key === activeTabKey);
  
  // HANDLE TAB PRESS
  const handleTabPress = (tabKey: string) => {
    // IF TAB IS DISABLED, IGNORE PRESS
    const tab = tabs.find(t => t.key === tabKey);
    if (tab?.disabled) return;
    
    setActiveTabKey(tabKey);
    
    // SCROLL TABS TO MAKE ACTIVE TAB VISIBLE
    if (tabScrollViewRef.current && tabPositions[tabKey] !== undefined) {
      tabScrollViewRef.current.scrollTo({
        x: tabPositions[tabKey] - contentWidth / 4, // CENTER TAB AS MUCH AS POSSIBLE
        animated: true,
      });
    }
    
    // SCROLL CONTENT TO ACTIVE TAB
    if (contentScrollViewRef.current && swipeable) {
      const tabIndex = tabs.findIndex(tab => tab.key === tabKey);
      contentScrollViewRef.current.scrollTo({
        x: tabIndex * contentWidth,
        animated: true,
      });
    }
    
    // NOTIFY PARENT COMPONENT
    onChange?.(tabKey);
  };
  
  // HANDLE TAB LAYOUT
  const handleTabLayout = (tabKey: string, event: LayoutChangeEvent) => {
    const { width, x } = event.nativeEvent.layout;
    
    setTabWidths(prev => ({ ...prev, [tabKey]: width }));
    setTabPositions(prev => ({ ...prev, [tabKey]: x }));
  };
  
  // HANDLE CONTENT SCROLL
  const handleContentScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!swipeable) return;
    
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / contentWidth);
    
    if (index >= 0 && index < tabs.length) {
      const newTabKey = tabs[index].key;
      if (newTabKey !== activeTabKey) {
        setActiveTabKey(newTabKey);
        onChange?.(newTabKey);
      }
    }
  };
  
  // UPDATE INDICATOR ANIMATION WHEN ACTIVE TAB CHANGES
  useEffect(() => {
    const position = tabPositions[activeTabKey] || 0;
    const width = tabWidths[activeTabKey] || 0;
    
    Animated.timing(indicatorAnimation, {
      toValue: position,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [activeTabKey, tabPositions, tabWidths]);
  
  // MEASURE CONTENT WIDTH ON LAYOUT
  const handleContentLayout = (event: LayoutChangeEvent) => {
    setContentWidth(event.nativeEvent.layout.width);
  };
  
  // RENDER TAB BAR ITEM
  const renderTabBarItem = (tab: TabItem, index: number) => {
    const isActive = tab.key === activeTabKey;
    
    return (
      <TouchableOpacity
        key={tab.key}
        onPress={() => handleTabPress(tab.key)}
        style={[
          styles.tab,
          equalWidth && { flex: 1 },
          tabStyle,
          isActive && styles.activeTab,
          isActive && activeTabStyle,
          tab.disabled && styles.disabledTab,
        ]}
        disabled={tab.disabled}
        onLayout={(e) => handleTabLayout(tab.key, e)}
        testID={`${testID}-tab-${tab.key}`}
      >
        <Text
          style={[
            styles.tabText,
            tabTextStyle,
            isActive && styles.activeTabText,
            isActive && activeTabTextStyle,
            tab.disabled && styles.disabledTabText,
          ]}
          numberOfLines={1}
        >
          {tab.label}
        </Text>
        
        {/* BADGE */}
        {tab.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{tab.badge}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  
  // INDICATOR WIDTH AND LEFT POSITION
  const indicatorWidth = tabWidths[activeTabKey] || 0;
  
  return (
    <View style={styles.container} testID={testID} onLayout={handleContentLayout}>
      {/* TAB BAR */}
      <View style={[styles.tabBarContainer, tabBarStyle]}>
        <ScrollView
          ref={tabScrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.tabBarScrollContent,
            centered && { justifyContent: 'center' },
            !scrollable && { width: contentWidth },
          ]}
          scrollEnabled={scrollable}
          bounces={false}
        >
          {tabs.map(renderTabBarItem)}
          
          {/* ANIMATED INDICATOR */}
          <Animated.View
            style={[
              styles.indicator,
              {
                width: indicatorWidth,
                backgroundColor: indicatorColor,
                transform: [{ translateX: indicatorAnimation }],
              },
              indicatorStyle,
            ]}
          />
        </ScrollView>
      </View>
      
      {/* TAB CONTENT */}
      <ScrollView
        ref={contentScrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={swipeable}
        bounces={false}
        onScroll={handleContentScroll}
        scrollEventThrottle={16}
        style={styles.contentContainer}
        contentContainerStyle={[styles.contentScrollContainer, contentContainerStyle]}
      >
        {tabs.map((tab, index) => (
          <View
            key={tab.key}
            style={[styles.tabContent, { width: contentWidth }]}
            testID={`${testID}-content-${tab.key}`}
          >
            {tab.content}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  tabBarScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  tab: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  disabledTab: {
    opacity: 0.5,
  },
  tabText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  disabledTabText: {
    color: colors.textDisabled,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  contentContainer: {
    flex: 1,
  },
  contentScrollContainer: {
    flexGrow: 1,
  },
  tabContent: {
    flex: 1,
  },
  badge: {
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.small,
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default TabView;
