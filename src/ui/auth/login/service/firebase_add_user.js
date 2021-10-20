import React from 'react'
import firestore from '@react-native-firebase/firestore';

export async function FirebaseAddData(collections, data, callback) {
    const userRef = firestore().collection(collections);
    await userRef.
        add(data)
        .then(() => {
            callback('Data added successfuly')
        });

}
