import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import { CacheEnum, CacheList } from '../../../../core/constant/cache/cache_enum';
import { sharedPref } from '../../../../core/init/cache/cache';
import { signOutGoogle } from '../../../auth/login/manager/google_sign';
import { emailSignOut } from '../../../auth/register/manager/email_sign_up';
import {StackActions} from '@react-navigation/native';

const HomeView = () => {
  const navigation = useNavigation()
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
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{'Home'}</Text>
      <TouchableOpacity onPress={async () => await signOut()}>
            <Text>Çıkış Yap</Text>
          </TouchableOpacity>
    </View>
  );
};
export default HomeView;
