import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export default function Input(props: TextInputProps) {
  const { style, ...rest } = props;

  return (
    <TextInput
      {...rest}
      style={StyleSheet.flatten([
        {
          color: '#fff',
          fontSize: 16,
        },
        style,
      ])}
      placeholderTextColor="#888" // Placeholder color
    />
  );
}
