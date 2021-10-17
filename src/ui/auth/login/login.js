import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import BaseView from '../../../core/base/baseview';
import { changeTheme } from '../../../redux/actions/base_actions';
import { darkTheme, lightTheme } from '../../../core/init/theme/apptheme';
import ThemeProvider from '../../../core/init/theme/theme_provider';
import { LoginStyle } from './style/style';
import { Button } from 'react-native-elements/dist/buttons/Button';
import TouchableScale from 'react-native-touchable-scale';
import { APPLICATION_CONSTANT } from '../../../core/constant/app/applicationconstant';


const LoginScreen = (props) => {
    const colors = ThemeProvider(props.theme.colors);
    const styles = LoginStyle(colors);
    const dispatch = useDispatch()
    const [secure, setSecure] = React.useState(true)
    const [password, setPassword] = React.useState('')
    return (
        <BaseView
            barStyle={props.theme.statusbar}
            headerHidden={true}
            statusColor={colors.background}
            screen={
                renderLogin()
            }
        />
    );

    function renderLogin() {
        return <View style={styles.main}>
            <TouchableOpacity onPress={() => dispatch(changeTheme(darkTheme))}>
                <Text style={{ color: colors.text }}>Change Theme</Text>
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.logo_view}>
                    {
                        props.theme.dark ? <Image style={styles.logo} source={require('../../../../asset/image/logo_dark.png')} />
                            : <Image style={styles.logo} source={require('../../../../asset/image/logo_light.png')} />
                    }
                </View>
                <View style={[styles.screen_padding, { marginTop: 40 }]}>
                    <TextInput
                        style={styles.input}
                        placeholder="enter username"
                        keyboardType="email-address"
                        placeholderTextColor={colors.border}
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={(val) => setPassword(val)}
                        placeholder="enter password"
                        placeholderTextColor={colors.border}
                        secureTextEntry={secure}
                    />

                    <TouchableScale style={{ 
                        alignItems: 'center',
                         marginVertical: 12, 
                         backgroundColor: colors.primary,
                          padding: 8,
                          borderRadius:3
                        
                        }} 
                          activeScale={APPLICATION_CONSTANT.SCALE}>
                        <Text style={{color : colors.text}}>Login</Text>
                    </TouchableScale>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10
                    }}>
                        <View style={{ width: '42%', height: 0.5, backgroundColor: colors.border }}>

                        </View>
                        <Text style={{ marginHorizontal: 8, color: colors.text }}>{'Ya da'}</Text>
                        <View style={{ width: '42%', height: 0.5, backgroundColor: colors.border }}>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    }
}
const mapStateToProps = (state) => {
    return {
        theme: state.base.theme
    }
}

export default connect(mapStateToProps)(LoginScreen)