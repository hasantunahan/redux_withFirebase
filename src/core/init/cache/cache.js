import AsyncStorage from '@react-native-async-storage/async-storage';
import { CacheEnum } from '../../constant/cache/cache_enum';

export async function sharedPref(method, key, val) {
  if (method == CacheEnum.Get) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return { err: e }
    }
  } else {
    try {
      const jsonValue = JSON.stringify(val);
      await AsyncStorage.setItem(key, jsonValue)
      return {err : null}
    } catch (e) {
      return { err: e }
    }
  }
}