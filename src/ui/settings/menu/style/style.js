import {StyleSheet} from 'react-native';

export const MenuStyle = color =>
  StyleSheet.create({
    main: {
      width: '100%',
      paddingTop: 15,
    },
    menu_left_view: {
      justifyContent: 'center',
      marginRight: 4,
    },
    menu_right_view: {
      justifyContent: 'center',
    },
    menu_items: {
      marginHorizontal: 12,
    },
    title: {
      color: color.text,
    },
  });
