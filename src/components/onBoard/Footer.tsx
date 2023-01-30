import {Animated, View} from 'react-native';

import {COLORS, constants, FONTS, SIZES} from '../../constants';
import TextButton from '../shared/TextButton';

interface Props {
  scrollX: Animated.Value;
}

export const Footer = ({scrollX}: Props) => {
  //Calculate the position of the dots
  const dotPosition = Animated.divide(scrollX, SIZES.width);
  const Dots = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {constants.walkthrough.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.dark08, COLORS.primary, COLORS.dark08],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 6,
                width: 10,
                height: 10,
                backgroundColor: dotColor,
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
      <Dots />

      {/* Buttons */}
      <View
        style={{
          flexDirection: 'row',
          height: 55,
        }}>
        <TextButton
          label="Siguiente"
          contentContainerStyle={{
            flex: 1,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGrey,
            borderWidth: 0.5,
            borderColor: COLORS.dark60,
          }}
          labelStyle={{
            color: COLORS.primary,
            ...FONTS.h3,
          }}
          onPress={() => console.log('Siguiente')}
        />
        <TextButton
          label="Saltar"
          contentContainerStyle={{
            flex: 1,
            marginLeft: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          labelStyle={{
            ...FONTS.h3,
          }}
          onPress={() => console.log('Saltar')}
        />
      </View>
    </View>
  );
};
