import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import BaseView from '../../../core/base/baseview';
import { changeTheme } from '../../../redux/actions/base_actions';
import { darkTheme, lightTheme } from '../../../core/init/theme/apptheme';
import ThemeProvider from '../../../core/init/theme/theme_provider';
import { LoginStyle } from './style/style';

const LoginScreen = (props) => {
    const colors = ThemeProvider(props.theme.colors);
    const dispatch = useDispatch()
    return (
        <BaseView
            barStyle='light-content'
            headerHidden={true}
            statusColor={colors.primary}
            screen={
                <View style={LoginStyle(colors).main}>
                    <TouchableOpacity onPress={() => dispatch(changeTheme(darkTheme))}>
                        <Text>Change Theme</Text>
                    </TouchableOpacity>
                </View>
            }
        />
    );
}
const mapStateToProps = (state) => {
    return {
        theme: state.base.theme
    }
}

export default connect(mapStateToProps)(LoginScreen)