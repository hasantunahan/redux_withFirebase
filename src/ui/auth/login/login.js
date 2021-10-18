import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import BaseView from '../../../core/base/baseview';
import {changeTheme} from '../../../redux/actions/base_actions';
import {darkTheme} from '../../../core/init/theme/apptheme';
import ThemeProvider from '../../../core/init/theme/theme_provider';
import {LoginStyle} from './style/style';
import TouchableScale from 'react-native-touchable-scale';
import {APPLICATION_CONSTANT} from '../../../core/constant/app/applicationconstant';
import {onGoogleButtonPress} from './manager/google_sign';
import {useNavigation} from '@react-navigation/core';
import LoadingView from '../../_partial/loading/loading';
import CacheManager from '../../../core/init/cache/cache';
import { CacheEnum } from '../../../core/constant/cache/cache_enum';

const LoginScreen = props => {
  const navigation = useNavigation();
  const colors = ThemeProvider(props.theme.colors);
  const styles = LoginStyle(colors);
  const dispatch = useDispatch();
  const [secure, setSecure] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <BaseView
      barStyle={props.theme.statusbar}
      headerHidden={true}
      statusColor={colors.background}
      screen={renderLogin()}
    />
  );

  function renderLogin() {
    return (
      <View style={styles.main}>
        <TouchableOpacity onPress={() => dispatch(changeTheme(darkTheme))}>
          <Text style={{color: colors.text}}>Change Theme</Text>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.logo_view}>
            {props.theme.dark ? (
              <Image
                style={styles.logo}
                source={require('../../../../asset/image/logo_dark.png')}
              />
            ) : (
              <Image
                style={styles.logo}
                source={require('../../../../asset/image/logo_light.png')}
              />
            )}
          </View>
          <View style={[styles.screen_padding, {marginTop: 40}]}>
            <TextInput
              style={styles.input}
              placeholder="enter username"
              keyboardType="email-address"
              placeholderTextColor={colors.border}
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={val => setPassword(val)}
              placeholder="enter password"
              placeholderTextColor={colors.border}
              secureTextEntry={secure}
            />

            <TouchableScale
              style={{
                alignItems: 'center',
                marginVertical: 12,
                backgroundColor: colors.primary,
                padding: 8,
                borderRadius: 3,
              }}
              activeScale={APPLICATION_CONSTANT.SCALE}>
              <Text style={{color: colors.text}}>Login</Text>
            </TouchableScale>

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
              <Text style={{marginHorizontal: 8, color: colors.text}}>
                {'Ya da'}
              </Text>

              <View
                style={{
                  width: '42%',
                  height: 0.5,
                  backgroundColor: colors.border,
                }}></View>
            </View>

            <TouchableScale
              style={{
                alignItems: 'center',
                marginVertical: 12,
                backgroundColor: colors.change,
                padding: 8,
                borderRadius: 3,
                elevation: 2,
              }}
              activeScale={APPLICATION_CONSTANT.SCALE}
              onPress={async () => {
                setLoading(true);
                await onGoogleButtonPress().then((val) => {
                  if (val != null) {
                    setLoading(false);
                    navigation.navigate('Test');
                  } else {
                    console.log(val);
                  }
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: 20, height: 20, marginLeft: 10}}
                  source={require('../../../../asset/image/google.png')}
                />
                <Text style={{color: colors.text, marginLeft: 10}}>
                  Sign in with Google
                </Text>
              </View>
            </TouchableScale>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <Text style={{color: colors.text}}>
                Don't have an account yet?{' '}
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={{alignItems: 'center'}}>
                <Text style={{color: colors.primary, fontWeight: 'bold'}}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            {loading && (
              <View style={{marginTop: 20}}>
                <ActivityIndicator />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
};
const mapStateToProps = state => {
  return {
    theme: state.base.theme,
  };
};

export default connect(mapStateToProps)(LoginScreen);
