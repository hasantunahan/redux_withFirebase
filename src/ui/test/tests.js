import React from 'react';
import {View, Text} from 'react-native';
import { sharedPref } from '../../core/init/cache/cache';
import { CacheEnum, CacheList } from '../../core/constant/cache/cache_enum';
const Tests = ({}) => {
  React.useEffect(() => {
     fetchdata()
  }, [])
  async function fetchdata(){
    let res = await sharedPref(CacheEnum.Get,CacheList.user,'')
   // console.log(res);
  }
  return (
    <View style={{flex:1,backgroundColor : 'orange'}}>
      <Text>test</Text>
    </View>
  );
};
export default Tests;
