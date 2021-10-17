import React from 'react'
import firestore from '@react-native-firebase/firestore';


const FirebaseFetchForList = ({ collections }) => {
  const userRef = firestore().collection('Users');
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    function fetchData() {
      userRef.onSnapshot(snapshot => {
        let items = [];
        snapshot.forEach((item, index) => {
          items.push(item.data());
        });
        setData(items)
      });
    }
    fetchData()
  },[])

  return data;
}
export default FirebaseFetchForList;