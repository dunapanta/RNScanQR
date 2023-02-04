import {View} from 'react-native';
import TextButton from '../components/shared/TextButton';

export const ScanQRScreen = ({navigation}: any) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TextButton
        label="Scan QR"
        onPress={() => navigation.navigate('QRCameraScreen')}
      />
    </View>
  );
};
