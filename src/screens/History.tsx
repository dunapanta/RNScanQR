import React from 'react';
import {Text, View} from 'react-native';
import Lottie from 'lottie-react-native';

import {COLORS, FONTS, SIZES} from '../constants';
import Animated from 'react-native-reanimated';
import {MenuItem} from '../components/shared';

export const HistoryScreen = ({drawerAnimationStyle, navigation}: any) => {
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
      <View style={{marginTop: 40, alignItems: 'center'}}>
        <Text style={{color: COLORS.white, ...FONTS.h1}}>History</Text>
        <Text
          style={{color: COLORS.white, ...FONTS.h3, marginTop: SIZES.margin}}>
          Noting to show yet
        </Text>
      </View>
      <Lottie
        source={require('../assets/animations/nothing.json')}
        autoPlay
        style={{marginTop: 10}}
        loop
      />
    </Animated.View>
  );
};
