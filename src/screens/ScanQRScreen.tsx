import {useCallback, useEffect, useState} from 'react';
import {
  Linking,
  View,
  Vibration,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {Svg, Defs, Rect, Mask} from 'react-native-svg';

import {ResultModal} from '../components/QRScanner';
import {useScanQRStore} from '../stores/useScanQRStore';
import {useUiStore} from '../stores/useUi';
import {useIsFocused} from '@react-navigation/native';
import {COLORS, images, SIZES} from '../constants';

export const ScanQRScreen = ({navigation, drawerAnimationStyle}: any) => {
  const isfocused = useIsFocused();
  //Camera
  const devices = useCameraDevices();
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);
  const [device, setDevice] = useState(devices.back);
  //Zustand
  const setBarcode = useScanQRStore(state => state.setBarcode);
  const isScanned = useScanQRStore(state => state.isScanned);
  const setIsScanned = useScanQRStore(state => state.setIsScanned);

  //Result Modal
  const showResultModal = useUiStore(state => state.showResultModal);
  const setShowResultModal = useUiStore(state => state.setShowResultModal);

  useEffect(() => {
    toggleActiveState();
  }, [barcodes]);

  const toggleActiveState = async () => {
    if (barcodes && barcodes.length > 0 && !isScanned) {
      setIsScanned(true);
      barcodes.forEach(async scannedBarcode => {
        if (scannedBarcode.rawValue && scannedBarcode.rawValue !== '') {
          setBarcode(scannedBarcode.rawValue);
          setShowResultModal(true);
          Vibration.vibrate();
        }
      });
    }
  };

  useEffect(() => {
    if (!device) {
      setDevice(devices.back);
    }
  }, [device, devices]);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  //Camera permission
  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    }
  }, []);

  const changeDevicePosition = () => {
    if (device === devices.back) {
      setDevice(devices.front);
    } else {
      setDevice(devices.back);
    }
  };

  function CameraFrame() {
    return (
      <Svg height="100%" width="100%">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="#fff" />
            <Rect x="18%" y="30%" width="250" height="250" fill="black" />
          </Mask>
        </Defs>

        <Rect
          height="100%"
          width="100%"
          fill="rgba(0,0,0,0.7)"
          mask="url(#mask)"
        />

        {/* Frame Border */}
        <Rect
          x="18%"
          y="30%"
          width="250"
          height="250"
          rx="2"
          ry="2"
          strokeWidth="3"
          fill="rgba(0,0,0,0.0)"
          stroke={COLORS.light}
        />
      </Svg>
    );
  }

  function renderCamera() {
    if (!device || device === null) {
      <View style={{flex: 1, backgroundColor: 'white'}}></View>;
    } else {
      return (
        <View style={{flex: 1}}>
          <Camera
            isActive={isfocused}
            style={{flex: 1, backgroundColor: COLORS.dark80}}
            device={device}
            enableZoomGesture={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />

          {/* QR CODE */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}>
            <CameraFrame />
          </View>
        </View>
      );
    }
  }

  return (
    <Animated.View
      style={{
        flex: 1,
        ...drawerAnimationStyle,
      }}>
      {/* Menu Item */}
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.toggleDrawer()}>
        <Image
          source={images.menu}
          resizeMode="contain"
          style={{
            width: 26,
            height: 26,
            tintColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
      {/* Change camera position */}
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={changeDevicePosition}>
        <Image
          source={images.rotate}
          resizeMode="contain"
          style={{
            width: 26,
            height: 26,
            tintColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
      {/* Camera */}
      {renderCamera()}
      {/* <TextButton
        label="Scan QR"
        onPress={() => navigation.navigate('QRCameraScreen')}
      /> */}

      {/* Result Modal */}
      {showResultModal && <ResultModal />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 30,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: COLORS.light08,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.light80,
    zIndex: 1,
  },
  optionContainer: {
    position: 'absolute',
    top: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: COLORS.light08,
    borderRadius: SIZES.radius * 2,
    borderWidth: 1,
    borderColor: COLORS.light80,
    zIndex: 1,
  },
});
