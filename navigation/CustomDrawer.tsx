import React from 'react';
import {View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {COLORS} from '../src/constants';
import {QRCameraScreen} from '../src/screens';

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: {
            flex: 1,
            width: '65%',
            paddingRight: 20,
            backgroundColor: 'transparent',
          },
          sceneContainerStyle: {
            backgroundColor: 'transparent',
          },
        }}
        initialRouteName="QRCameraScreen">
        <Drawer.Screen name="QRCameraScreen" component={QRCameraScreen} />
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;
