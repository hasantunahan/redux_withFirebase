import auth from '@react-native-firebase/auth';
export async function emailRegister(email, password, err, res, call, verify) {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            res('User account created & signed in!')
            call(1)
            auth()
                .currentUser.sendEmailVerification()
                .then(() => {
                    console.log('Waiting for verification. Check your email!\nYou can close this verification and came back later');
                    const unsubscribeOnUserChanged =
                        auth()
                            .onUserChanged(response => {
                                const unsubscribeSetInterval = setInterval(() => {
                                    auth().currentUser.reload();
                                }, 3000);
                                if (response.emailVerified) {
                                    verify(true)
                                    console.log(response.emailVerified);
                                    clearInterval(unsubscribeSetInterval);
                                    return unsubscribeOnUserChanged();
                                } else {
                                    console.log("false malesef");
                                    verify(false)
                                }
                            });
                })
                .catch(error => {
                    call(0)
                });
        })
        .catch(error => {
            call(0)
            if (error.code === 'auth/email-already-in-use') {
                err('That email address is already in use!')
            }
            if (error.code === 'auth/invalid-email') {
                err('That email address is invalid!')
            }
            if (error.code === 'auth/weak-password') {
                err('Password at least 6 characters')
            }
        });
}


export async function emailLogin(email, password, res) {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            res('Sign in succesfully')
        })
        .catch(error => {
            error('email or password is wrong')
        });
}


export async function emailSignOut(error, callback) {
    auth()
        .signOut()
        .then(
            (res) =>
                callback('User sign out')
        ).catch(err =>
            error(err)
        )
}