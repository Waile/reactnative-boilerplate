/**
 * PROFILE SCREEN
 * 
 * THIS SCREEN DEMONSTRATES A USER PROFILE INTERFACE
 * IT SHOWS HOW TO STRUCTURE A PROFILE VIEW WITH CONSISTENT STYLING
 */

import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreenNavigationProp } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import Button from '../components/common/Button';
import Text from '../components/common/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  // NAVIGATION HOOK FOR TYPE-SAFE NAVIGATION
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* PROFILE HEADER */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {/* PLACEHOLDER AVATAR - WOULD USE ACTUAL USER PHOTO IN REAL APP */}
            <View style={styles.avatar}>
              <Icon name="person" size={60} color={colors.white} />
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={typography.h3}>John Doe</Text>
            <Text style={[typography.body2, styles.userInfo]}>john.doe@example.com</Text>
            <Text style={[typography.caption, styles.userMeta]}>Member since: June, 2025</Text>
          </View>
          
          <Button 
            title="Edit Profile"
            onPress={() => {}} // WOULD NAVIGATE TO EDIT PROFILE SCREEN
            variant="secondary"
            style={styles.editButton}
            size="small"
          />
        </View>
        
        {/* PROFILE STATS */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={typography.h4}>128</Text>
            <Text style={typography.caption}>Posts</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={typography.h4}>5.2K</Text>
            <Text style={typography.caption}>Followers</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={typography.h4}>723</Text>
            <Text style={typography.caption}>Following</Text>
          </View>
        </View>
        
        {/* PROFILE OPTIONS */}
        <View style={styles.optionsContainer}>
          <ProfileOption 
            icon="settings" 
            title="Settings" 
            onPress={() => navigation.navigate('Settings')} 
          />
          
          <ProfileOption 
            icon="security" 
            title="Privacy & Security" 
            onPress={() => {}} 
          />
          
          <ProfileOption 
            icon="notifications" 
            title="Notifications" 
            onPress={() => {}} 
          />
          
          <ProfileOption 
            icon="help" 
            title="Help & Support" 
            onPress={() => {}} 
          />
          
          <ProfileOption 
            icon="logout" 
            title="Logout" 
            onPress={() => {}} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// REUSABLE PROFILE OPTION COMPONENT
type ProfileOptionProps = {
  icon: string;
  title: string;
  onPress: () => void;
};

const ProfileOption = ({ icon, title, onPress }: ProfileOptionProps) => (
  <View style={styles.optionItem}>
    <Icon name={icon} size={24} color={colors.primary} />
    <Text style={[typography.body1, styles.optionText]}>{title}</Text>
    <Icon name="chevron-right" size={24} color={colors.gray} />
  </View>
);

// STYLES USING THEME VARIABLES FOR CONSISTENCY
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
  },
  profileHeader: {
    padding: spacing.large,
    backgroundColor: colors.background.secondary,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  userInfo: {
    color: colors.text.secondary,
    marginTop: spacing.tiny,
  },
  userMeta: {
    marginTop: spacing.tiny,
  },
  editButton: {
    marginTop: spacing.medium,
    alignSelf: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.lightGray,
  },
  optionsContainer: {
    marginTop: spacing.medium,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  optionText: {
    flex: 1,
    marginLeft: spacing.medium,
  },
});

export default ProfileScreen;
