import {useCallback, useEffect, useState} from 'react';
import {Linking, View} from 'react-native';
import TextButton from '../components/shared/TextButton';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Svg, Defs, Rect, Mask} from 'react-native-svg';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';

export const ScanQRScreen = ({navigation}: any) => {
  //Camera
  const devices = useCameraDevices();

  //Barcode
  const [barcode, setBarcode] = useState('');
  const [isScanned, setIsScanned] = useState(false);
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);
  const device = devices.back;

  useEffect(() => {
    toggleActiveState();
  }, [barcodes]);

  const toggleActiveState = async () => {
    if (barcodes && barcodes.length > 0 && !isScanned) {
      setIsScanned(true);
      barcodes.forEach(async scannedBarcode => {
        if (scannedBarcode.rawValue && scannedBarcode.rawValue !== '') {
          setBarcode(scannedBarcode.rawValue);
          console.log('Barcode: ', scannedBarcode.rawValue);
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
          fill="rgba(0,0,0,0.8)"
          mask="url(#mask)"
        />

        {/* Frame Border */}
        <Rect
          x="18%"
          y="30%"
          width="250"
          height="250"
          strokeWidth="5"
          stroke="#fff"
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
    <View
      style={{
        flex: 1,
      }}>
      {/* Camera */}
      {renderCamera()}
      {/* <TextButton
        label="Scan QR"
        onPress={() => navigation.navigate('QRCameraScreen')}
      /> */}
    </View>
  );
};
