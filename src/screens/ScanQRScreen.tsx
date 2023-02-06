import {useCallback, useEffect} from 'react';
import {Linking, View} from 'react-native';
import TextButton from '../components/shared/TextButton';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

export const ScanQRScreen = ({navigation}: any) => {
  //Camera
  const devices = useCameraDevices();
  const device = devices.back;

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

  function renderCamera() {
    if (!device || device === null) {
      <View style={{flex: 1, backgroundColor: 'tomato'}}></View>;
    } else {
      return (
        <Camera
          style={{flex: 1, backgroundColor: 'purple'}}
          device={device}
          isActive={true}
          enableZoomGesture={true}
        />
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
