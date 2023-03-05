import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

import {COLORS, FONTS, images, SIZES} from '../constants';
import {ScanQRScreen} from '../screens';

const Drawer = createDrawerNavigator();

interface CustomDrawerItemProps {
  label: string;
  icon: any;
  isFocused?: boolean;
}

const CustomDrawerItem = ({label, icon, isFocused}: CustomDrawerItemProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 50,
        marginBottom: SIZES.base,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: isFocused ? COLORS.transparentBlack1 : null,
      }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 26,
          height: 26,
          tintColor: COLORS.white,
        }}
      />
      <Text
        style={{
          marginLeft: 15,
          color: COLORS.white,
          ...FONTS.h3,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({navigation}) => {
  return (
    <DrawerContentScrollView scrollEnabled contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: SIZES.radius}}>
        {/* Close */}
        <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.closeDrawer()}>
            <Image
              source={images.cross}
              style={{height: 50, width: 50, tintColor: COLORS.white}}
            />
          </TouchableOpacity>
        </View>
        {/* Drawer Items */}
        <View
          style={{
            flex: 1,
            marginTop: SIZES.padding * 2,
          }}>
          <CustomDrawerItem label="Home" icon={images.qr} />
          <CustomDrawerItem label="Favorites" icon={images.favorites} />
          <CustomDrawerItem label="History" icon={images.history} />
          <CustomDrawerItem label="Settings" icon={images.settings} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
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
        initialRouteName="ScanQRScreen"
        drawerContent={props => {
          console.log('props:', props);
          setTimeout(() => {
            setProgress(props.progress);
          }, 0);
          return <CustomDrawerContent navigation={props.navigation} />;
        }}>
        <Drawer.Screen name="ScanQRScreen">
          {props => (
            <ScanQRScreen {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;
