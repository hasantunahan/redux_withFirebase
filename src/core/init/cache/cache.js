import AsyncStorage from '@react-native-async-storage/async-storage';
import {CacheEnum} from '../../constant/cache/cache_enum';

export async function sharedPref(method, key, val) {
  if (method == CacheEnum.Get) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return {err: e};
    }
  } else if (method == CacheEnum.Set) {
    try {
      const jsonValue = JSON.stringify(val);
      await AsyncStorage.setItem(key, jsonValue);
      return {err: null};
    } catch (e) {
      return {err: e};
    }
  } else if (method == CacheEnum.Remove) {
    try {
      await AsyncStorage.removeItem(key);
      return {err: null};
    } catch (e) {
      return {err: e};
    }
  } else if (method == CacheEnum.Merge) {
    try {
      const jsonValue = JSON.stringify(val);
      await AsyncStorage.mergeItem(key, jsonValue);
    } catch (e) {
      return {err: e};
    }
  }
}

export async function sharedGetAllKey() {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    return {err: e};
  }
}

export async function sharedClearAll() {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    return false;
  }
}
