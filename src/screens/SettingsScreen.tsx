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
      <View style={{position: 'absolute', zIndex: 1, top: 30, left: 20}}>
        <MenuItem onPress={() => navigation.toggleDrawer()} />
      </View>

      {/* No History */}
      <>
        <View
          style={{
            marginTop: SIZES.margin,
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{color: COLORS.white, ...FONTS.h1, textAlign: 'center'}}>
              History
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
                textAlign: 'center',
                marginTop: SIZES.margin * 3,
              }}>
              Noting to show yet
            </Text>
          </View>
        </View>
        <Lottie
          source={require('../assets/animations/settings.json')}
          autoPlay
          style={{marginTop: 10}}
          loop
        />
      </>
    </Animated.View>
  );
};
