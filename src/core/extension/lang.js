import store from "../../redux/store/store";
import { Caselist } from "../../redux/_caselist/caselist";

export function getLanguage() {
    return store.getState(Caselist.language).base.language;
}