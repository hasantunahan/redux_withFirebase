import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import BaseView from '../../../core/base/baseview';
import ThemeProvider from '../../../core/init/theme/theme_provider';
import { CacheEnum, CacheList } from '../../../core/constant/cache/cache_enum';
import { sharedGetAllKey, sharedPref } from '../../../core/init/cache/cache';
import SplashManager from './manager/splashmanager';

const SplashView = props => {
  const manage = SplashManager()
  const navigation = useNavigation();
  const [open, setOpen] = React.useState(true);
  const colors = ThemeProvider(props.theme.colors);

  React.useEffect(() => {
    didHaveData();
  }, []);

  return (
    <BaseView
      headerHidden={true}
      barStyle={props.theme.statusbar}
      backgroundColor={colors.background}
      statusColor={colors.background}
      screen={renderBody()}
    />
  );

  function renderBody() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {props.theme.dark ? (
          <Image
            style={{ width: 100, height: 40 }}
            source={require('../../../../asset/image/logo_dark.png')}
          />
        ) : (
          <Image
            style={{ width: 100, height: 40 }}
            source={require('../../../../asset/image/logo_light.png')}
          />
        )}
        {open && (
          <View style={{ marginTop: 15 }}>
            <Text style={{ color: colors.text, marginTop: 15 }}>
              {props.language.loading}
            </Text>
          </View>
        )}
      </View>
    );
  }

  async function didHaveData() {
    let data = await sharedPref(CacheEnum.Get, CacheList.registerInfo);
    if (data == null) {
      goPage('Login');
    } else {
      if (!data.emailVerified) {
        goPage('Register', { email: data.user.email, type: 1 });
      } else {
        goPage('Test');
      }
    }
  }

  function goPage(page, args) {
    setOpen(true);
    setTimeout(() => {
      navigation.navigate(page, args);
    }, 1500);
  }
};

const mapStateToProps = state => {
  return {
    theme: state.base.theme,
    language: state.base.language
  };
};

export default connect(mapStateToProps)(SplashView);
