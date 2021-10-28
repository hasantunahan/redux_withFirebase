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
import { connect } from 'react-redux';
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
import { getLanguage } from '../../../core/extension/lang';
import LottieView from 'lottie-react-native'
import { getWidth } from '../../../core/extension/dimension';

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
    control().then(() => {
      if (verify) {
        navigation.navigate('HomeNavigation');
      } else {
        console.log("not login yet");
      }
    })
  }, [verify]);

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

  function renderEmailVerificationBody() {
    return (
      <ScrollView>
        <View style={styles.verify_body}>
          <View style={styles.verify_h_padding}>
            <LottieView style={styles.verify_img} source={require('../../../../asset/lottie/send_mail.json')} autoPlay loop />

            <View style={{ marginTop: 20 }}>
              <Text style={styles.verify_title}>
                {getLanguage().register.check_email}
              </Text>
              <Text style={styles.verify_email}>
                {params.email ? params.email : email}
              </Text>
              <Text
                style={styles.verify_dont}>
                {getLanguage().register.error.dont_get_link}
              </Text>
              <View style={{ marginTop: 20 }}>
                <AppButtonOnlyText
                  onPress={() => {
                    userControl(verify => {
                      setVerify(verify);
                    });
                  }}
                  styles={styles.register}
                  text={getLanguage().button.confirm}
                  textColor={colors.text}
                />
              </View>
              <View style={styles.verify_direc_view}>
                <Text style={styles.verify_pre_text}>
                  {getLanguage().register.i_have_account_delete}
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    navigation.reset({
                      routes: [{ name: 'Login' }]
                    }),
                      await sharedPref(CacheEnum.Remove, CacheList.registerInfo),
                      auth().currentUser.delete();
                  }}>
                  <Text style={styles.verify_focus_text}>
                    {getLanguage().button.login}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.verify_direc_view}>
                <Text style={styles.verify_pre_text}>
                  {getLanguage().register.want_change_email}
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
                  <Text style={styles.verify_focus_text}>
                    {getLanguage().button.signup}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
      <View style={{ alignItems: 'center', marginTop: 12 }}>
        <Image style={{ width: getWidth(), position: 'absolute', opacity: props.theme.dark ? 0.2 : 1 }} source={require('../../../../asset/image/back.png')} />
        <View style={styles.logo_view}>
          <AppLogo isDark={props.theme.dark} />
        </View>
      </View>

    );
  }

  function renderFormElements() {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{ paddingVertical: 8 }}>
          <Text style={styles.form_info}>
            {getLanguage().choose.avatar}
          </Text>
          {
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row' }}>
                {avatarList.map((item, index) => {
                  return (
                    <TouchableScale activeScale={APPLICATION_CONSTANT.SCALE} onPress={() => { setChoose(item) }} key={index}>
                      <View style={styles.avatar_view}>
                        <Image
                          style={[styles.choose_img, {
                            borderWidth: item.id == choose.id ? 4 : 0.7,
                            borderColor: item.id == choose.id ? colors.primary : colors.border,
                          }]}
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
          placeholder={getLanguage().input.name}
          keyboardType="email-address"
          placeholderTextColor={colors.border}
        />
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
              style={styles.eye}
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
            placeholder={getLanguage().input.password_again}
            placeholderTextColor={colors.border}
            secureTextEntry={secureAgain}
          />
          <TouchableOpacity onPress={() => setSecureAgain(!secureAgain)}>
            <Ionicons
              style={styles.eye}
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
      <View style={styles.have_account}>
        <Text style={{ color: colors.text }}>{getLanguage().register.i_have_account}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.align_center}>
          <Text style={styles.text_button}>{getLanguage().button.login}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderRegisterButton() {
    return (
      <AppButtonOnlyText
        onPress={() => registerControl()}
        styles={styles.register}
        text={getLanguage().button.signup}
        textColor={colors.text}
      />
    );
  }

  async function control() {
    setSend(params.type);
    userControl(verify => {
      setVerify(verify);
    });
  }

  async function registerControl() {
    if (
      choose != 0 &&
      email.length > 0 &&
      password.length > 0 &&
      name.length > 0 &&
      email != '' &&
      name != '' &&
      password != '' &&
      passwordAgain != '' &&
      passwordAgain != ''
    ) {
      if (password === passwordAgain) {
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
        messageBar(colors.warning, getLanguage().register.password_match);
      }
    } else {
      messageBar(colors.error, getLanguage().register.required_all);
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

};
const mapStateToProps = state => {
  return {
    theme: state.base.theme,
    language: state.base.language
  };
};
export default connect(mapStateToProps)(RegisterScreen);
