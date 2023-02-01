import {useRef, useState} from 'react';
import {Animated, Text, View} from 'react-native';

import {COLORS, constants, FONTS, SIZES} from '../constants';
import {Animation1, Animation2, Footer} from '../components/onBoard';

export const TestScreen = () => {
  //Animation 2
  const [animation2, setAnimation2] = useState(false);
  const onViewChangeRef = useRef(({viewableItems, changed}) => {
    if (viewableItems[0].index === 1) {
      setAnimation2(true);
    }
  });
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
        onViewableItemsChanged={onViewChangeRef.current}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          return (
            <View style={{width: SIZES.width, justifyContent: 'center'}}>
              {/* Walkthrough Images */}
              <View
                style={
                  index === 0
                    ? {flex: 1, flexDirection: 'row', justifyContent: 'center'}
                    : {flex: 1, justifyContent: 'center'}
                }>
                {index === 0 && <Animation1 />}
                {index === 1 && <Animation2 animate={animation2} />}
              </View>
              {/* Title & description */}
              <View
                style={{
                  height: SIZES.height * 0.35,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingHorizontal: SIZES.padding,
                }}>
                <Text style={{...FONTS.h1, marginTop: 30}}>{item.title}</Text>
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
