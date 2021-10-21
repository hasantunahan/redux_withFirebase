import auth from '@react-native-firebase/auth';
import { CacheEnum, CacheList } from '../../../../core/constant/cache/cache_enum';
import { sharedPref } from '../../../../core/init/cache/cache';

export async function emailRegister(email, password, err, res, call, verify) {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      res('User account created & signed in!');
      call(1);
      sharedPref(CacheEnum.Set, CacheList.registerInfo, {
        emailVerified: false,
        user: auth().currentUser,
        type: 'Email',
      });
      sendEmail(verify, call);
    })
    .catch(error => {
      call(0);
      registerError(error, err);
    });
}

export async function emailLogin(email, password, res, err) {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      res('Sign in succesfully');
      sharedPref(CacheEnum.Merge, CacheList.registerInfo, {
        emailVerified: true,
        user: auth().currentUser,
        type: 'Email',
      });
    })
    .catch(error => {
      err('email or password is wrong');
    });
}

export async function emailSignOut(error, callback) {
  auth()
    .signOut()
    .then(() => {
      callback('User sign out'),
        sharedPref(CacheEnum.Remove, CacheList.registerInfo)
    })
    .catch(err => error(err));
}

async function sendEmail(verify, call) {
  auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      console.log(
        'Waiting for verification. Check your email!\nYou can close this verification and came back later',
      );
      userControl(verify);
    })
    .catch(() => {
      call(0);
    });
}

export function userControl(verify) {
  const unsubscribeOnUserChanged = auth().onUserChanged(response => {
    if (response != null) {
      const unsubscribeSetInterval = setInterval(() => {
        if (auth().currentUser != null) {
          auth().currentUser.reload();
        }
      }, 3000);
      if (response.emailVerified) {
        verify(true);
        sharedPref(CacheEnum.Merge, CacheList.registerInfo, {
          emailVerified: true,
          user: auth().currentUser,
          type: 'Email',
        });
        console.log(response.emailVerified);
        clearInterval(unsubscribeSetInterval);
        return unsubscribeOnUserChanged();
      } else {
        verify(false);
      }
    }
  });
}

function registerError(error, err) {
  if (error.code === 'auth/email-already-in-use') {
    err('That email address is already in use!');
  }
  if (error.code === 'auth/invalid-email') {
    err('That email address is invalid!');
  }
  if (error.code === 'auth/weak-password') {
    err('Password at least 6 characters');
  }
}
