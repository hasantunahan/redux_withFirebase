import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { CacheEnum, CacheList } from '../../../../core/constant/cache/cache_enum';
import { sharedPref } from '../../../../core/init/cache/cache';
import { signOutGoogle } from '../../../auth/login/manager/google_sign';
import { emailSignOut } from '../../../auth/register/manager/email_sign_up';
import { StackActions } from '@react-navigation/native';
import AppBar from '../../../_partial/header/appbar';
import { connect } from 'react-redux';
import ThemeProvider from '../../../../core/init/theme/theme_provider';
import { HomeStyle } from './style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';

const HomeView = (props) => {
  const colors = ThemeProvider(props.theme.colors)
  const styles = HomeStyle(colors)
  const navigation = useNavigation()


  return (
    <View style={styles.main}>
      <AppBar backgroundColor={colors.background} isBack={false} color={colors.text} leading={leading()} />
      {renderBody()}
    </View>
  );

  function renderBody() {
    return <View>
      <Text>{'Home'}</Text>
      <TouchableOpacity onPress={async () => await signOut()}>
        <Text>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  }

  function leading() {
    return <View style={styles.header_main}>
      <Image style={styles.header_logo} source={require('../../../../../asset/image/logo_dark.png')} />
      <TouchableOpacity onPress={() => console.log("hee")}>
        <Ionicons
          style={styles.icon}
          color={colors.text}
          name={'ellipsis-vertical-sharp'}
          size={20}
        />
      </TouchableOpacity>
    </View>
  }

  async function signOut() {
    var res = await sharedPref(CacheEnum.Get, CacheList.registerInfo);
    if (res.type == 'Google') {
      console.log('gggg');
      await signOutGoogle(
        item => console.log(item),
        err => console.log(err),
      ).then(() => {
        navigationReset();
      });
    } else {
      console.log('emaillllll');
      await emailSignOut(
        call => console.log(call),
        err => console.log(err),
      ).then(() => {
        navigationReset();
      });
    }
    // console.log(res);
  }

  function navigationReset() {
    navigation.dispatch(StackActions.replace('Login'));
  }
};

const mapStateToProps = (state) => {
  return {
    theme: state.base.theme
  }
}

export default connect(mapStateToProps)(HomeView);
