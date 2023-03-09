import {useCallback, useEffect, useState} from 'react';
import {Linking, View, Vibration, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {Svg, Defs, Rect, Mask} from 'react-native-svg';

import TextButton from '../components/shared/TextButton';
import {ResultModal} from '../components/QRScanner';
import {MainButton} from '../components/shared';
import {useScanQRStore} from '../stores/useScanQRStore';
import {useUiStore} from '../stores/useUi';

export const ScanQRScreen = ({navigation, drawerAnimationStyle}: any) => {
  //Camera
  const devices = useCameraDevices();
  //Zustand
  const barcode = useScanQRStore(state => state.barcode);
  const setBarcode = useScanQRStore(state => state.setBarcode);
  const isScanned = useScanQRStore(state => state.isScanned);
  const setIsScanned = useScanQRStore(state => state.setIsScanned);

  //Barcode
  //const [barcode, setBarcode] = useState('');
  //const [isScanned, setIsScanned] = useState(false);
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);
  const device = devices.back;

  //Result Modal
  //const [showResultModal, setShowResultModal] = useState(false);
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
    requestCameraPermission();
  }, []);

  //Camera permission
  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    }
  }, []);

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
          rx="5"
          ry="5"
          strokeWidth="3"
          fill="rgba(0,0,0,0.0)"
          stroke="#ff8855"
        />
      </Svg>
    );
  }

  function renderCamera() {
    if (!device || device === null) {
      <View style={{flex: 1, backgroundColor: 'tomato'}}></View>;
    } else {
      return (
        <View style={{flex: 1}}>
          <Camera
            style={{flex: 1, backgroundColor: 'purple'}}
            device={device}
            isActive={true}
            enableZoomGesture={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />

          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 30,
              right: 30,
              width: 40,
              height: 40,
              backgroundColor: '#ffffff',
              borderRadius: 3,
              zIndex: 1,
            }}
            onPress={() => navigation.toggleDrawer()}></TouchableOpacity>

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
