/**
 * SETTINGS SCREEN
 * 
 * THIS SCREEN DEMONSTRATES A SETTINGS INTERFACE WITH VARIOUS CONTROLS
 * IT SHOWS HOW TO IMPLEMENT COMMON SETTINGS PATTERNS
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';
import Text from '../components/common/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  // STATE FOR TOGGLE SETTINGS
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [dataSync, setDataSync] = useState(true);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* ACCOUNT SECTION */}
        <SettingsSection title="Account">
          <SettingsItem
            icon="account-circle"
            title="Account Information"
            onPress={() => {}}
            showChevron
          />
          <SettingsItem
            icon="security"
            title="Security"
            onPress={() => {}}
            showChevron
          />
          <SettingsItem
            icon="credit-card"
            title="Payment Methods"
            onPress={() => {}}
            showChevron
          />
        </SettingsSection>
        
        {/* PREFERENCES SECTION */}
        <SettingsSection title="Preferences">
          <SettingsItem
            icon="notifications"
            title="Push Notifications"
            value={
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
                thumbColor={pushNotifications ? colors.primary : colors.gray}
              />
            }
          />
          <SettingsItem
            icon="brightness-6"
            title="Dark Mode"
            value={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
                thumbColor={darkMode ? colors.primary : colors.gray}
              />
            }
          />
          <SettingsItem
            icon="language"
            title="Language"
            detail="English (US)"
            onPress={() => {}}
            showChevron
          />
        </SettingsSection>
        
        {/* PRIVACY SECTION */}
        <SettingsSection title="Privacy">
          <SettingsItem
            icon="location-on"
            title="Location Services"
            value={
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
                thumbColor={locationServices ? colors.primary : colors.gray}
              />
            }
          />
          <SettingsItem
            icon="sync"
            title="Data Synchronization"
            value={
              <Switch
                value={dataSync}
                onValueChange={setDataSync}
                trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
                thumbColor={dataSync ? colors.primary : colors.gray}
              />
            }
          />
          <SettingsItem
            icon="delete"
            title="Delete Account"
            onPress={() => {}}
            textColor={colors.error}
            showChevron
          />
        </SettingsSection>
        
        {/* ABOUT SECTION */}
        <SettingsSection title="About">
          <SettingsItem
            icon="info"
            title="App Version"
            detail="1.0.0"
          />
          <SettingsItem
            icon="description"
            title="Terms of Service"
            onPress={() => {}}
            showChevron
          />
          <SettingsItem
            icon="privacy-tip"
            title="Privacy Policy"
            onPress={() => {}}
            showChevron
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
};

// SETTINGS SECTION COMPONENT
type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

const SettingsSection = ({ title, children }: SettingsSectionProps) => (
  <View style={styles.section}>
    <Text style={[typography.caption, styles.sectionTitle]}>{title.toUpperCase()}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

// SETTINGS ITEM COMPONENT
type SettingsItemProps = {
  icon: string;
  title: string;
  detail?: string;
  value?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  textColor?: string;
};

const SettingsItem = ({
  icon,
  title,
  detail,
  value,
  onPress,
  showChevron = false,
  textColor = colors.text.primary,
}: SettingsItemProps) => {
  const content = (
    <View style={styles.settingsItem}>
      <Icon name={icon} size={24} color={colors.primary} style={styles.itemIcon} />
      <View style={styles.itemTextContainer}>
        <Text style={[typography.body1, { color: textColor }]}>{title}</Text>
        {detail && <Text style={typography.caption}>{detail}</Text>}
      </View>
      {value}
      {showChevron && <Icon name="chevron-right" size={24} color={colors.gray} />}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

// STYLES USING THEME VARIABLES FOR CONSISTENCY
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.large,
  },
  sectionTitle: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    color: colors.text.secondary,
    fontWeight: 'bold',
  },
  sectionContent: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  itemIcon: {
    marginRight: spacing.medium,
  },
  itemTextContainer: {
    flex: 1,
  },
});

export default SettingsScreen;
