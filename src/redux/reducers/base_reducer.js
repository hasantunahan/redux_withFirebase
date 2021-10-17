import { Caselist } from '../_caselist/caselist';
import { lightTheme } from '../../core/init/theme/apptheme';

const INITIAL_STATE = {
    userList: [],
    theme: lightTheme
}


export const base_reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Caselist.user:
            return { ...state, userList: action.payload };
        case Caselist.theme:
            return { ...state, theme: action.payload };
        default:
            return state;
    }

}