import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
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
import CustomSnackBar from '../../_partial/snackbar/snackbar';
import { emailRegister, userControl } from './manager/email_sign_up';
import { ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { sharedPref } from '../../../core/init/cache/cache';
import { CacheEnum, CacheList } from '../../../core/constant/cache/cache_enum';
import { avatarList } from './avatarlist/avatar_list';

const RegisterScreen = props => {
  const { params } = props.route;
  const [snackbar, setSnackbar] = React.useState({
    color: 'black',
    visible: false,
    message: '',
  });
  const navigation = useNavigation();
  const colors = ThemeProvider(props.theme.colors);
  const styles = RegisterStyle(colors);
  const dispatch = useDispatch();
  const [secure, setSecure] = React.useState(true);
  const [secureAgain, setSecureAgain] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [passwordAgain, setPasswordAgain] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [send, setSend] = React.useState(0);
  const [verify, setVerify] = React.useState(false);
  const [choose, setChoose] = React.useState({});

  React.useEffect(() => {
    control().then(()=>{
      if(verify){
        navigation.navigate('Test');
      }else{
        console.log('====================================');
        console.log("not login yet");
        console.log('====================================');
      }
    })
  }, [verify]);

  async function control() {
    console.log("geldim");
    setSend(params.type);
    userControl(verify => {
      console.log('Control verify' + verify);
      setVerify(verify);
    });
  }

  return (
    <BaseView
      barStyle={props.theme.statusbar}
      isBack={false}
      headerHidden={true}
      backgroundColor={colors.background}
      statusColor={colors.background}
      screen={send == 0 ? renderBody() : renderEmailVerificationBody()}
    />
  );

  function renderBody() {
    return (
      <View style={styles.main}>
        <ScrollView>
          <View style={styles.parent}>
            {renderLogo()}
            {renderFormElements()}
            {renderRegisterButton()}
            {renderHaveAccunt()}
            {loading ? renderLoading() : <></>}
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

  function renderLoading() {
    return (
      <View style={{ alignItems: 'center', marginTop: 25 }}>
        <ActivityIndicator color={colors.text} />
      </View>
    );
  }

  function renderLogo() {
    return (
      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <AppLogo isDark={props.theme.dark} />
      </View>
    );
  }

  function renderFormElements() {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{ paddingVertical: 8 }}>
          <Text style={{ color: colors.text, opacity: 0.7 }}>
            {'Choose Avatar'}
          </Text>
          {
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row' }}>
                {avatarList.map((item, index) => {
                  return (
                    <TouchableScale activeScale={APPLICATION_CONSTANT.SCALE} onPress={() => { setChoose(item) }} key={index}>
                      <View style={{ marginRight: 10, marginTop: 10 }}>
                        <Image
                          style={{
                            width: 75,
                            height: 75,
                            borderRadius: 5,
                            borderWidth: item.id == choose.id ? 3 : 0.7,
                            borderColor:
                              item.id == choose.id ? '#41fa7c' : colors.border,
                          }}
                          source={{ uri: item.url }}
                        />
                      </View>
                    </TouchableScale>
                  );
                })}
              </View>
            </ScrollView>
          }
        </View>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={val => setName(val)}
          placeholder="enter name"
          keyboardType="email-address"
          placeholderTextColor={colors.border}
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={val => setEmail(val)}
          placeholder="enter email"
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
            <Ionicons
              style={{ position: 'absolute', right: 10, bottom: 13 }}
              color={colors.text}
              name={secure ? 'eye' : 'eye-off'}
              size={19}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.input}
            value={passwordAgain}
            onChangeText={val => setPasswordAgain(val)}
            placeholder="please enter password again"
            placeholderTextColor={colors.border}
            secureTextEntry={secureAgain}
          />
          <TouchableOpacity onPress={() => setSecureAgain(!secureAgain)}>
            <Ionicons
              style={{ position: 'absolute', right: 10, bottom: 13 }}
              color={colors.text}
              name={secureAgain ? 'eye' : 'eye-off'}
              size={19}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderHaveAccunt() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
        }}>
        <Text style={{ color: colors.text }}>I have an account, {''}</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{ alignItems: 'center' }}>
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderRegisterButton() {
    return (
      <AppButtonOnlyText
        onPress={() => registerControl()}
        styles={styles.register}
        text={'Sign Up'}
        textColor={colors.text}
      />
    );
  }

  async function registerControl() {
    if (
      choose != 0 &&
      email.length > 0 &&
      password.length > 0 &&
      name.length > 0 &&
      email != '' &&
      name != '' &&
      password !=
      '' /* && passwordAgain != '' && passwordAgain != '' && fullname != '' && fullname != '' */
    ) {
      if (/* password === passwordAgain */ 1) {
        setLoading(true);
        emailRegister(
          email,
          password,
          err => {
            setLoading(false), messageBar(colors.error, err);
          },
          res => {
            setLoading(false), messageBar(colors.success, res), clearText();
          },
          call => setSend(call),
          isVerify => setVerify(isVerify),
          name,
          choose.url
        );
      } else {
        messageBar(colors.warning, "Passwords don't match");
      }
    } else {
      messageBar(colors.error, 'Required to fill in all blanks');
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
    setEmail('');
    setPassword('');
    setPasswordAgain('');
    setName('')
    setChoose(0)
  }

  function renderEmailVerificationBody() {
    return (
      <ScrollView>
        <View style={{ justifyContent: 'center', marginTop: 40 }}>
          <View style={{ paddingHorizontal: 12 }}>
            <Image
              style={{ alignSelf: 'center', width: 120, height: 120 }}
              source={require('../../../../asset/image/verify.png')}
            />
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  marginBottom: 2,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 18,
                  color: colors.text,
                }}>
                {'Check your email addres'}
              </Text>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: '500',
                  textAlign: 'center',
                }}>
                {params.email ? params.email : email}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  marginTop: 20,
                  width: '80%',
                  alignSelf: 'center',
                  color: colors.text,
                  textAlign: 'center',
                }}>{`To confirm email address,if didn't get a link to your email address`}</Text>
              <View style={{ marginTop: 20 }}>
                <AppButtonOnlyText
                  onPress={() => {
                    userControl(verify => {
                      console.log('Control verify' + verify);
                      setVerify(verify);
                    });
                  }}
                  styles={styles.register}
                  text={'Confirm'}
                  textColor={colors.text}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 4,
                }}>
                <Text style={{ marginRight: 5, color: colors.text }}>
                  {'I have account,delete this email'}
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    navigation.navigate('Login'),
                      await sharedPref(CacheEnum.Remove, CacheList.registerInfo),
                      auth().currentUser.delete();
                  }}>
                  <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
                    {'Login'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 4,
                }}>
                <Text style={{ marginRight: 5, color: colors.text }}>
                  {'I want to change email address,'}
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    await sharedPref(CacheEnum.Remove, CacheList.registerInfo),
                      auth().currentUser.delete(),
                      setSend(0),
                      setSnackbar({
                        visible: false,
                      });
                  }}>
                  <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
                    {'Register'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
};
const mapStateToProps = state => {
  return {
    theme: state.base.theme,
  };
};
export default connect(mapStateToProps)(RegisterScreen);
