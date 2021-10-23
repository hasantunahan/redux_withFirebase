import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  StatusBar,
  SegmentedControlIOSBase,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import BaseView from '../../../core/base/baseview';
import ThemeProvider from '../../../core/init/theme/theme_provider';
import { LoginStyle } from './style/style';
import TouchableScale from 'react-native-touchable-scale';
import { APPLICATION_CONSTANT } from '../../../core/constant/app/applicationconstant';
import { onGoogleButtonPress } from './manager/google_sign';
import { useNavigation } from '@react-navigation/core';
import { sharedPref } from '../../../core/init/cache/cache';
import { CacheEnum, CacheList } from '../../../core/constant/cache/cache_enum';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DividerWithText from '../../_partial/divider/divider_with_text';
import CustomSnackBar from '../../_partial/snackbar/snackbar';
import { changeLanguage, changeTheme } from '../../../redux/actions/base_actions';
import { darkTheme } from '../../../core/init/theme/apptheme';
import AppLogo from '../../_partial/logo/logo';
import AppButtonOnlyText from '../../../core/components/button';
import { emailLogin, forgotPasswordEmail } from '../register/manager/email_sign_up';
import { Icon, Overlay, Text } from 'react-native-elements';
import { getWidth } from '../../../core/extension/dimension';
import { tr_label } from '../../../core/init/lang/tr-Tr';
import { getLanguage } from '../../../core/extension/lang';

const LoginScreen = props => {
  const [snackbar, setSnackbar] = React.useState({
    color: 'black',
    visible: false,
    message: '',
  });
  const navigation = useNavigation();
  const colors = ThemeProvider(props.theme.colors);
  const styles = LoginStyle(colors);
  const dispatch = useDispatch();
  const [secure, setSecure] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [modalEmail, setModalEmail] = React.useState('')

  const toggleOverlay = () => {
    setModal(!modal)
  }

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
  
  async function themesChanges(){
    await sharedPref(CacheEnum.Merge,CacheList.theme,{
       theme :'dark'
    }).then(()=>{
      dispatch(changeTheme(darkTheme))      
    })
  }

  async function languagesChanges(){
    await sharedPref(CacheEnum.Merge,CacheList.lang,{
      lang : 'tr'
   }).then(()=>{
    dispatch(changeLanguage(tr_label))
   })
  }

  function renderLogin() {
    return (
      <View style={styles.main}>
        <TouchableOpacity onPress={async () => await themesChanges()}>
          <Text style={{ color: colors.text }}>Change Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => await languagesChanges()}>
          <Text style={{ color: colors.text }}>TR</Text>
        </TouchableOpacity>
        <ScrollView>
          {renderLogo()}
          <View style={[styles.screen_padding, { marginTop: 40 }]}>
            {renderFormElements()}
            {renderForgotPassword()}
            {renderLoginButton()}
            <DividerWithText text={getLanguage().or} />
            {renderGoogleButton()}
            {renderAccountGoSignUp()}
            {renderLoadingBottom()}
            <Overlay overlayStyle={{ backgroundColor: colors.background }} fullScreen isVisible={modal} onBackdropPress={toggleOverlay}>
              <View style={{ position: 'absolute', right: 12, top: 40 }}>
                <Icon
                  name='close'
                  type='ionicon'
                  color={colors.text}
                  onPress={toggleOverlay}
                />
              </View>
              {renderForgotModal()}
            </Overlay>
          </View>
        </ScrollView>
        <CustomSnackBar
          text={snackbar.message}
          backgroundColor={snackbar.color}
          isDismiss={snackbar.visible}
        />
      </View>
    );
  }




  async function signGoogle() {
    setLoading(true);
    await onGoogleButtonPress().then(async val => {
      if (val.error == null) {
        setLoading(false);
        await sharedPref(CacheEnum.Set, CacheList.user, val);
        navigation.navigate('Test');
        clearText()
      } else {
        setLoading(false);
        messageBar(colors.warning,getLanguage().login.auth_error.login_canceled);
        clearText()
      }
    });
  }

  async function sendControl(){
    if(modalEmail != null && modalEmail != ''){
        await forgotPasswordEmail(modalEmail,res=>{
            setModal(false),
            setTimeout(() => {
               messageBar(colors.success,res)
            }, 200);
           
        },err=> {
          setModal(false),
            setTimeout(() => {
               messageBar(colors.error,err)
            }, 200);
        }).then(()=>{
          setModalEmail('')
        })
    }else{
        console.log("email is required");
    }
  }

  function renderForgotModal() {
    return <View style={{width: getWidth() * .9, alignSelf: 'center', marginTop: 60 }}>
      <ScrollView>
        <View>
          <Image
            style={{ alignSelf: 'center', width: 80, height: 80, marginVertical: 12,resizeMode:'contain' }}
            source={require('../../../../asset/image/lock.png')} />
        </View>
        <Text h3 style={{ marginBottom: 12, textAlign: 'center', color: colors.text }}>{getLanguage().login.reset_password}</Text>
        <TextInput
          style={styles.input}
          value={modalEmail}
          onChangeText={val => setModalEmail(val)}
          placeholder={getLanguage().input.email}
          keyboardType="email-address"
          placeholderTextColor={colors.border}
        />
        <AppButtonOnlyText onPress={() => sendControl()} styles={{
          backgroundColor: colors.primary,
          padding: 8,
          alignItems: 'center',
          marginVertical: 8,
          borderRadius: 3
        }} text={'Send mail'} textColor={colors.text} />
        <Text style={{marginVertical :4,color :colors.text}}>
          {getLanguage().login.reset_link_waiting}
          </Text>
      </ScrollView>
    </View>
  }

  function renderForgotPassword() {
    return <View style={{ alignSelf: 'flex-end', marginVertical: 4 }}>
      <TouchableOpacity onPress={toggleOverlay}>
        <Text style={{ color: colors.primary }}>{getLanguage().login.forgot_password}</Text>
      </TouchableOpacity>
    </View>
  }

  function renderAccountGoSignUp() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
        }}>
        <Text style={{ color: colors.text }}>{getLanguage().login.dont_have_account}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register', {
            email: '',
            type: 0
          })}
          style={{ alignItems: 'center' }}>
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
             {getLanguage().button.signup}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderLoginButton() {
    return (
      <AppButtonOnlyText
        onPress={() => formControl()}
        styles={styles.login}
        text={getLanguage().button.login}
        textColor={colors.text}
      />
    );
  }

  function renderGoogleButton() {
    return (
      <TouchableScale
        style={{
          alignItems: 'center',
          marginVertical: 12,
          backgroundColor: colors.change,
          padding: 8,
          borderRadius: 3,
        }}
        activeScale={APPLICATION_CONSTANT.SCALE}
        onPress={async () => await signGoogle()}>
        <View style={styles.textwithimage}>
          <Image
            style={{ width: 20, height: 20, marginLeft: 10 }}
            source={require('../../../../asset/image/google.png')}
          />
          <Text style={{ color: colors.text, marginLeft: 10 }}>
            {getLanguage().button.google}
          </Text>
        </View>
      </TouchableScale>
    );
  }

  function renderFormElements() {
    return (
      <View>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={val => setEmail(val)}
          placeholder={getLanguage().input.email}
          keyboardType="email-address"
          placeholderTextColor={colors.border}
        />
        <View>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={val => setPassword(val)}
            placeholder={getLanguage().input.password}
            placeholderTextColor={colors.border}
            secureTextEntry={secure}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              style={{ position: 'absolute', right: 10, bottom: 13 }}
              color={colors.text}
              name={secure ? 'eye' : 'eye-off'}
              size={19}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderLoadingBottom() {
    return (
      loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator />
        </View>
      )
    );
  }

  function renderLogo() {
    return (
      <View style={styles.logo_view}>
        <AppLogo isDark={props.theme.dark} />
      </View>
    );
  }

  function formControl() {
    setLoading(true)
    if (
      email.length > 0 &&
      password.length > 0 &&
      email != '' &&
      password != ''
    ) {
      emailLogin(email, password, res => {
        messageBar(colors.success, res),
          setTimeout(() => {
            navigation.navigate('Test')
          }, 250),
          setLoading(false)
        clearText()
      }, err => {
        messageBar(colors.error, err),
          setLoading(false)
      },wrn=>{
        setLoading(false),
        messageBar(colors.warning,wrn)
      })
    } else {
      setLoading(false)
      messageBar(colors.error, getLanguage().login.auth_error.empty);
    }
  }

  function messageBar(color, message) {
    setSnackbar({
      color: color,
      message: message,
      visible: true,
    });
    setTimeout(() => {
      setSnackbar({
        color: 'black',
        message: '',
        visible: false,
      });
    }, 3000);
  }

  function clearText() {
    setEmail('')
    setPassword('')
  }
};
const mapStateToProps = state => {
  return {
    theme: state.base.theme,
    language : state.base.language
  };
};

export default connect(mapStateToProps)(LoginScreen);
