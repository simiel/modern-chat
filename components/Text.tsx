import React from 'react';
import { TextProps, Text as TextUI, View } from 'react-native';

interface TextComponentProps extends TextProps {
  children: React.ReactNode;
}

const Text: React.FC<TextComponentProps> = ({ children, style, ...props }) => {
  return (
    <View>
      <TextUI style={[{ fontSize: 16, color: '#000' }, style]} {...props}>
        {children}
      </TextUI>
    </View>
  );
};
export default Text;
