import React from 'react';
import { View, Text } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { APPLICATION_CONSTANT } from '../constant/app/applicationconstant';
const AppButtonOnlyText = ({ onPress, styles, text, textColor }) => {
    return (
        <TouchableScale
            onPress={() => onPress()}
            style={styles}
            activeScale={APPLICATION_CONSTANT.SCALE}>
            <Text style={{ color: textColor ?? 'black' }}>{text ?? 'Button'}</Text>
        </TouchableScale>
    );
}
export default AppButtonOnlyText