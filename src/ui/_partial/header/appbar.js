import React from 'react';
import {View, Text, Platform} from 'react-native';
import {Appbar} from 'react-native-paper';
import PropTypes from 'prop-types';
import {APPLICATION_CONSTANT} from '../../../core/constant/app/applicationconstant';

const AppBar = ({
  backgroundColor = 'white',
  text,
  backPress,
  elevation = 0,
  color = 'black',
  leading,
  actions,
  isBack = true,
  actionList = [],
}) => {
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

  return (
    <Appbar.Header
      style={{backgroundColor: backgroundColor, elevation: elevation}}>
      {isBack && (
        <Appbar.BackAction color={color} onPress={() => backPress()} />
      )}
      {leading}
      <Appbar.Content
        color={color}
        title={text}
      />
      {actionList.length > 0 &&
        actionList.map(item => {
          return item;
        })}
      {actions}
    </Appbar.Header>
  );
};

AppBar.propTypes = {
  backgroundColor: PropTypes.string,
  text: PropTypes.string,
  backPress: PropTypes.func,
  elevation: PropTypes.number,
};

export default AppBar;
