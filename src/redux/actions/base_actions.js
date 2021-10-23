import { Caselist } from '../_caselist/caselist';

export const setUser = (user) => dispatch => {
    dispatch({ type: Caselist.user, payload: user });
}

export const changeTheme = (theme) => dispatch => {
    console.log('Değistir :' + JSON.stringify(theme));
    dispatch({ type: Caselist.theme, payload: theme });
}

export const changeLanguage = (lang) => dispatch => {
    dispatch({ type: Caselist.language, payload: lang });
}