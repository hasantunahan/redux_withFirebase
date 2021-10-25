import React from 'react'
import { View, Image } from 'react-native';
const AppLogo = ({ isDark, width = 90, height = 130 }) => {
    return (
        <View>
            {isDark ? (
                <Image
                    style={{
                        width: width,
                        height: height,
                        resizeMode: 'cover'
                    }}
                    source={require('../../../../asset/image/logo_dark.png')}
                />
            ) : (
                <Image
                    style={{
                        width: width,
                        height: height,
                        resizeMode: 'cover'
                    }}
                    source={require('../../../../asset/image/logo_light.png')}
                />
            )}
        </View>
    );
}
export default AppLogo