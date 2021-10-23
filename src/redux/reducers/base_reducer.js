import { Caselist } from '../_caselist/caselist';
import { lightTheme } from '../../core/init/theme/apptheme';
import { en_label } from '../../core/init/lang/en-En';
import { tr_label } from '../../core/init/lang/tr-Tr';

const INITIAL_STATE = {
    userList: [],
    theme: lightTheme,
    language: en_label
}


export const base_reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Caselist.user:
            return { ...state, userList: action.payload };
        case Caselist.theme:
            return { ...state, theme: action.payload };
        case Caselist.language:
            return { ...state, language: action.payload };
        default:
            return state;
    }
}