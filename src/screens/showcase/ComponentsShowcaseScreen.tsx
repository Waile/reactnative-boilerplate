/**
 * COMPONENTS SHOWCASE SCREEN
 * 
 * THIS SCREEN DEMONSTRATES ALL THE UI COMPONENTS IN THE BOILERPLATE
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Text,
  Button,
  TextField,
  Checkbox,
  Switch,
  Select,
  RadioButton,
  RadioGroup,
  LoadingIndicator,
  FormField,
  Form,
  Modal,
  Avatar,
  Badge,
  TabView,
  BottomSheet,
  ToastProvider,
  useToast,
} from '../../components/common';
import { colors, spacing, typography } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonsSection from './sections/ButtonsSection';
import InputsSection from './sections/InputsSection';
import SelectionsSection from './sections/SelectionsSection';
import { SectionDivider } from './components/SectionDivider';
import ToastShowcase from './components/ToastShowcase';

/**
 * COMPONENTS SHOWCASE SCREEN
 * Demonstrates all UI components
 */
const ComponentsShowcaseScreen = () => {
  // STATE
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  
  // TABS DATA
  const tabItems = [
    {
      key: 'tab1',
      label: 'Buttons',
      content: <ButtonsSection />,
    },
    {
      key: 'tab2',
      label: 'Inputs',
      badge: 3,
      content: <InputsSection />,
    },
    {
      key: 'tab3',
      label: 'Selections',
      content: <SelectionsSection />,
    },
  ];
  
  // HANDLE FORM SUBMISSION
  const handleFormSubmit = (values: any) => {
    Alert.alert('Form Submitted', JSON.stringify(values, null, 2));
  };
  
  return (
    <ToastProvider>
      <ScrollView style={styles.container}>
        <Text preset="h1" style={styles.header}>UI Components</Text>
        <Text style={styles.subheader}>
          Showcase of all UI components in the boilerplate
        </Text>
        
        {/* TAB VIEW */}
        <View style={styles.tabContainer}>
          <TabView
            tabs={tabItems}
            initialTabKey="tab1"
            swipeable={true}
          />
        </View>
        
        {/* AVATARS */}
        <SectionDivider title="Avatars" />
        <View style={styles.rowContainer}>
          <Avatar
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            size="small"
            containerStyle={{ marginRight: spacing.medium }}
          />
          <Avatar
            name="John Doe"
            size="medium"
            containerStyle={{ marginRight: spacing.medium }}
          />
          <Avatar
            iconName="person"
            size="large"
            backgroundColor={colors.secondary}
          />
        </View>
        
        {/* BADGES */}
        <SectionDivider title="Badges" />
        <View style={styles.rowContainer}>
          <Badge
            value={5}
            containerStyle={{ marginRight: spacing.medium }}
          />
          <Badge
            value="New"
            backgroundColor={colors.success}
            containerStyle={{ marginRight: spacing.medium }}
          />
          <View style={{ marginRight: spacing.medium }}>
            <Badge
              value={99}
              position="top-right"
            >
              <Icon name="notifications" size={24} color={colors.text} />
            </Badge>
          </View>
          <Badge
            dot={true}
            backgroundColor={colors.warning}
          />
        </View>
        
        {/* MODALS */}
        <SectionDivider title="Modal & Bottom Sheet" />
        <View style={styles.rowContainer}>
          <Button
            label="Open Modal"
            onPress={() => setModalVisible(true)}
            style={{ marginRight: spacing.medium, flex: 1 }}
          />
          <Button
            label="Open Bottom Sheet"
            onPress={() => setBottomSheetVisible(true)}
            style={{ flex: 1 }}
          />
        </View>
        
        {/* TOAST */}
        <SectionDivider title="Toast Notifications" />
        <ToastShowcase />
        
        {/* FORM */}
        <SectionDivider title="Form with all Field Types" />
        <Form
          initialValues={{
            name: '',
            email: '',
            password: '',
            remember: false,
            notifications: true,
            gender: 'male',
            country: '',
          }}
          onSubmit={handleFormSubmit}
          validationSchema={{
            name: { required: true },
            email: { required: true, email: true },
            password: { required: true, minLength: 8 },
            country: { required: true }
          }}
        >
          {({ isSubmitting, isValid }) => (
            <>
              <FormField
                name="name"
                label="Full Name"
                type="text"
                placeholder="Enter your name"
                leftIcon="person"
                required
              />
              
              <FormField
                name="email"
                label="Email Address"
                type="email"
                placeholder="email@example.com"
                leftIcon="email"
                required
              />
              
              <FormField
                name="password"
                label="Password"
                type="password"
                placeholder="Enter password"
                leftIcon="lock"
                required
              />
              
              <FormField
                name="country"
                label="Country"
                type="select"
                options={[
                  { label: 'United States', value: 'us' },
                  { label: 'Canada', value: 'ca' },
                  { label: 'United Kingdom', value: 'uk' },
                  { label: 'Australia', value: 'au' },
                ]}
                placeholder="Select your country"
                required
              />
              
              <FormField
                name="gender"
                label="Gender"
                type="custom"
                render={({ field }) => (
                  <RadioGroup
                    label="Gender"
                    options={[
                      { label: 'Male', value: 'male' },
                      { label: 'Female', value: 'female' },
                      { label: 'Other', value: 'other' }
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    direction="horizontal"
                  />
                )}
              />
              
              <FormField
                name="remember"
                label="Remember me"
                type="checkbox"
              />
              
              <FormField
                name="notifications"
                label="Enable notifications"
                description="Receive updates and promotions"
                type="switch"
              />
              
              <Button
                label="Submit Form"
                variant="primary"
                loading={isSubmitting}
                disabled={!isValid}
                style={{ marginTop: spacing.large }}
                onPress={() => {}}
                submit
              />
            </>
          )}
        </Form>
        
        {/* MODAL */}
        <Modal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Sample Modal"
          size="medium"
          primaryAction={{
            label: "Confirm",
            onPress: () => setModalVisible(false),
          }}
          secondaryAction={{
            label: "Cancel",
            onPress: () => setModalVisible(false),
          }}
        >
          <Text>This is a sample modal dialog that demonstrates the Modal component.</Text>
          <TextField
            label="Sample Input"
            placeholder="Type something..."
            style={{ marginTop: spacing.medium }}
          />
        </Modal>
        
        {/* BOTTOM SHEET */}
        <BottomSheet
          visible={bottomSheetVisible}
          onClose={() => setBottomSheetVisible(false)}
          title="Bottom Sheet"
          snapPoints={[0.3, 0.5, 0.8]}
        >
          <Text style={{ marginBottom: spacing.medium }}>
            This is a draggable bottom sheet with snap points. Try dragging it up and down.
          </Text>
          
          <Button
            label="Close Bottom Sheet"
            onPress={() => setBottomSheetVisible(false)}
          />
        </BottomSheet>
      </ScrollView>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    textAlign: 'center',
    color: colors.primary,
    marginTop: spacing.large,
    marginBottom: spacing.small,
  },
  subheader: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.large,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  tabContainer: {
    height: 300,
    marginBottom: spacing.large,
  },
});

export default ComponentsShowcaseScreen;
