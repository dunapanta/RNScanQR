import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {FONTS, COLORS} from '../../constants';

interface TextButtonProps {
  contentContainerStyle?: any;
  disabled?: boolean;
  label: string;
  labelStyle?: any;
  onPress: () => void;
}

const TextButton = ({
  contentContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
}: TextButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        ...contentContainerStyle,
      }}
      disabled={disabled}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={{color: COLORS.secondary, ...FONTS.h3, ...labelStyle}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
