import { en_label } from "../en-En";
import { tr_label } from '../tr-Tr';

export function selectLang(str) {
    switch (str) {
        case 'en':
            return en_label;
        case 'tr':
            return tr_label;
        default:
            return en_label;
    }
}