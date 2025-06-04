/**
 * NOTIFICATIONS SCREEN
 * 
 * THIS SCREEN DEMONSTRATES A LIST-BASED INTERFACE FOR NOTIFICATIONS
 * IT SHOWS HOW TO IMPLEMENT A SCROLLABLE LIST WITH SWIPE ACTIONS
 */

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';
import Text from '../components/common/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

// MOCK DATA FOR NOTIFICATIONS
const initialNotifications = [
  {
    id: '1',
    type: 'like',
    message: 'Jane Smith liked your post',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    message: 'John Doe commented on your photo',
    time: '15 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    message: 'Alex Johnson started following you',
    time: '1 hour ago',
    read: true,
  },
  {
    id: '4',
    type: 'mention',
    message: 'You were mentioned in a comment',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    message: 'Your account was successfully verified',
    time: '1 day ago',
    read: true,
  },
];

const NotificationsScreen = () => {
  // STATE TO MANAGE NOTIFICATIONS
  const [notifications, setNotifications] = useState(initialNotifications);
  
  // MARK NOTIFICATION AS READ
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // GET ICON FOR NOTIFICATION TYPE
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return { name: 'favorite', color: colors.error };
      case 'comment':
        return { name: 'comment', color: colors.primary };
      case 'follow':
        return { name: 'person-add', color: colors.secondary };
      case 'mention':
        return { name: 'alternate-email', color: colors.info };
      case 'system':
        return { name: 'notifications', color: colors.warning };
      default:
        return { name: 'notifications', color: colors.gray };
    }
  };
  
  // RENDER EACH NOTIFICATION ITEM
  const renderNotificationItem = ({ item }: { item: typeof initialNotifications[0] }) => {
    const { name, color } = getNotificationIcon(item.type);
    
    return (
      <TouchableOpacity
        style={[styles.notificationItem, item.read ? styles.readNotification : styles.unreadNotification]}
        onPress={() => markAsRead(item.id)}
      >
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Icon name={name} size={24} color={color} />
        </View>
        
        <View style={styles.notificationContent}>
          <Text 
            style={[
              typography.body1, 
              item.read ? styles.readText : styles.unreadText
            ]}
          >
            {item.message}
          </Text>
          <Text style={typography.caption}>{item.time}</Text>
        </View>
        
        {!item.read && <View style={styles.unreadIndicator} />}
      </TouchableOpacity>
    );
  };

  // COUNT UNREAD NOTIFICATIONS
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* NOTIFICATIONS HEADER */}
      <View style={styles.header}>
        <Text style={typography.h4}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity 
            style={styles.markAllButton}
            onPress={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
          >
            <Text style={[typography.caption, styles.markAllText]}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* NOTIFICATIONS LIST */}
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="notifications-off" size={48} color={colors.gray} />
            <Text style={[typography.body1, styles.emptyText]}>No notifications yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

// STYLES USING THEME VARIABLES FOR CONSISTENCY
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  markAllButton: {
    padding: spacing.small,
  },
  markAllText: {
    color: colors.primary,
  },
  listContainer: {
    flexGrow: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  unreadNotification: {
    backgroundColor: colors.background.primary,
  },
  readNotification: {
    backgroundColor: colors.background.secondary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.medium,
  },
  notificationContent: {
    flex: 1,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  unreadText: {
    fontWeight: 'bold',
  },
  readText: {
    color: colors.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxlarge,
  },
  emptyText: {
    color: colors.gray,
    marginTop: spacing.medium,
  },
});

export default NotificationsScreen;
