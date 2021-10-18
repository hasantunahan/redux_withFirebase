import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
const LoadingView = ({color}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator color={color} />
    </View>
  );
};
export default LoadingView;
