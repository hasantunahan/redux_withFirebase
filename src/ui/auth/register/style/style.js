import React from 'react';
import { StyleSheet } from 'react-native';

export const RegisterStyle = (color) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: color.background
    },
    input: {
      height: 40,
      borderWidth: 0.7,
      padding: 10,
      borderRadius:3,
      marginVertical:5,
      borderColor : color.border,
      color : color.text
    },
    parent :{
        paddingHorizontal :12
    },
    register : {
      alignItems: 'center',
      marginVertical: 12,
      backgroundColor: color.primary,
      padding: 8,
      borderRadius: 3,
  },
  });
