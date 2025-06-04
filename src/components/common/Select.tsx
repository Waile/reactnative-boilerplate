/**
 * SELECT COMPONENT
 * 
 * THIS IS A REUSABLE DROPDOWN SELECT COMPONENT
 * IT PROVIDES A CONSISTENT WAY TO SELECT FROM OPTIONS
 */

import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Text from './Text';
import { colors, spacing, typography } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

// WINDOW DIMENSIONS
const windowHeight = Dimensions.get('window').height;

// SELECT OPTION INTERFACE
export interface SelectOption {
  label: string;
  value: string | number;
  icon?: string;
  disabled?: boolean;
}

// SELECT PROPS INTERFACE
interface SelectProps {
  options: SelectOption[];
  value: string | number | null;
  onSelect: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  error?: string | null;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  required?: boolean;
  searchable?: boolean;
  multiselect?: boolean;
  testID?: string;
  modalTitle?: string;
}

/**
 * SELECT COMPONENT
 * A dropdown select component with modal picker
 */
const Select: React.FC<SelectProps> = ({
  options,
  value,
  onSelect,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  containerStyle,
  labelStyle,
  required = false,
  searchable = false,
  multiselect = false,
  testID,
  modalTitle,
}) => {
  // STATE FOR MODAL VISIBILITY
  const [modalVisible, setModalVisible] = useState(false);
  
  // REF FOR FLATLIST
  const flatListRef = useRef<FlatList>(null);
  
  // FIND CURRENTLY SELECTED OPTION
  const selectedOption = options.find(option => option.value === value);
  
  // OPEN MODAL
  const openModal = () => {
    if (!disabled) {
      setModalVisible(true);
      
      // SCROLL TO SELECTED OPTION IF EXISTS
      if (value !== null && flatListRef.current) {
        const selectedIndex = options.findIndex(option => option.value === value);
        if (selectedIndex >= 0) {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: selectedIndex,
              animated: true,
              viewPosition: 0.5,
            });
          }, 100);
        }
      }
    }
  };
  
  // HANDLE OPTION SELECTION
  const handleSelect = (selectedValue: string | number) => {
    onSelect(selectedValue);
    setModalVisible(false);
  };
  
  // RENDER OPTION ITEM
  const renderOption = ({ item }: { item: SelectOption }) => {
    const isSelected = item.value === value;
    
    return (
      <TouchableOpacity
        style={[
          styles.optionItem,
          isSelected && styles.selectedOption,
          item.disabled && styles.disabledOption,
        ]}
        onPress={() => handleSelect(item.value)}
        disabled={item.disabled}
      >
        {/* OPTION ICON */}
        {item.icon && (
          <Icon
            name={item.icon}
            size={24}
            color={isSelected ? colors.primary : colors.icon}
            style={styles.optionIcon}
          />
        )}
        
        {/* OPTION TEXT */}
        <Text
          style={[
            styles.optionText,
            isSelected && styles.selectedOptionText,
            item.disabled && styles.disabledOptionText,
          ]}
        >
          {item.label}
        </Text>
        
        {/* SELECTED CHECKMARK */}
        {isSelected && (
          <Icon name="check" size={20} color={colors.primary} />
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      {/* LABEL */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.requiredAsterisk}> *</Text>}
          </Text>
        </View>
      )}
      
      {/* SELECT BUTTON */}
      <TouchableOpacity
        style={[
          styles.selectButton,
          error ? styles.selectButtonError : null,
          disabled ? styles.selectButtonDisabled : null,
        ]}
        onPress={openModal}
        disabled={disabled}
        testID={testID}
      >
        {/* SELECTED VALUE OR PLACEHOLDER */}
        <Text
          style={[
            selectedOption ? styles.selectedText : styles.placeholderText,
            disabled ? styles.textDisabled : null,
          ]}
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        
        {/* DROPDOWN ICON */}
        <Icon
          name="arrow-drop-down"
          size={24}
          color={disabled ? colors.textDisabled : colors.icon}
        />
      </TouchableOpacity>
      
      {/* ERROR MESSAGE */}
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {/* OPTIONS MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View 
            style={styles.modalContainer}
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <SafeAreaView style={styles.modalContent}>
              {/* MODAL HEADER */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {modalTitle || label || 'Select an option'}
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <Icon name="close" size={24} color={colors.icon} />
                </TouchableOpacity>
              </View>
              
              {/* OPTIONS LIST */}
              <FlatList
                ref={flatListRef}
                data={options}
                renderItem={renderOption}
                keyExtractor={(item) => item.value.toString()}
                contentContainerStyle={styles.optionsList}
                showsVerticalScrollIndicator={true}
                initialNumToRender={20}
                onScrollToIndexFailed={() => {}}
              />
            </SafeAreaView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.medium,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: spacing.small,
  },
  label: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  requiredAsterisk: {
    color: colors.error,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    backgroundColor: colors.background,
    minHeight: 56,
  },
  selectButtonError: {
    borderColor: colors.error,
  },
  selectButtonDisabled: {
    backgroundColor: colors.backgroundLight,
    borderColor: colors.border,
  },
  placeholderText: {
    ...typography.body,
    color: colors.textPlaceholder,
    flex: 1,
  },
  selectedText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  textDisabled: {
    color: colors.textDisabled,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.small,
    marginLeft: spacing.small,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: windowHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.medium,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.text,
  },
  optionsList: {
    paddingVertical: spacing.small,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.medium,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  selectedOption: {
    backgroundColor: colors.backgroundLight,
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionIcon: {
    marginRight: spacing.medium,
  },
  optionText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: '600',
  },
  disabledOptionText: {
    color: colors.textDisabled,
  },
});

export default Select;
