import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {CacheEnum, CacheList} from '../../../../core/constant/cache/cache_enum';
import {sharedPref} from '../../../../core/init/cache/cache';

export async function onGoogleButtonPress() {
  console.log(await GoogleSignin.isSignedIn());
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    sharedPref(CacheEnum.Set, CacheList.registerInfo, {
      emailVerified: true,
      user: userInfo.user,
      type: 'Google',
    });
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return {error: error};
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      return {error: error};
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      return {error: error};
    } else {
      // some other error happened
      return {error: error};
    }
  }
}

export async function isSign() {
  let login = await GoogleSignin.isSignedIn();
  return login;
}

export async function signOutGoogle(callback,error) {
  GoogleSignin.signOut()
    .then(()=>{callback('User sign out successfully'),sharedPref(CacheEnum.Remove, CacheList.registerInfo)})
    .catch(error("User didn't sign out"));
  
}
