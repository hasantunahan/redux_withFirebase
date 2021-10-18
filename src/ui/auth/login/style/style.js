import React from 'react';
import { StyleSheet } from 'react-native';
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
    login : {
      alignItems: 'center',
      marginVertical: 12,
      backgroundColor: color.primary,
      padding: 8,
      borderRadius: 3,
  },
  google :{
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: color.change,
    padding: 8,
    borderRadius: 3
},
textwithimage : {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
}
  });
