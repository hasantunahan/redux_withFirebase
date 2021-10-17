import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationList } from '../../constant/navigation/navigation_constant';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { base_reducer } from '../../../redux/reducers/base_reducer';
import store from '../../../redux/store/store';
import { Caselist } from '../../../redux/_caselist/caselist';
import { LIGHT_THEME } from '../../constant/theme/theme_constant';
import { darkTheme, lightTheme } from '../theme/apptheme';
import { changeTheme } from '../../../redux/actions/base_actions';
import { useColorScheme } from 'react-native';

const Stack = createNativeStackNavigator();
export const Navigation = (props) => {
    const scheme = useColorScheme()
    const dispatch = useDispatch()
    React.useEffect(() => {
        if (scheme !== 'dark') {
            dispatch(changeTheme(lightTheme))
        } else {
            dispatch(changeTheme(darkTheme))
        }
    }, [])
    return (
        <NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
            <Stack.Navigator initialRouteName={NavigationList[0].page} screenOptions={{
                headerShown: false
            }} >
                {
                    NavigationList.map((item, index) => {
                        return <Stack.Screen key={index} name={item.name} component={item.page} />
                    })
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}