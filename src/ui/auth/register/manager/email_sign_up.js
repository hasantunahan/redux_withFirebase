import auth from '@react-native-firebase/auth';
import { CacheEnum, CacheList } from '../../../../core/constant/cache/cache_enum';
import { sharedPref } from '../../../../core/init/cache/cache';

function getUser(user) {
  return {
    id: user.uid,
    name: user.displayName,
    photo: user.photoURL,
    email: user.email,
  }
}

export async function emailRegister(
  email,
  password,
  err,
  res,
  call,
  verify,
  name,
  url
) {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      auth()
        .currentUser.updateProfile({
          displayName: name,
          photoURL: url,
        })
        .then(() => {
          res('User account created & signed in!');
          call(1);
          sharedPref(CacheEnum.Set, CacheList.registerInfo, {
            emailVerified: false,
            user: getUser(auth().currentUser),
            type: 'Email',
          });
          sendEmail(verify, call);
        });
    })
    .catch(error => {
      call(0);
      registerError(error, err);
    });
}

export async function emailLogin(email, password, res, err,warning) {
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response);
      if(response.user.emailVerified){
        res('Sign in succesfully');
        sharedPref(CacheEnum.Merge, CacheList.registerInfo, {
          emailVerified: true,
          user: getUser(auth().currentUser),
          type: 'Email',
        });
      }else{
        warning('Unverified email,check your email address')
      }
    })
    .catch(error => {
      err('email or password is wrong');
    });
}

export async function emailSignOut(error, callback) {
  await auth()
    .signOut()
    .then(() => {
      callback('User sign out email'),
      sharedPref(CacheEnum.Remove, CacheList.registerInfo)
    })
    .catch(err => error(err));
}

async function sendEmail(verify, call) {
  await auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      console.log(
        'Waiting for verification. Check your email!\nYou can close this verification and came back later',
      );
    })
    .catch(() => {
      call(0);
    });
}

export async function forgotPasswordEmail(email,response,error){
     await auth().sendPasswordResetEmail(email).then((res)=>{
        response('Send link to email successfuly')
      }).catch(err=>{
        error('Warning! Didn\'t send link')
      })
}

export async function userControl(verify) {
    console.log('res içerde');
    if(auth().currentUser != null){
      auth().currentUser.reload().then(()=>{
        auth().onAuthStateChanged((user)=> {
          if(user != null){
            if (user.emailVerified) {
              verify(true);
              sharedPref(CacheEnum.Merge, CacheList.registerInfo, {
                emailVerified: true,
                user: getUser(auth().currentUser),
                type: 'Email',
              });
            }else{
              verify(false)
            }
          }else{
            verify(false)
          }
        });
      })
    }

    /* 
    auth().onUserChanged(response => {
      console.log('====================================');
      console.log('onuserchange :');
      console.log('====================================');
      if (response != null) {
        if (auth().currentUser != null) {
          auth().currentUser.reload();
          if (response.emailVerified) {
            verify(true);
            sharedPref(CacheEnum.Merge, CacheList.registerInfo, {
              emailVerified: true,
              user: getUser(auth().currentUser),
              type: 'Email',
            });
          }
        } else {
          verify(false)
        }
      } else {
        verify(false)
      }
    }); */
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
