import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';


export async function onGoogleButtonPress() {
  console.log(await GoogleSignin.isSignedIn());
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return { error: error }
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      return { error: error }
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      return { error: error }
    } else {
      // some other error happened
      return { error: error }
    }
  }
}

export async function isSign() {
  let login = await GoogleSignin.isSignedIn();
  return login;
}


export async function signOutGoogle(callback) {
  GoogleSignin.signOut()
    .then(
      callback('User sign out successfully')
    ).catch(
      error('User didn\'t sign out')
    )
}