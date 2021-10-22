import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationList} from '../../constant/navigation/navigation_constant';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {darkTheme, lightTheme} from '../theme/apptheme';
import {changeTheme} from '../../../redux/actions/base_actions';
import {useColorScheme} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {APPLICATION_CONSTANT} from '../../constant/app/applicationconstant';
import auth from '@react-native-firebase/auth'
const Stack = createNativeStackNavigator();
export const Navigation = props => {
  const scheme = useColorScheme();
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log(auth().currentUser);
    GoogleSignin.configure({
      webClientId: APPLICATION_CONSTANT.WEB_CLIENTID,
      client_type: 3,
      iosClientId: APPLICATION_CONSTANT.IOS_CLIENTID,
      offlineAccess: false,
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
        initialRouteName={NavigationList[0].name}
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
