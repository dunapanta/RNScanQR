import {useEffect, useRef, useState} from 'react';
import {Animated, Modal, TouchableWithoutFeedback, View} from 'react-native';
import {COLORS, SIZES} from '../../constants';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const ResultModal = ({isVisible, onClose}: Props) => {
  const [showResultModal, setShowResultModal] = useState(false); //easy to animate the modal

  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showResultModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
    console.log('showResultModal: ', showResultModal);
  }, [showResultModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 6800],
  });

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
            top: modalY,
            left: 0,
            width: '100%',
            height: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.radius,
            borderTopLeftRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            zIndex: 100,
          }}></Animated.View>
      </View>
    </Modal>
  );
};
