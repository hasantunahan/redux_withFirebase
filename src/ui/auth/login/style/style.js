import React from 'react';
import { StyleSheet } from 'react-native';
import { getWidth } from '../../../../core/extension/dimension';
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
    textfield: {
      backgroundColor: color.card,
    },
    input: {
      height: 40,
      borderWidth: 0.7,
      padding: 10,
      borderRadius: 3,
      marginVertical: 5,
      borderColor: color.border,
      color: color.text
    },
    login: {
      alignItems: 'center',
      marginVertical: 12,
      backgroundColor: color.primary,
      padding: 8,
      borderRadius: 3,
    },
    google: {
      alignItems: 'center',
      marginVertical: 12,
      backgroundColor: color.change,
      padding: 8,
      borderRadius: 3
    },
    textwithimage: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center',
    },
    overlay_main: {
      backgroundColor: color.background
    },
    overlay_view: {
      position: 'absolute',
      right: 12,
      top: 40
    },
    overlay_back: {
      width: getWidth() * .9,
      alignSelf: 'center',
      marginTop: 60
    },
    overlay_bigIcon: {
      alignSelf: 'center',
      width: 80,
      height: 80,
      marginVertical: 12,
      resizeMode: 'contain'
    },
    overlay_title: {
      marginBottom: 12,
      textAlign: 'center',
      color: color.text
    },
    overlay_button: {
      backgroundColor: color.primary,
      padding: 8,
      alignItems: 'center',
      marginVertical: 8,
      borderRadius: 3
    },
    overlay_info: {
      marginVertical: 4,
      color: color.text
    },
    forgot_view: {
      alignSelf: 'flex-end',
      marginVertical: 4
    },
    forgot_text: {
      color: color.primary
    },
    signup_view: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    sign_up_prefix: {
      color: color.text
    },
    signup_focus_text: {
      color: color.primary,
      fontWeight: 'bold'
    },
    align_center: {
      alignItems: 'center'
    },
    google_button: {
      alignItems: 'center',
      marginVertical: 12,
      backgroundColor: color.change,
      padding: 8,
      borderRadius: 3,
    },
    google_ico: {
      width: 20,
      height: 20,
      marginLeft: 10
    },
    google_text: {
      color: color.text,
      marginLeft: 10
    },
    eye :{
      position: 'absolute', 
      right: 10, 
      bottom: 13 
    }, 
  });
