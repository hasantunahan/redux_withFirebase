import React from 'react';
import { View } from 'react-native';
import BaseView from '../../../core/base/baseview';
import { goBack } from '../../../core/init/navigation/navigationservice';
import { useNavigation } from '@react-navigation/core';

const SettingView = () => {
    const navigation = useNavigation()
    return (
        <BaseView backPress={() => navigation.canGoBack() && goBack(navigation)} />
    );
}
export default SettingView