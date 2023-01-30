import {useRef} from 'react';
import {Animated, Text, View} from 'react-native';

import {COLORS, constants, FONTS, SIZES} from '../constants';
import {Animation1, Footer} from '../components/onBoard';
import TextButton from '../components/shared/TextButton';

export const TestScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1, backgroundColor: COLORS.light}}>
      <Animated.FlatList
        data={constants.walkthrough}
        keyExtractor={item => item.id.toString()}
        horizontal
        snapToInterval={SIZES.width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          return (
            <View style={{width: SIZES.width, justifyContent: 'center'}}>
              {/* Walkthrough Images */}
              <View style={{flex: 1, justifyContent: 'center'}}>
                {index === 0 && <Animation1 />}
              </View>
              {/* Title & description */}
              <View
                style={{
                  height: SIZES.height * 0.35,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingHorizontal: SIZES.padding,
                }}>
                <Text style={{...FONTS.h1}}>{item.title}</Text>
                <Text
                  style={{
                    marginTop: SIZES.radius,
                    textAlign: 'center',
                    ...FONTS.body3,
                    color: COLORS.grey,
                  }}>
                  {item.sub_title}
                </Text>

                <Footer scrollX={scrollX} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
