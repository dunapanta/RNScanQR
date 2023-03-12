import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {FlashList} from '@shopify/flash-list';

import {COLORS, FONTS, SIZES} from '../constants';
import Animated from 'react-native-reanimated';
import {MenuItem} from '../components/shared';
import {useStorage} from '../stores/useStorage';

export const HistoryScreen = ({drawerAnimationStyle, navigation}: any) => {
  const scanned = useStorage(state => state.scanned);
  useEffect(() => {
    console.log('escaneados:', scanned);
  }, [scanned]);

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
          source={require('../assets/animations/nothing.json')}
          autoPlay
          style={{marginTop: 10}}
          loop
        />
      </>
      {/* Flatlist History scanned */}
      <FlashList
        data={scanned}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: COLORS.light60,
              borderWidth: 4,
              borderBottomColor: COLORS.white,
              height: 100,
              minWidth: 100,
            }}>
            <Text>{item.value}</Text>
          </View>
        )}
        estimatedItemSize={20}
      />
    </Animated.View>
  );
};
