import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Touchable,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native'


const BottomBar = ({backgroundColor, data, color, call,selectscreen}) => {
  const navigation = useNavigation()
  const [select, setSelect] = React.useState(1);
  React.useEffect(() => {
      call(select);
  }, [select]);
  console.log('Selected' + select);

  function handleBackButtonClick() {
    if (select == 1) {
      BackHandler.exitApp()
    }else{
      setSelect(1)
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


  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const Tabs = ({isfocused, text, icon, onPress,focus}) => {
    return (
      <Animated.View style={{width: '20%'}}>
        <TouchableOpacity
          onPress={() => onPress()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            borderRadius: 8,
            justifyContent: 'center',
            opacity: fadeAnim,
          }}>
          <Ionicons color={color} name={isfocused ? focus : icon} size={24} />
        </TouchableOpacity>
      </Animated.View>
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
                setSelect(item.id),
                  Animated.timing(fadeAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 200,
                  }).start();
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
    zIndex: 99999,
  },
});
export default BottomBar;
