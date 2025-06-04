/**
 * MODAL SHOWCASE COMPONENT
 * 
 * THIS COMPONENT DEMONSTRATES THE MODAL COMPONENT WITH DIFFERENT CONFIGURATIONS
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Modal } from '../../../components/common';
import { colors, spacing } from '../../../theme';

/**
 * Modal showcase component
 * Demonstrates different modal variants and usage patterns
 */
const ModalShowcase: React.FC = () => {
  const [basicModalVisible, setBasicModalVisible] = useState(false);
  const [customModalVisible, setCustomModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button
          title="Basic Modal"
          onPress={() => setBasicModalVisible(true)}
          style={styles.button}
        />
        
        <Button
          title="Custom Modal"
          onPress={() => setCustomModalVisible(true)}
          style={styles.button}
          variant="secondary"
        />
      </View>

      {/* Basic Modal Example */}
      <Modal
        visible={basicModalVisible}
        onClose={() => setBasicModalVisible(false)}
        title="Basic Modal"
      >
        <Text style={styles.modalText}>
          This is a basic modal with default styling and a simple title.
          You can add any content here.
        </Text>
        <Button
          title="Close"
          onPress={() => setBasicModalVisible(false)}
          variant="outline"
          style={styles.modalButton}
        />
      </Modal>

      {/* Custom Modal Example */}
      <Modal
        visible={customModalVisible}
        onClose={() => setCustomModalVisible(false)}
        title="Custom Modal"
        titleStyle={styles.customTitle}
        contentStyle={styles.customContent}
      >
        <Text style={styles.customModalText}>
          This modal has custom styling for the title and content.
          You can fully customize the appearance.
        </Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Cancel"
            onPress={() => setCustomModalVisible(false)}
            variant="outline"
            style={styles.groupButton}
          />
          <Button
            title="Confirm"
            onPress={() => {
              // Handle confirmation
              setCustomModalVisible(false);
            }}
            style={styles.groupButton}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.medium,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
  },
  modalText: {
    marginBottom: spacing.large,
  },
  modalButton: {
    alignSelf: 'flex-end',
  },
  customTitle: {
    color: colors.secondary,
    textAlign: 'center',
  },
  customContent: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: spacing.large,
  },
  customModalText: {
    marginBottom: spacing.large,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupButton: {
    width: '48%',
  },
});

export default ModalShowcase;
