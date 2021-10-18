import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';

export const LoginStyle = (color) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: color.background
    },
    logo: {
      width: 120,
      height: 50,
      resizeMode: 'cover'
    },
    logo_view: {
      marginTop: 50,
      alignItems: 'center'
    },
    screen_padding: {
      paddingHorizontal: 12
    },
    screen_top_margin: {
      marginTop: 20
    },
    textfield :{
      backgroundColor : color.card,
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
  });
