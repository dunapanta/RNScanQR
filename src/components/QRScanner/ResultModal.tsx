import {useEffect, useState} from 'react';
import {Animated, Modal, TouchableWithoutFeedback, View} from 'react-native';
import {COLORS} from '../../constants';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const ResultModal = ({isVisible, onClose}: Props) => {
  const [showResultModal, setShowResultModal] = useState(false); //easy to animate the modal

  useEffect(() => {
    if (!showResultModal) {
      onClose();
    }
    console.log('showResultModal: ', showResultModal);
  }, [showResultModal]);
  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={{flex: 1, backgroundColor: 'red'}}>
        {/* Transparent Background */}
        <TouchableWithoutFeedback onPress={() => setShowResultModal(false)}>
          <View
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: 'absolute',
            //top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}></Animated.View>
      </View>
    </Modal>
  );
};
