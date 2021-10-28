import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {sharedPref} from '../../core/init/cache/cache';
import {CacheEnum, CacheList} from '../../core/constant/cache/cache_enum';
import {signOutGoogle} from '../auth/login/manager/google_sign';
import {emailSignOut} from '../auth/register/manager/email_sign_up';
import {useNavigation} from '@react-navigation/core';
import BaseView from '../../core/base/baseview';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {StackActions} from '@react-navigation/native';
import BottomBar from '../_partial/bottom/bottombar';
import ThemeProvider from '../../core/init/theme/theme_provider';
import store from '../../redux/store/store';
import {Caselist} from '../../redux/_caselist/caselist';
import {connect} from 'react-redux';
import {Bottomlist} from '../../core/constant/bottom/bottombar';
const Tests = props => {
  const navigation = useNavigation();
  const colors = store.getState(Caselist.theme).base.theme;
  const [screen,setScreen] = React.useState(1)
  console.log(test());

  function test() {
    const subscriber = auth().onAuthStateChanged(user =>
      console.log('onAuthStateChanged' + JSON.stringify(user)),
    );
    console.log(subscriber);
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
  return (
    <BaseView
      headerHidden={true}
      statusColor={'blue'}
      hiddenBottom={false}
      bottomData={Bottomlist}
      bottomBackgroundColor={props.theme.colors.change}
      backgroundColor={props.theme.colors.background}
      bottomColor={props.theme.colors.text}
      callScreen={data => setScreen(data)}
      screen={
        <View style={{flex: 1}}>
          <Text>test</Text>
          <Image
            style={{width: 60, height: 60}}
            source={{uri: auth().currentUser.photoURL}}
          />
          <Text>{screen== 1 ? 'Hasan' : 'Tunahan'}</Text>
          <TouchableOpacity onPress={async () => await signOut()}>
            <Text>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    theme: state.base.theme,
  };
};

export default connect(mapStateToProps)(Tests);
