import {useEffect, useRef, useState} from 'react';
import {Animated, Modal, TouchableWithoutFeedback, View} from 'react-native';

import {useUiStore} from '../../stores/useUi';
import {COLORS, SIZES} from '../../constants';

interface Props {}

export const ResultModal = ({}: Props) => {
  //const [showResultModal, setShowResultModal] = useState(isVisible); //easy to animate the modal
  const showResultModal = useUiStore(state => state.showResultModal);
  const setShowResultModal = useUiStore(state => state.setShowResultModal);

  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showResultModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setShowResultModal(false));
    }
    console.log('showResultModal: ', showResultModal);
  }, [showResultModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 640],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={showResultModal}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
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
          }}></Animated.View>
      </View>
    </Modal>
  );
};
