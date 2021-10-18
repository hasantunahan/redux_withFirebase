import React from 'react'
import { View, Text } from 'react-native';
import store from '../../../redux/store/store';
import { Caselist } from '../../../redux/_caselist/caselist';
const DividerWithText = ({ text }) => {
    const colors = store.getState(Caselist.theme).base.theme.colors
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
            }}>
            <View
                style={{
                    width: '42%',
                    height: 0.5,
                    backgroundColor: colors.border,
                }}></View>
            <Text style={{ marginHorizontal: 10, color: colors.text }}>
                {text ?? 'or'}
            </Text>

            <View
                style={{
                    width: '42%',
                    height: 0.5,
                    backgroundColor: colors.border,
                }}></View>
        </View>
    );
}
export default DividerWithText