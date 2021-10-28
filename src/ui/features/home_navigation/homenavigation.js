import React from 'react';
import {BackHandler, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import BaseView from '../../../core/base/baseview';
import {Bottomlist} from '../../../core/constant/bottom/bottombar';
import {getHeader, getScreen} from './manage/homenavmanager';

const HomeNavigation = props => {
  const [screen, setScreen] = React.useState(1);
  const [bottom ,setBottom ] = React.useState(false)

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setBottom(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setBottom(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <BaseView
      isBack={false}
      headerHidden={true}
      statusColor={props.theme.colors.background}
      barStyle={props.theme.statusbar}
      headerColor={props.theme.colors.text}
      hiddenBottom={bottom}
      bottomData={Bottomlist}
      bottomBackgroundColor={props.theme.colors.background}
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
