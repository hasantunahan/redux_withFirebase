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
      borderRadius: 3,
      marginVertical: 5,
      borderColor: color.border,
      color: color.text
    },
    parent: {
      paddingHorizontal: 12
    },
    register: {
      alignItems: 'center',
      marginVertical: 12,
      backgroundColor: color.primary,
      padding: 8,
      borderRadius: 3,
    },
    verify_body: {
      justifyContent: 'center',
      marginTop: 40
    },
    verify_h_padding: {
      paddingHorizontal: 12
    },
    verify_img: {
      alignSelf: 'center',
      width: 120,
      height: 120
    },
    verify_title: {
      marginBottom: 2,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18,
      color: color.text,
    },
    verify_email: {
      color: color.primary,
      fontWeight: '500',
      textAlign: 'center',
    },
    verify_dont: {
      fontWeight: '400',
      marginTop: 20,
      width: '80%',
      alignSelf: 'center',
      color: color.text,
      textAlign: 'center',
    },
    verify_direc_view: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    verify_pre_text: {
      marginRight: 5,
      color: color.text
    },
    verify_focus_text: {
      color: color.primary,
      fontWeight: 'bold'
    },
    logo: {
      alignItems: 'center',
      marginTop: 30
    },
    form_info: {
      color: color.text,
      opacity: 0.7
    },
    choose_img: {
      width: 75,
      height: 75,
      borderRadius: 5
    },
    avatar_view: {
      marginRight: 10,
      marginTop: 10
    },
    eye: {
      position: 'absolute',
      right: 10, bottom:
        13
    },
    have_account: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    text_button: {
      color: color.primary,
      fontWeight: 'bold'
    },
    align_center: {
      alignItems: 'center'
    }
  });
