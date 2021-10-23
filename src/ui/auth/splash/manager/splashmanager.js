import React from "react"
import { sharedPref } from "../../../../core/init/cache/cache";
import { CacheEnum, CacheList } from '../../../../core/constant/cache/cache_enum';
import store from '../../../../redux/store/store';
import { changeLanguage, changeTheme } from "../../../../redux/actions/base_actions";
import { selectLang } from "../../../../core/init/lang/select/lang_select";
import { selectTheme } from "../../../../core/init/theme/select/theme_select";
const SplashManager = () => {
    const [theme, setTheme] = React.useState(null);
    const [lang, setLang] = React.useState(null);
    React.useEffect(() => {
        async function getBase() {
            let the = await sharedPref(CacheEnum.Get, CacheList.theme);
            if (the != null) {
                setTheme(the);
                store.dispatch(changeTheme(selectTheme(the.theme)))
            }
            let lng = await sharedPref(CacheEnum.Get, CacheList.lang);
            if (lng != null) {
                setLang(lng)
                store.dispatch(changeLanguage(selectLang(lng.lang)))
            }
        }
        getBase();
    }, [])
    return { theme, lang }
}
export default SplashManager