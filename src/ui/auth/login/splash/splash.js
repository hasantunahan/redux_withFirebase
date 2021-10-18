import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, Image} from 'react-native';
import {color} from 'react-native-elements/dist/helpers';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import BaseView from '../../../../core/base/baseview';
import ThemeProvider from '../../../../core/init/theme/theme_provider';
import { CacheEnum, CacheList } from '../../../../core/constant/cache/cache_enum';
import { sharedPref } from '../../../../core/init/cache/cache';

const SplashView = props => {
  const navigation = useNavigation();
  const [open, setOpen] = React.useState(false);
  const colors = ThemeProvider(props.theme.colors);
  React.useEffect(() => {
    cacheControl()
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {props.theme.dark ? (
          <Image
            style={{width: 100, height: 40}}
            source={require('../../../../../asset/image/logo_dark.png')}
          />
        ) : (
          <Image
            style={{width: 100, height: 40}}
            source={require('../../../../../asset/image/logo_light.png')}
          />
        )}
        {open && (
          <View style={{marginTop: 15}}>
            <ActivityIndicator color={colors.text} />
            <Text style={{color: colors.text, marginTop: 15}}>Loading</Text>
          </View>
        )}
      </View>
    );
  }

  async function cacheControl(){
    let res = await sharedPref(CacheEnum.Get,CacheList.user,'')
    if(res == null){
      goPage('Login')
    }else{
      setTimeout(() => {
        isSign().then(res => {
          if (res == true) {
            goPage('Test');
          } else {
            goPage('Login');
          }
        });
      }, 1500);
    }
  }

  function goPage(page) {
    setOpen(true);
    setTimeout(() => {
      navigation.navigate(page);
    }, 1500);
  }

  async function isSign() {
    let login = await GoogleSignin.isSignedIn();
    return login;
  }

};

const mapStateToProps = state => {
  return {
    theme: state.base.theme,
  };
};

export default connect(mapStateToProps)(SplashView);
