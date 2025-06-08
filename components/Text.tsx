import { cn } from '@/utils/cn';
import React from 'react';
import { Text as RNText, TextProps, View } from 'react-native';

interface TextComponentProps extends TextProps {
  children: React.ReactNode;
}

const Text: React.FC<TextComponentProps> = ({
  children,
  style,
  className = '',
  ...props
}: TextComponentProps) => {
  return (
    <View>
      <RNText
        // style={[{ fontSize: 16, color: '#000' }, style]}
        {...props}
        className={cn('text-base text-white', className)}
      >
        {children}
      </RNText>
    </View>
  );
};
export default Text;
