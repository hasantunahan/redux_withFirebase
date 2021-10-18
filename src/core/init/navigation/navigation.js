import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationList} from '../../constant/navigation/navigation_constant';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {darkTheme, lightTheme} from '../theme/apptheme';
import {changeTheme} from '../../../redux/actions/base_actions';
import {useColorScheme} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();
export const Navigation = props => {
  const [isLogin, setIsLogin] = React.useState(false);
  const scheme = useColorScheme();
  const dispatch = useDispatch();
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '926170197189-2pb6s4qcthjv178b5esmniciltiisnb0.apps.googleusercontent.com',
      client_type: 3,
      iosClientId :'926170197189-25d3sne7o3a65fk968c19c7pvn96kore.apps.googleusercontent.com',
      offlineAccess: false
    });
    if (scheme !== 'dark') {
      dispatch(changeTheme(lightTheme));
    } else {
      dispatch(changeTheme(darkTheme));
    }
  }, []);

  return (
    <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <Stack.Navigator
        initialRouteName={NavigationList[0].page}
        screenOptions={{
          headerShown: false,
        }}>
        {NavigationList.map((item, index) => {
          return (
            <Stack.Screen key={index} name={item.name} component={item.page} />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
