import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { BaseStyle } from './style/base.style';
import PropTypes from 'prop-types';
import AppBar from '../../ui/_partial/header/appbar';
import store from '../../redux/store/store';
import { Caselist } from '../../redux/_caselist/caselist';
import BottomBar from '../../ui/_partial/bottom/bottombar';

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
  hiddenBottom = defProps.hiddenBottom,
  bottomBackgroundColor,
  leading,
  bottomData,
  bottomColor,
  callScreen,
  headerColor,
  selectscreen
}) => {
  return (
    <SafeAreaView  style={{ flex: 1, backgroundColor: statusColor }}>
      <View style={{ flex: 1, backgroundColor: backgroundColor }}>
        <StatusBar tr barStyle={barStyle} backgroundColor={statusColor} />
        {!headerHidden && (
          <AppBar
            isBack={isBack}
            color={headerColor ?? 'white'}
            text={headerText ?? ''}
            backgroundColor={statusColor}
            backPress={() => console.log('back')}
            elevation={headerElevation}
            actionList={headerActions}
          />
        )}
        {screen}
        {!hiddenBottom && (
          <BottomBar
            data={bottomData}
            backgroundColor={bottomBackgroundColor}
            color={bottomColor}
            call={callScreen}
            selectscreen={selectscreen}
          />
        )}
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
  hiddenBottom: PropTypes.bool,
};

const defProps = {
  statusColor: store.getState(Caselist.theme).base.theme.colors.text,
  backgroundColor: store.getState(Caselist.theme).base.theme.colors.text,
  headerHidden: false,
  barStyle: 'dark-content',
  isBack: true,
  elevation: 0,
  hiddenBottom: true,
};

export default BaseView;
