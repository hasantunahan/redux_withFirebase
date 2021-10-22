import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {CacheEnum, CacheList} from '../../../../core/constant/cache/cache_enum';
import {sharedPref} from '../../../../core/init/cache/cache';
import auth from '@react-native-firebase/auth';

export async function onGoogleButtonPress() {
  console.log(await GoogleSignin.isSignedIn());
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    await auth().signInWithCredential(googleCredential);
    console.log('====================================');
    console.log(userInfo.user);
    console.log('====================================');
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

export async function signOutGoogle(callback, error) {
await GoogleSignin.signOut()
    .then(() => {
       sharedPref(CacheEnum.Remove, CacheList.registerInfo).then(
         ()=>{
          callback('User sign out successfully'),
          auth().currentUser.delete()
         }
       );
    })
    .catch(error("User didn't sign out"));
}
