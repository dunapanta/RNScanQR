import {Animated, View} from 'react-native';

import {constants, SIZES} from '../../constants';

interface Props {
  scrollX: Animated.Value;
}

export const Dots = ({scrollX}: Props) => {
  //Calculate the position of the dots
  const dotPosition = Animated.divide(scrollX, SIZES.width);
  const Points = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {constants.walkthrough.map((item, index) => {
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 6,
                width: 10,
                height: 10,
                backgroundColor: 'black',
              }}></Animated.View>
          );
        })}
      </View>
    );
  };
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: SIZES.height * 0.2,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.height > 700 ? SIZES.padding : 20,
      }}>
      <Points />
    </View>
  );
};
