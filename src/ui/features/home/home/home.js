import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import AppBar from '../../../_partial/header/appbar';
import {connect} from 'react-redux';
import ThemeProvider from '../../../../core/init/theme/theme_provider';
import {HomeStyle} from './style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
import CustomBottomSheet from '../../../_partial/bottomsheet/bottomsheet';
import MenuBottomSheet from '../../../settings/menu/menu_bottom';

const HomeView = props => {
  const colors = ThemeProvider(props.theme.colors);
  const styles = HomeStyle(colors);
  const navigation = useNavigation();
  const modalizeRef = React.createRef(null);
  console.log(colors);
  return (
    <View style={styles.main}>
      <AppBar
        backgroundColor={colors.background}
        isBack={false}
        color={colors.text}
        leading={leading()}
      />
      {renderBody()}
      <CustomBottomSheet
        colors={colors}
        size={350}
        items={<MenuBottomSheet colors={colors} />}
        ref={modalizeRef}
      />
    </View>
  );

  function renderBody() {
    return (
      <View>
        <Text>{'Home'}</Text>
      </View>
    );
  }

  function leading() {
    return (
      <View style={styles.header_main}>
        <Image
          style={styles.header_logo}
          source={require('../../../../../asset/image/logo_dark.png')}
        />
        <TouchableOpacity onPress={() => modalizeRef.current?.open()}>
          <Ionicons
            style={styles.icon}
            color={colors.text}
            name={'ellipsis-vertical-sharp'}
            size={20}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    theme: state.base.theme,
  };
};

export default connect(mapStateToProps)(HomeView);
