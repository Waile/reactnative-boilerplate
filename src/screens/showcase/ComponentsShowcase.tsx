/**
 * COMPONENTS SHOWCASE SCREEN
 * 
 * THIS SCREEN DEMONSTRATES ALL UI COMPONENTS IN ONE PLACE
 * IT SERVES AS A VISUAL REFERENCE AND TEST FOR ALL REUSABLE COMPONENTS
 */

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '../../components/common';
import { colors, spacing } from '../../theme';

// Import showcase sections
import ButtonsSection from './sections/ButtonsSection';
import InputsSection from './sections/InputsSection';
import SelectionsSection from './sections/SelectionsSection';

// Import showcase components
import ToastShowcase from './components/ToastShowcase';
import ModalShowcase from './components/ModalShowcase';
import BottomSheetShowcase from './components/BottomSheetShowcase';
import AvatarBadgeShowcase from './components/AvatarBadgeShowcase';
import TabsShowcase from './components/TabsShowcase';

/**
 * ComponentsShowcase Screen
 * Displays all UI components in organized sections
 */
const ComponentsShowcase: React.FC = () => {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>UI Components</Text>
      <Text style={styles.subheader}>
        A comprehensive showcase of all reusable UI components
      </Text>

      {/* BUTTONS SECTION */}
      <ShowcaseSection title="Buttons">
        <ButtonsSection />
      </ShowcaseSection>

      {/* INPUTS SECTION */}
      <ShowcaseSection title="Inputs">
        <InputsSection />
      </ShowcaseSection>

      {/* SELECTIONS SECTION */}
      <ShowcaseSection title="Selections">
        <SelectionsSection />
      </ShowcaseSection>

      {/* FEEDBACK SECTION */}
      <ShowcaseSection title="Feedback Components">
        <Text style={styles.sectionInfo}>
          Components that provide feedback to users such as toasts and alerts
        </Text>
        <ToastShowcase />
      </ShowcaseSection>

      {/* OVERLAY COMPONENTS */}
      <ShowcaseSection title="Overlay Components">
        <Text style={styles.sectionInfo}>
          Components that overlay the screen such as modals and bottom sheets
        </Text>
        <ModalShowcase />
        <BottomSheetShowcase />
      </ShowcaseSection>

      {/* AVATAR & BADGE COMPONENTS */}
      <ShowcaseSection title="Display Components">
        <Text style={styles.sectionInfo}>
          Visual elements for displaying user information and status
        </Text>
        <AvatarBadgeShowcase />
      </ShowcaseSection>

      {/* NAVIGATION COMPONENTS */}
      <ShowcaseSection title="Navigation Components">
        <Text style={styles.sectionInfo}>
          Components that help users navigate through the app
        </Text>
        <TabsShowcase />
      </ShowcaseSection>
    </ScrollView>
  );
};

/**
 * ShowcaseSection component
 * Wraps each section with consistent styling and a title
 */
interface ShowcaseSectionProps {
  title: string;
  children: React.ReactNode;
}

const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  contentContainer: {
    padding: spacing.medium,
    paddingBottom: spacing.extraLarge * 2,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.small,
  },
  subheader: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: spacing.large,
  },
  section: {
    marginBottom: spacing.extraLarge,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.medium,
    paddingBottom: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  sectionContent: {
    paddingHorizontal: spacing.small,
  },
  sectionInfo: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.medium,
    fontStyle: 'italic',
  },
});

export default ComponentsShowcase;
