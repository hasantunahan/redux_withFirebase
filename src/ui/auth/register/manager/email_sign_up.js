import auth from '@react-native-firebase/auth';
import { CacheEnum, CacheList } from '../../../../core/constant/cache/cache_enum';
import { sharedPref } from '../../../../core/init/cache/cache';
import { getLanguage } from '../../../../core/extension/lang';

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
          res(getLanguage().auth_create.success);
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
      if(response.user.emailVerified){
        res(getLanguage().login.success);
        sharedPref(CacheEnum.Merge, CacheList.registerInfo, {
          emailVerified: true,
          user: getUser(auth().currentUser),
          type: 'Email',
        });
      }else{
        warning(getLanguage().login.unverify)
      }
    })
    .catch(error => {
      err(getLanguage().login.auth_error.email_password);
    });
}

export async function emailSignOut(error, callback) {
  await auth()
    .signOut()
    .then(() => {
      callback(getLanguage().login.info.email_signout),
      sharedPref(CacheEnum.Remove, CacheList.registerInfo)
    })
    .catch(err => error(err));
}

async function sendEmail(verify, call) {
  await auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      console.log(
       getLanguage().login.verify_waiting
      );
    })
    .catch(() => {
      call(0);
    });
}

export async function forgotPasswordEmail(email,response,error){
     await auth().sendPasswordResetEmail(email).then((res)=>{
        response(getLanguage().login.send_link_success)
      }).catch(err=>{
        error(getLanguage().login.send_link_error)
      })
}

export async function userControl(verify) {
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
    err(getLanguage().register.error.email_already);
  }
  if (error.code === 'auth/invalid-email') {
    err(getLanguage().register.error.invalid_email);
  }
  if (error.code === 'auth/weak-password') {
    err(getLanguage().register.error.weak_password);
  }
}
