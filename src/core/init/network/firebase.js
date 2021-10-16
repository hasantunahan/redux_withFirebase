import firestore from '@react-native-firebase/firestore';
import React from 'react';

export function fetchLiveData(collection, data) {
  const userRef = firestore().collection(collection);
  userRef.onSnapshot(snapshot => {
    let items = [];
    snapshot.forEach((item, index) => {
      items.push({
        id: item.id,
        data: item.data(),
      });
      data(items);
    });
  });
}
