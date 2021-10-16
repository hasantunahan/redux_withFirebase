import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Appbar} from 'react-native-paper';
import BaseView from './src/core/base/baseview';
import {Fire_Collections} from './src/core/constant/firebase_collection/firebase';
import {fetchLiveData} from './src/core/init/network/firebase';

const App = ({}) => {
  const [user, setUser] = React.useState([]);
  const userRef = firestore().collection('Users');

  React.useEffect(() => {
    fetchData();
    
  }, []);

  async function fetchData() {
    userRef.onSnapshot(snapshot => {
      let items = [];
      snapshot.forEach((item, index) => {
        items.push(item.data());
      });
      setUser(items);
      console.log(items);
    });
  }

  async function addData() {
    await firestore()
      .collection('Users')
      .add({
        name: 'Ömer',
        phone: '8889996564',
      })
      .then(() => {
        console.log('User added!');
      });
  }

  return (
    <BaseView
      headerActions={[
        <Appbar.Action
          color={'white'}
          key={Math.random()}
          icon="delete"
          onPress={() => console.log('delete')}
        />,
      ]}
      screen={
        <ScrollView>
          {
            
          }
          <TouchableOpacity onPress={() => addData()}>
            <Text>add</Text>
          </TouchableOpacity>
        </ScrollView>
      }
    />
  );
};
export default App;
