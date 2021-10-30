import React from 'react';
import {Modalize} from 'react-native-modalize';
import {View, Text} from 'react-native';

const CustomBottomSheet = React.forwardRef((props, ref) => (
  <Modalize
    ref={ref}
    modalStyle={{
      backgroundColor: props.colors.card,
      shadowColor: props.colors.text,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    }}
    overlayStyle={{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }}
    useNativeDriver={true}
    scrollViewProps={{showsVerticalScrollIndicator: false}}
    snapPoint={props.size}
    HeaderComponent={
      <View style={{width: '100%'}}>
        <View
          style={{
            width: 50,
            height: 5,
            borderRadius: 3,
            backgroundColor: 'gray',
            marginHorizontal: '45%',
            marginTop: 8,
          }}></View>
      </View>
    }
    withHandle={false}>
    {props.items}
  </Modalize>
));
export default CustomBottomSheet;
