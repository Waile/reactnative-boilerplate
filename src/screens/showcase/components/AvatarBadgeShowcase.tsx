/**
 * AVATAR AND BADGE SHOWCASE COMPONENT
 * 
 * THIS COMPONENT DEMONSTRATES THE AVATAR AND BADGE COMPONENTS WITH DIFFERENT CONFIGURATIONS
 */

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Avatar, Badge, Text } from '../../../components/common';
import { colors, spacing } from '../../../theme';

/**
 * Avatar and Badge showcase component
 * Demonstrates different avatar sizes, types and badge variations
 */
const AvatarBadgeShowcase: React.FC = () => {
  // Sample image for avatars
  const sampleImageUrl = 'https://randomuser.me/api/portraits/women/44.jpg';
  
  return (
    <View style={styles.container}>
      {/* Avatar Section */}
      <Text style={styles.sectionTitle}>Avatars</Text>
      
      <View style={styles.row}>
        <View style={styles.avatarContainer}>
          <Text style={styles.label}>Text</Text>
          <Avatar
            text="JD"
            size="small"
          />
        </View>

        <View style={styles.avatarContainer}>
          <Text style={styles.label}>Image</Text>
          <Avatar
            source={{ uri: sampleImageUrl }}
            size="medium"
          />
        </View>

        <View style={styles.avatarContainer}>
          <Text style={styles.label}>Icon</Text>
          <Avatar
            icon="person"
            size="large"
            backgroundColor={colors.secondary}
          />
        </View>
      </View>

      {/* Badge Section */}
      <Text style={styles.sectionTitle}>Badges</Text>
      
      <View style={styles.row}>
        <View style={styles.badgeContainer}>
          <Text style={styles.label}>Default</Text>
          <Badge value={5} />
        </View>

        <View style={styles.badgeContainer}>
          <Text style={styles.label}>Warning</Text>
          <Badge value={12} color={colors.warning} />
        </View>

        <View style={styles.badgeContainer}>
          <Text style={styles.label}>Text</Text>
          <Badge value="NEW" />
        </View>
      </View>

      {/* Avatar with Badge */}
      <Text style={styles.sectionTitle}>Avatar with Badge</Text>
      
      <View style={styles.row}>
        <View style={styles.avatarContainer}>
          <Avatar
            text="JD"
            size="medium"
          >
            <Badge value={3} containerStyle={styles.avatarBadge} />
          </Avatar>
        </View>

        <View style={styles.avatarContainer}>
          <Avatar
            source={{ uri: sampleImageUrl }}
            size="medium"
          >
            <Badge value="●" color={colors.success} containerStyle={styles.statusBadge} />
          </Avatar>
        </View>

        <View style={styles.avatarContainer}>
          <Avatar
            icon="person"
            size="medium"
            backgroundColor={colors.secondary}
          >
            <Badge value="!" color={colors.error} containerStyle={styles.avatarBadge} />
          </Avatar>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.medium,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.medium,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.large,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  badgeContainer: {
    alignItems: 'center',
  },
  label: {
    marginBottom: spacing.small,
    fontSize: 12,
  },
  avatarBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 14,
    width: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.white,
  },
});

export default AvatarBadgeShowcase;
