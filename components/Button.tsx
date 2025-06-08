import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  textClassName = '',
  ...props
}) => {
  return (
    <Pressable
      className={`px-4 py-4 w-full rounded-2xl bg-white items-center justify-center ${className}`}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className={`text-black ${textClassName}`}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Button;
