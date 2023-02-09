import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  QRCameraScreen,
  ScanQRScreen,
  TestScreen,
  WelcomeScreen,
} from './src/screens';
import 'react-native-reanimated';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="ScanQRScreen" component={ScanQRScreen} />
        <Stack.Screen name="QRCameraScreen" component={QRCameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
