import {useRef} from 'react';
import {Animated, Text, View} from 'react-native';
import {COLORS, constants, SIZES} from '../constants';

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
              <Text>{item.title}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
