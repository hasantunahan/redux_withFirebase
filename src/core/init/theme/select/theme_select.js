import { darkTheme, lightTheme } from "../apptheme";

export function selectTheme(str) {
    switch (str) {
        case 'dark':
            return darkTheme;
        case 'light':
            return lightTheme;
        default:
            return lightTheme
    }
}