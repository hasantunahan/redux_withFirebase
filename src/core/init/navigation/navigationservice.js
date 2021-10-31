import { StackActions } from '@react-navigation/native';

export function pushNavigation(nav, name, args) {
  nav.navigate(name, args);
}

export function pushNavigationReplacement(nav, name, args) {
  nav.dispatch(StackActions.replace(name, args));
}

export function pushNavigationWithReset(nav, name, args) { }


export function goBack(nav, name, args) {
  nav.goBack()
}

