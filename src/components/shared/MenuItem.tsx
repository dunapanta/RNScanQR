import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';

import {COLORS, images, SIZES} from '../../constants';

interface ImenuItemProps {
  onPress?: () => void;
}

export const MenuItem = ({onPress}: ImenuItemProps) => {
  return (
    <TouchableOpacity style={styles.menuContainer} onPress={onPress}>
      <Image
        source={images.menu}
        resizeMode="contain"
        style={{
          width: 26,
          height: 26,
          tintColor: COLORS.white,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: COLORS.light08,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.light80,
    zIndex: 1,
  },
});
