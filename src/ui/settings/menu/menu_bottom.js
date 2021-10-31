import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { MenuStyle } from './style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { List } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getLanguage } from '../../../core/extension/lang';
import {
  pushNavigation,
  pushNavigationReplacement,
} from '../../../core/init/navigation/navigationservice';
import DeviceInfo from 'react-native-device-info';
import { sharedPref } from '../../../core/init/cache/cache';
import { CacheEnum, CacheList } from '../../../core/constant/cache/cache_enum';
import auth from '@react-native-firebase/auth';
import { Avatar } from 'react-native-paper';
import { signOutGoogle } from '../../auth/login/manager/google_sign';
import { emailSignOut } from '../../auth/register/manager/email_sign_up';
import TouchableScale from 'react-native-touchable-scale';

const MenuBottomSheet = ({ colors }) => {
  const navigation = useNavigation();
  const styles = MenuStyle(colors);
  const [type, setType] = React.useState('');
  React.useEffect(() => {
    getAuthType();
  }, []);

  return (
    <View style={styles.main}>
      <ScrollView>
        <TouchableScale onPress={() => pushNavigation(navigation, 'Splash')}>
          {renderMypost()}
        </TouchableScale>

        <TouchableScale onPress={() => pushNavigation(navigation, 'Settings')}>
          {renderSetting()}
        </TouchableScale>

        <TouchableScale
          onPress={() =>
            getAlert(
              getLanguage().alert_logout.logout,
              getLanguage().alert_logout.msg,
              async () => await signOut(),
            )
          }>
          {renderLogout()}
        </TouchableScale>

        <TouchableScale onPress={() => console.log('privacy')}>
          {rendertextItem(getLanguage().menu_list.privacy, colors)}
        </TouchableScale>

        <TouchableScale onPress={() => console.log('terms')}>
          {rendertextItem(getLanguage().menu_list.terms, colors)}
        </TouchableScale>

        <TouchableScale onPress={() => console.log('help')}>
          {rendertextItem(getLanguage().menu_list.help, colors)}
        </TouchableScale>

        {rendertextItem(
          `${getLanguage().menu_list.version} : ${DeviceInfo.getVersion()}`,
          colors,
        )}
      </ScrollView>
    </View>
  );

  function renderMypost() {
    return (
      <List.Item
        style={styles.menu_items}
        title={getLanguage().menu_list.post}
        titleNumberOfLines={1}
        titleStyle={styles.title}
        left={() => (
          <View style={styles.menu_left_view}>
            <Ionicons
              color={colors.text}
              name="md-restaurant-outline"
              size={30}
            />
          </View>
        )}
        right={() => (
          <View style={styles.menu_right_view}>
            <Ionicons
              color={colors.text}
              name="chevron-forward-sharp"
              size={18}
            />
          </View>
        )}
      />
    );
  }

  function renderSetting() {
    return (
      <List.Item
        style={styles.menu_items}
        title={getLanguage().menu_list.setting}
        titleNumberOfLines={1}
        titleStyle={styles.title}
        left={() => (
          <View style={styles.menu_left_view}>
            <Ionicons color={colors.text} name="settings-outline" size={30} />
          </View>
        )}
        right={() => (
          <View style={styles.menu_right_view}>
            <Ionicons
              color={colors.text}
              name="chevron-forward-sharp"
              size={18}
            />
          </View>
        )}
      />
    );
  }

  function renderLogout() {
    return (
      <List.Item
        style={styles.menu_items}
        title={getLanguage().menu_list.logout}
        titleNumberOfLines={1}
        titleStyle={styles.title}
        left={() => (
          <View style={styles.menu_left_view}>
            <Avatar.Image
              size={30}
              source={{ uri: auth().currentUser.photoURL }}
            />
          </View>
        )}
        right={() => (
          <View style={styles.menu_right_view}>
            <Ionicons
              color={colors.text}
              name="chevron-forward-sharp"
              size={18}
            />
          </View>
        )}
      />
    );
  }

  function rendertextItem(text, color) {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ color: color.text, marginVertical: 6 }}>
          {text ?? 'item'}
        </Text>
      </View>
    );
  }

  function getAlert(title, msg, onPress) {
    Alert.alert(
      title,
      msg,
      [
        {
          text: getLanguage().alert_logout.cancel,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: getLanguage().alert_logout.ok,
          onPress: () => onPress(),
          style: 'destructive',
        },
      ],
      [],
    );
  }

  async function getAuthType() {
    await sharedPref(CacheEnum.Get, CacheList.registerInfo).then(res => {
      setType(res.type);
    });
  }

  async function signOut() {
    if (type == 'Google') {
      await signOutGoogle(
        item => console.log(item),
        err => console.log(err),
      ).then(() => {
        pushNavigationReplacement(navigation, 'Login');
      });
    } else {
      await emailSignOut(
        call => console.log(call),
        err => console.log(err),
      ).then(() => {
        pushNavigationReplacement(navigation, 'Login');
      });
    }
  }
};

export default MenuBottomSheet;
