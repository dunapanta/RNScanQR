import React from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';
import { FONTS, COLORS } from "../constants";

interface MainButtonProps {
    contentContainerStyle?: any;
    disabled?: boolean;
    label: string;
    labelStyle?: any;
    onPress: () => void;
}

export const MainButton = ({
    contentContainerStyle,
    disabled,
    label,
    labelStyle,
    onPress
}: MainButtonProps) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                ...contentContainerStyle
            }}
            disabled={disabled}
            onPress={onPress}
        >
            <Text style={{ color: COLORS.secondary, ...FONTS.h3, ...labelStyle }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}