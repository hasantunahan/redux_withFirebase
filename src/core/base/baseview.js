import React from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import {BaseStyle} from './style/base.style';
import PropTypes from 'prop-types';
import AppBar from '../../ui/_partial/header/appbar';
import store from '../../redux/store/store';
import {Caselist} from '../../redux/_caselist/caselist';

const BaseView = ({
  screen,
  headerHidden = defProps.headerHidden,
  backgroundColor = defProps.backgroundColor,
  statusColor = defProps.statusColor,
  barStyle = defProps.barStyle,
  isBack = defProps.isBack,
  headerElevation = defProps.elevation,
  headerText,
  headerActions,
}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: statusColor}}>
      <View style={{flex: 1, backgroundColor: backgroundColor}}>
        <StatusBar barStyle={barStyle} backgroundColor={statusColor} />
        {!headerHidden && (
          <AppBar
            isBack={isBack}
            color={'white'}
            text={headerText}
            backgroundColor={statusColor}
            backPress={() => console.log('back')}
            elevation={headerElevation}
            actionList={headerActions}
          />
        )}
        {screen}
      </View>
    </SafeAreaView>
  );
};

BaseView.propTypes = {
  statusColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  headerHidden: PropTypes.bool,
  barStyle: PropTypes.string,
  isBack: PropTypes.bool,
};

const defProps = {
  statusColor: store.getState(Caselist.theme).base.theme.colors.text,
  backgroundColor: store.getState(Caselist.theme).base.theme.colors.text,
  headerHidden: false,
  barStyle: 'dark-content',
  isBack: true,
  elevation: 0,
};

export default BaseView;
