import React from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import BaseView from '../../../core/base/baseview';
import {Bottomlist} from '../../../core/constant/bottom/bottombar';
import {getHeader, getScreen} from './manage/homenavmanager';

const HomeNavigation = props => {
  const [screen, setScreen] = React.useState(1);
  return (
    <BaseView
      isBack={false}
      headerHidden={
        !Bottomlist.find(item => item.id == screen && item.header == true) &&
        true
      }
      leading={getHeader(screen)}
      statusColor={props.theme.colors.background}
      headerColor={props.theme.colors.text}
      hiddenBottom={false}
      bottomData={Bottomlist}
      bottomBackgroundColor={props.theme.colors.change}
      backgroundColor={props.theme.colors.background}
      bottomColor={props.theme.colors.text}
      callScreen={data => setScreen(data)}
      selectscreen={screen}
      screen={getScreen(screen)}
    />
  );
};

const mapStateToProps = state => {
  return {
    theme: state.base.theme,
  };
};

export default connect(mapStateToProps)(HomeNavigation);
