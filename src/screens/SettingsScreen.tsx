import React from 'react';
import {Text, View} from 'react-native';
import Lottie from 'lottie-react-native';

import {COLORS, FONTS, SIZES} from '../constants';
import Animated from 'react-native-reanimated';
import {MenuItem} from '../components/shared';

export const SettingsScreen = ({drawerAnimationStyle, navigation}: any) => {
  return (
    <Animated.View
      style={{
        flex: 1,
        padding: SIZES.padding,
        backgroundColor: COLORS.dark60,
        ...drawerAnimationStyle,
      }}>
      <MenuItem onPress={() => navigation.toggleDrawer()} />

      {/* No History */}
      <Lottie
        source={require('../assets/animations/settings.json')}
        autoPlay
        loop
      />
      <View style={{marginTop: 40, alignItems: 'center'}}>
        <Text style={{color: COLORS.white, ...FONTS.h1}}>Settings</Text>
        <Text
          style={{color: COLORS.white, ...FONTS.h3, marginTop: SIZES.margin}}>
          Noting to show yet
        </Text>
      </View>
    </Animated.View>
  );
};
