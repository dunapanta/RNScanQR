import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {useUiStore} from '../../stores/useUi';
import {useScanQRStore} from '../../stores/useScanQRStore';
import {COLORS, FONTS, SIZES} from '../../constants';
import {color} from 'react-native-reanimated';

interface Props {}

export const ResultModal = ({}: Props) => {
  //const [showResultModal, setShowResultModal] = useState(isVisible); //easy to animate the modal
  const showResultModal = useUiStore(state => state.showResultModal);
  const setShowResultModal = useUiStore(state => state.setShowResultModal);

  //Barcode
  const barcode = useScanQRStore(state => state.barcode);
  const setBarcode = useScanQRStore(state => state.setBarcode);
  const setIsScanned = useScanQRStore(state => state.setIsScanned);

  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  const closeModalEmptyBarcode = () => {
    setShowResultModal(false);
    setBarcode('');
    setIsScanned(false);
  };

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
      }).start(() => closeModalEmptyBarcode());
    }
  }, [showResultModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 640],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={showResultModal}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        {/* Transparent Background */}
        <TouchableWithoutFeedback onPress={closeModalEmptyBarcode}>
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
          }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{flex: 1, ...FONTS.h3, fontSize: 18, color: 'black'}}>
              Scan Result
            </Text>
            <Text style={{flex: 1, ...FONTS.h3, fontSize: 18, color: 'black'}}>
              {barcode}
            </Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
