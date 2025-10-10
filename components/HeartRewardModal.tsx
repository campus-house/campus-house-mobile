import * as React from "react";
import {View, StyleSheet, Modal, TouchableOpacity} from "react-native";
import RewardTitleText from './RewardTitleText';
import RewardSubText from './RewardSubText';
import RewardButton from './RewardButton';
import SquirrelImage from './SquirrelImage';
import SparkleEffects from './SparkleEffects';

interface HeartRewardModalProps {
  visible: boolean;
  onClose: () => void;
}

const HeartRewardModal: React.FC<HeartRewardModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.background} 
          activeOpacity={1}
          onPress={onClose}
        >
          <View style={styles.modalContainer}>
            <SparkleEffects />
            <SquirrelImage />
            <View style={styles.textContainer}>
              <RewardTitleText />
              <RewardSubText />
            </View>
            <View style={styles.buttonContainer}>
              <RewardButton onPress={onClose} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    marginTop: 130,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '90%',
    maxWidth: 300,
  },
});

export default HeartRewardModal;
