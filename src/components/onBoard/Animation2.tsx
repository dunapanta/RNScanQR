import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {useDynamicAnimation, MotiImage} from 'moti';
import {images, SIZES} from '../../constants';

interface Props {
  animate: boolean;
}

export const Animation2 = ({animate}: Props) => {
  //Moti Initial position
  const motiImage1 = useDynamicAnimation(() => ({
    top: '30%',
    left: '25%',
  }));
  const motiImage2 = useDynamicAnimation(() => ({
    top: '45%',
    left: '15%',
  }));
  const motiImage3 = useDynamicAnimation(() => ({
    top: '58%',
    left: '25%',
  }));
  const motiImage4 = useDynamicAnimation(() => ({
    top: '61%',
    left: '40%',
  }));
  const motiImage5 = useDynamicAnimation(() => ({
    top: '27%',
    left: '50%',
  }));
  return (
    <View style={{flex: 1, overflow: 'hidden'}}>
      <Image source={images.walkthrough_02_01} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    width: 86,
    height: 112,
    zIndex: 0,
    borderRadius: SIZES.radius,
  },
});
