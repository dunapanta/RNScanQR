import React, {useEffect} from 'react';
import {Text, Touchable, TouchableOpacity, View} from 'react-native';
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
      {scanned.length > 0 ? (
        <>
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
              Your previous scans
            </Text>
          </View>
          <FlashList
            data={scanned}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.dark80,
                  borderWidth: 2,
                  borderBottomColor: COLORS.white,
                  borderRadius: SIZES.radius,
                  minHeight: SIZES.padding * 4,
                }}
                activeOpacity={0.8}>
                <Text style={{color: COLORS.white, ...FONTS.h3}}>
                  {item.value}
                </Text>
              </TouchableOpacity>
            )}
            estimatedItemSize={20}
          />
        </>
      ) : (
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
      )}
    </Animated.View>
  );
};
