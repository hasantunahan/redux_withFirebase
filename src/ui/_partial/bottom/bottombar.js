import React from 'react';
import {View, StyleSheet, Animated, BackHandler} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableScale from 'react-native-touchable-scale';
import {APPLICATION_CONSTANT} from '../../../core/constant/app/applicationconstant';

const BottomBar = ({backgroundColor, data, color, call}) => {
  const [select, setSelect] = React.useState(1);
  React.useEffect(() => {
    call(select);
  }, [select]);

  function handleBackButtonClick() {
    if (select == 1) {
      BackHandler.exitApp();
    } else {
      setSelect(1);
    }
    return true;
  }

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [select]);

  const Tabs = ({isfocused, text, icon, onPress, focus}) => {
    return (
      <View style={{width: '20%'}}>
        <TouchableScale
          activeScale={APPLICATION_CONSTANT.SCALE}
          onPress={() => onPress()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            borderRadius: 8,
            justifyContent: 'center',
          }}>
          <Ionicons
            color={isfocused ? '#FF6060' : color}
            name={isfocused ? focus : icon}
            size={24}
          />
        </TouchableScale>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: backgroundColor ? backgroundColor : 'white',
          paddingHorizontal: 8,
          justifyContent: 'center',
          borderTopColor: color,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {data.map((item, index) => {
          return (
            <Tabs
              onPress={() => {
                setSelect(item.id);
              }}
              isfocused={item.id == select ? true : false}
              key={index}
              text={item.text}
              icon={item.icon}
              focus={item.iconfocus}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 58,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 0.2,
    left: 0,
    zIndex: 9997,
  },
});
export default BottomBar;
