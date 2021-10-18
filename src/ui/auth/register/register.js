import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import BaseView from '../../../core/base/baseview';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import ThemeProvider from '../../../core/init/theme/theme_provider';
import { RegisterStyle } from './style/style';
import AppLogo from '../../_partial/logo/logo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableScale from 'react-native-touchable-scale';
import { APPLICATION_CONSTANT } from '../../../core/constant/app/applicationconstant';
import AppButtonOnlyText from '../../../core/components/button';

const RegisterScreen = (props) => {
  const [snackbar, setSnackbar] = React.useState({
    color: 'black',
    visible: false,
    message: ''
  })
  const navigation = useNavigation();
  const colors = ThemeProvider(props.theme.colors);
  const styles = RegisterStyle(colors);
  const dispatch = useDispatch();
  const [secure, setSecure] = React.useState(true);
  const [secureAgain, setSecureAgain] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [passwordAgain, setPasswordAgain] = React.useState('');
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false);

  return (
    <BaseView
      barStyle={props.theme.statusbar}
      isBack={false}
      headerHidden={true}
      backgroundColor={colors.background}
      statusColor={colors.background}
      screen={renderBody()}
    />
  );

  function renderBody() {
    return <View style={styles.main}>
      <ScrollView>
        <View style={styles.parent}>
          {renderLogo()}
          {renderFormElements()}
          {renderRegisterButton()}
          {renderHaveAccunt()}
        </View>
      </ScrollView>
    </View>
  }

  function renderLogo() {
    return <View style={{ alignItems: 'center', marginTop: 30 }}>
      <AppLogo isDark={props.theme.dark} />
    </View>
  }

  function renderFormElements() {
    return <View style={{ marginTop: 20 }}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={val => setEmail(val)}
        placeholder="enter username"
        keyboardType="email-address"
        placeholderTextColor={colors.border}
      />
      <View>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={val => setPassword(val)}
          placeholder="enter password"
          placeholderTextColor={colors.border}
          secureTextEntry={secure}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons style={{ position: 'absolute', right: 10, bottom: 13 }} color={colors.text} name={secure ? 'eye' : 'eye-off'} size={19} />
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.input}
          value={passwordAgain}
          onChangeText={val => setPasswordAgain(val)}
          placeholder="please enter password again"
          placeholderTextColor={colors.border}
          secureTextEntry={secure}
        />
        <TouchableOpacity onPress={() => setSecureAgain(!secureAgain)}>
          <Ionicons style={{ position: 'absolute', right: 10, bottom: 13 }} color={colors.text} name={secure ? 'eye' : 'eye-off'} size={19} />
        </TouchableOpacity>
      </View>
    </View>
  }

  function renderHaveAccunt() {
    return <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
      }}>
      <Text style={{ color: colors.text }}>
        I have an account, {''}
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{ alignItems: 'center' }}>
        <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  }

  function renderRegisterButton() {
    return <AppButtonOnlyText onPress={() => console.log("Register")} styles={styles.register} text={'Sign Up'} textColor={colors.text} />

  }

};
const mapStateToProps = (state) => {
  return {
    theme: state.base.theme
  }
}
export default connect(mapStateToProps)(RegisterScreen)
