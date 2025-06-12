import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps extends PressableProps {
  children?: React.ReactNode;
  className?: string;
  textStyle?: TextStyle;
  style?: PressableProps['style'];
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const { style, textStyle, ...rest } = props;
  return (
    <Pressable
      style={[
        {
          backgroundColor: '#fff', // Black background
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#000', // White border
        },
        style as ViewStyle,
      ]}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text style={StyleSheet.flatten([{}, textStyle])}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Button;
