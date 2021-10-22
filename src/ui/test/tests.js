import React from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import {sharedPref} from '../../core/init/cache/cache';
import {CacheEnum, CacheList} from '../../core/constant/cache/cache_enum';
import { signOutGoogle } from '../auth/login/manager/google_sign';
import { emailSignOut } from '../auth/register/manager/email_sign_up';
import { useNavigation } from '@react-navigation/core';
import BaseView from '../../core/base/baseview';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth  from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { StackActions } from '@react-navigation/native';

const Tests = ({}) => {
  const navigation = useNavigation()

  console.log(test());

  function test(){
    const subscriber = auth().onAuthStateChanged((user)=> console.log('onAuthStateChanged'+JSON.stringify(user)));
    console.log(subscriber);
  }
 
  async function signOut() {
    var res = await sharedPref(CacheEnum.Get,CacheList.registerInfo);
    if(res.type == 'Google'){
      console.log("gggg");
      await signOutGoogle((item)=>console.log(item),err=>console.log(err)).then(()=>{
        navigationReset()
      })

    }else{
     console.log('emaillllll');
      await emailSignOut(call=>console.log(call),err=>console.log(err)).then(()=>{
      navigationReset()
      })
    }
    // console.log(res);
  }

  function navigationReset(){
    navigation.dispatch(
      StackActions.replace('Login'))
  }
  return (
    <BaseView 
     screen={
      <View style={{flex: 1, backgroundColor: 'orange'}}>
      <Text>test</Text>
      <Image style={{width:60,height:60}} source={{uri : auth().currentUser.photoURL}} />
      <TouchableOpacity onPress={async ()=> await signOut()}>
        <Text>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
     }
    />
  );
};
export default Tests;
