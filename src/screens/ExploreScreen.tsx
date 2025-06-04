/**
 * EXPLORE SCREEN
 * 
 * THIS SCREEN DEMONSTRATES A GRID LAYOUT WITH ITEM CARDS
 * IT SHOWS HOW TO IMPLEMENT A SCROLLABLE GRID WITH TOUCH INTERACTIONS
 */

import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import Text from '../components/common/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

// MOCK DATA FOR THE EXPLORE GRID
const exploreData = [
  { id: '1', title: 'Nature', icon: 'park', color: '#4CAF50' },
  { id: '2', title: 'Food', icon: 'restaurant', color: '#FF9800' },
  { id: '3', title: 'Arts', icon: 'palette', color: '#9C27B0' },
  { id: '4', title: 'Sports', icon: 'sports-basketball', color: '#2196F3' },
  { id: '5', title: 'Tech', icon: 'devices', color: '#607D8B' },
  { id: '6', title: 'Travel', icon: 'flight', color: '#00BCD4' },
  { id: '7', title: 'Music', icon: 'music-note', color: '#E91E63' },
  { id: '8', title: 'Books', icon: 'book', color: '#795548' },
  { id: '9', title: 'Fitness', icon: 'fitness-center', color: '#FF5722' },
];

const ExploreScreen = () => {
  // NAVIGATION HOOK FOR TYPE-SAFE NAVIGATION
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  // HANDLER FOR ITEM PRESS
  const handleItemPress = (id: string, title: string) => {
    navigation.navigate('Details', { id, title });
  };

  // RENDER EACH EXPLORE ITEM
  const renderExploreItem = ({ item }: { item: typeof exploreData[0] }) => (
    <TouchableOpacity
      style={[styles.exploreItem, { backgroundColor: item.color }]}
      onPress={() => handleItemPress(item.id, item.title)}
      activeOpacity={0.8}
    >
      <Icon name={item.icon} color={colors.white} size={32} />
      <Text style={[typography.button, styles.itemText]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* SEARCH HEADER */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar}>
          <Icon name="search" size={24} color={colors.gray} />
          <Text style={[typography.body2, styles.searchText]}>Search categories...</Text>
        </TouchableOpacity>
      </View>
      
      {/* CATEGORIES SECTION */}
      <View style={styles.sectionHeader}>
        <Text style={typography.h4}>Popular Categories</Text>
        <TouchableOpacity>
          <Text style={[typography.caption, styles.seeAll]}>See All</Text>
        </TouchableOpacity>
      </View>
      
      {/* GRID OF EXPLORE ITEMS */}
      <FlatList
        data={exploreData}
        renderItem={renderExploreItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
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
  searchContainer: {
    padding: spacing.medium,
    backgroundColor: colors.background.secondary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: spacing.small,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  searchText: {
    marginLeft: spacing.small,
    color: colors.gray,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
  },
  seeAll: {
    color: colors.primary,
  },
  gridContainer: {
    padding: spacing.small,
  },
  exploreItem: {
    flex: 1,
    margin: spacing.small,
    aspectRatio: 1,
    borderRadius: spacing.small,
    padding: spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    marginTop: spacing.small,
    color: colors.white,
    textAlign: 'center',
  },
});

export default ExploreScreen;
