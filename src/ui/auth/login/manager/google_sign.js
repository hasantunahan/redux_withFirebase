import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { CacheEnum, CacheList } from '../../../../core/constant/cache/cache_enum';
import { sharedPref } from '../../../../core/init/cache/cache';
import auth from '@react-native-firebase/auth';
import { getLanguage } from '../../../../core/extension/lang';

export async function onGoogleButtonPress() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    await auth().signInWithCredential(googleCredential);
    sharedPref(CacheEnum.Set, CacheList.registerInfo, {
      emailVerified: true,
      user: {
        id: userInfo.user.id,
        name: userInfo.user.name,
        photo: userInfo.user.photo,
        email: userInfo.user.email,
      },
      type: 'Google',
    });
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return { error: error };
    } else if (error.code === statusCodes.IN_PROGRESS) {
      return { error: error };
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      return { error: error };
    } else {
      return { error: error };
    }
  }
}

export async function isSign() {
  let login = await GoogleSignin.isSignedIn();
  return login;
}

export async function signOutGoogle(callback, error) {
  await GoogleSignin.signOut()
    .then(() => {
      sharedPref(CacheEnum.Remove, CacheList.registerInfo).then(
        () => {
          callback(getLanguage().login.info.google_signout),
            auth().currentUser.delete()
        }
      );
    })
    .catch(error(getLanguage().login.auth_error.sign_out));
}
