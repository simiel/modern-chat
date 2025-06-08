import React from 'react';
import { Text as RNText, TextProps, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface TextComponentProps extends TextProps {
  children: React.ReactNode;
}

const Text: React.FC<TextComponentProps> = ({
  children,
  style,
  className,
  ...props
}: TextComponentProps) => {
  return (
    <View>
      <RNText
        // style={[{ fontSize: 16, color: '#000' }, style]}
        {...props}
        className={twMerge(`text-white text-base`, className)}
      >
        {children}
      </RNText>
    </View>
  );
};
export default Text;
