import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { CacheEnum, CacheList } from '../../../../core/constant/cache/cache_enum';
import CacheManager from '../../../../core/init/cache/cache';

export async function onGoogleButtonPress() {
  console.log(await GoogleSignin.isSignedIn());
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log(error);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log(error);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log(error);
    } else {
      // some other error happened
      console.log(error);
    }
  }
}


export async function isSign() {
  let login = await GoogleSignin.isSignedIn();
  return login;
}