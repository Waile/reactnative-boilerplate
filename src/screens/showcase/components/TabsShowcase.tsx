/**
 * TABS SHOWCASE COMPONENT
 * 
 * THIS COMPONENT DEMONSTRATES THE TABVIEW COMPONENT WITH DIFFERENT CONFIGURATIONS
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabView, Text, type TabItem } from '../../../components/common';
import { colors, spacing } from '../../../theme';

/**
 * Tabs showcase component
 * Demonstrates different tab configurations and styles
 */
const TabsShowcase: React.FC = () => {
  // First tab example with basic configuration
  const [activeTab1, setActiveTab1] = useState<string>('tab1');
  
  const basicTabs: TabItem[] = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ];
  
  // Second tab example with icon tabs
  const [activeTab2, setActiveTab2] = useState<string>('home');
  
  const iconTabs: TabItem[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'favorites', label: 'Favorites', icon: 'favorite' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  
  // Get content based on active tab for the first example
  const getBasicTabContent = () => {
    switch (activeTab1) {
      case 'tab1':
        return <Text style={styles.tabContent}>This is content for Tab 1</Text>;
      case 'tab2':
        return <Text style={styles.tabContent}>This is content for Tab 2</Text>;
      case 'tab3':
        return <Text style={styles.tabContent}>This is content for Tab 3</Text>;
      default:
        return null;
    }
  };

  // Get content based on active tab for the second example
  const getIconTabContent = () => {
    switch (activeTab2) {
      case 'home':
        return <Text style={styles.tabContent}>Home tab content</Text>;
      case 'favorites':
        return <Text style={styles.tabContent}>Favorites tab content</Text>;
      case 'settings':
        return <Text style={styles.tabContent}>Settings tab content</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Basic Tab Example */}
      <View style={styles.tabSection}>
        <Text style={styles.sectionTitle}>Basic Tabs</Text>
        <TabView
          tabs={basicTabs}
          activeTabId={activeTab1}
          onChange={setActiveTab1}
          style={styles.tabView}
        />
        <View style={styles.tabContentContainer}>
          {getBasicTabContent()}
        </View>
      </View>

      {/* Icon Tab Example */}
      <View style={styles.tabSection}>
        <Text style={styles.sectionTitle}>Tabs with Icons</Text>
        <TabView
          tabs={iconTabs}
          activeTabId={activeTab2}
          onChange={setActiveTab2}
          showIcon
          style={styles.tabView}
        />
        <View style={styles.tabContentContainer}>
          {getIconTabContent()}
        </View>
      </View>

      {/* Custom Style Tab Example */}
      <View style={styles.tabSection}>
        <Text style={styles.sectionTitle}>Custom Styled Tabs</Text>
        <TabView
          tabs={basicTabs}
          activeTabId={activeTab1}
          onChange={setActiveTab1}
          style={styles.tabView}
          tabStyle={styles.customTab}
          activeTabStyle={styles.customActiveTab}
          tabTextStyle={styles.customTabText}
          activeTabTextStyle={styles.customActiveTabText}
          indicatorStyle={styles.customIndicator}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.medium,
  },
  tabSection: {
    marginBottom: spacing.large,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.medium,
  },
  tabView: {
    marginBottom: spacing.small,
  },
  tabContentContainer: {
    padding: spacing.medium,
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    minHeight: 80,
    justifyContent: 'center',
  },
  tabContent: {
    textAlign: 'center',
  },
  customTab: {
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    marginRight: 4,
  },
  customActiveTab: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
  },
  customTabText: {
    color: colors.text.secondary,
  },
  customActiveTabText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  customIndicator: {
    backgroundColor: 'transparent',
  },
});

export default TabsShowcase;
