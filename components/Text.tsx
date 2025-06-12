import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';

interface TextComponentProps extends TextProps {
  children: React.ReactNode;
}

const Text: React.FC<TextComponentProps> = ({ children, ...props }: TextComponentProps) => {
  const { style, ...rest } = props;
  return (
    <RNText
      {...rest}
      style={StyleSheet.flatten([{ color: '#fff', fontSize: 16 }, style])} // Default styles
    >
      {children}
    </RNText>
  );
};
export default Text;
