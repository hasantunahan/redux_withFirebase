import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {CacheEnum} from '../../constant/cache/cache_enum';

const CacheManager = (method, key, val) => {
  const [data, setData] = React.useState(null);
  const [res, setRes] = React.useState({});
  React.useEffect(async () => {
    async function setProcees() {
      if (method == CacheEnum.Get) {
        try {
          const jsonValue = await AsyncStorage.getItem(key);
          setData(jsonValue != null ? JSON.parse(jsonValue) : null);
        } catch (e) {
          // error reading value
        }
      } else {
        try {
          const jsonValue = JSON.stringify(val);
          let response = await AsyncStorage.setItem(key, jsonValue);
          setRes(response);
        } catch (e) {
          // saving error
        }
      }
    }
    await setProcees();
  }, []);

  return data != null ? data : res;
};
export default CacheManager;
