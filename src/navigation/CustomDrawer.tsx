import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

import {COLORS, FONTS, images, SIZES} from '../constants';
import {ScanQRScreen} from '../screens';
import {useUiStore} from '../stores/useUi';
import {FavoritesScreen} from '../screens/FavoritesScreen';
import {HistoryScreen} from '../screens/HistoryScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {AboutScreen} from '../screens/About';

const Drawer = createDrawerNavigator();

interface CustomDrawerItemProps {
  label: string;
  icon: any;
  isFocused?: boolean;
  onPress?: () => void;
}

const CustomDrawerItem = ({
  label,
  icon,
  isFocused,
  onPress,
}: CustomDrawerItemProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 50,
        marginBottom: SIZES.base,
        paddingLeft: SIZES.radius,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: isFocused ? COLORS.dark80 : undefined,
      }}
      onPress={onPress}>
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

const CustomDrawerContent = ({
  navigation,
  selectedTab,
  setSelectedTab,
}: any) => {
  return (
    <DrawerContentScrollView scrollEnabled contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: SIZES.radius}}>
        {/* Close */}
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginTop: 30,
          }}>
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
          <CustomDrawerItem
            label="Home"
            icon={images.qr}
            isFocused={selectedTab === 'Home'}
            onPress={() => {
              setSelectedTab('Home');
              navigation.navigate('ScanQRScreen');
            }}
          />
          <CustomDrawerItem
            label="Favorites"
            icon={images.favorites}
            isFocused={selectedTab === 'Favorites'}
            onPress={() => {
              setSelectedTab('Favorites');
              navigation.navigate('Favorites');
            }}
          />
          <CustomDrawerItem
            label="History"
            icon={images.history}
            isFocused={selectedTab === 'History'}
            onPress={() => {
              setSelectedTab('History');
              navigation.navigate('History');
            }}
          />
          <CustomDrawerItem
            label="Settings"
            icon={images.settings}
            isFocused={selectedTab === 'Settings'}
            onPress={() => {
              setSelectedTab('Settings');
              navigation.navigate('Settings');
            }}
          />
          <CustomDrawerItem
            label="About"
            icon={images.about}
            isFocused={selectedTab === 'About'}
            onPress={() => {
              setSelectedTab('About');
              navigation.navigate('About');
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const selectedTab = useUiStore(state => state.selectedTab);
  const setSelectedTab = useUiStore(state => state.setSelectedTab);

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26],
  });

  const animatedStyle = {
    borderRadius,
    transform: [{scale}],
    overflow: 'hidden',
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={{
          flex: 1,
          width: '47%',
          backgroundColor: 'transparent',
        }}
        sceneContainerStyle={{
          backgroundColor: 'transparent',
        }}
        initialRouteName="ScanQRScreen"
        drawerContent={props => {
          setTimeout(() => {
            setProgress(props.progress);
          }, 0);
          return (
            <CustomDrawerContent
              navigation={props.navigation}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          );
        }}>
        <Drawer.Screen name="ScanQRScreen">
          {props => (
            <ScanQRScreen {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        {/* Favorites */}
        <Drawer.Screen name="Favorites">
          {props => <FavoritesScreen {...props} />}
        </Drawer.Screen>
        {/* History */}
        <Drawer.Screen name="History">
          {props => (
            <HistoryScreen {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        {/* Settings */}
        <Drawer.Screen name="Settings">
          {props => <SettingsScreen {...props} />}
        </Drawer.Screen>
        {/* About */}
        <Drawer.Screen name="About">
          {props => <AboutScreen {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;
