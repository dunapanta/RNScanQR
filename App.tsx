import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-reanimated';
import {ScanQRScreen, TestScreen, WelcomeScreen} from './src/screens';
import CustomDrawer from './src/navigation/CustomDrawer';

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
        <Stack.Screen name="CustomDrawer" component={CustomDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
