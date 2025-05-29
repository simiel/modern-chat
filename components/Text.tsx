import { cn } from '@/utils/cn';
import React from 'react';
import { Text, TextProps, View } from 'react-native';

interface TextComponentProps extends TextProps {
  children: React.ReactNode;
}

const TextUI: React.FC<TextComponentProps> = ({ children, style, className = '', ...props }) => {
  return (
    <View>
      <Text
        // style={[{ fontSize: 16, color: '#000' }, style]}
        {...props}
        className={cn('text-base text-black', className)}
      >
        {children}
      </Text>
    </View>
  );
};
export default TextUI;
