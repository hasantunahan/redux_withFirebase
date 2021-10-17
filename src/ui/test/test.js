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
import FirebaseFetchForList from './src/core/init/network/firebase_fetch_list';

const App = ({}) => {
  const [user, setUser] = React.useState([]);
  const [data, setData] = React.useState([]);
  const userRef = firestore().collection('Users');

  React.useEffect(() => {
   fetchData();
    /* fetchLiveData(Fire_Collections.user,data=> {
      console.log(data);
      setData(u=>[...u,data])
    }) */
  }, []);

  async function fetchData() {
    userRef.onSnapshot(snapshot => {
      let items = [];
      snapshot.forEach((item, index) => {
        items.push(item.data());
      });
      setUser(items);
     // console.log(items);
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
            FirebaseFetchForList(Fire_Collections.user).map((data,i)=>{
              return <Text key={i}>{data.name}</Text>
            })
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
