import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomBar = ({backgroundColor, data, color, call}) => {
  const [select, setSelect] = React.useState(1);
  React.useEffect(() => {
    call(select);
  }, [select]);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const Tabs = ({isfocused, text, icon, onPress}) => {
    return (
      <Animated.View style={{width: '25%'}}>
        <TouchableOpacity
          onPress={() => onPress()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            backgroundColor: isfocused && '#FF6060',
            borderRadius: 8,
            justifyContent: 'center',
            opacity: fadeAnim,
          }}>
          <Ionicons color={isfocused ? 'white' : color} name={icon} size={20} />
          {isfocused && (
            <Text
              style={{marginHorizontal: 4, color: isfocused ? 'white' : color}}>
              {text}
            </Text>
          )}
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
