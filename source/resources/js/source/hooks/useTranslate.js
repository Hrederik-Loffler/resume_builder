import {useI18n} from "@shopify/react-i18n";
import ru from "@locales/ru.json";


export const useTranslate = () => {
    const [i18n] = useI18n({
        id: 'Polaris',
        fallback: ru,
        translations(locale) {
            return import(
                `../locales/${language}.json`
                ).then((dictionary) => dictionary && dictionary.default);
        },
    });

    const translate = (key, replacements = {}) => {
        const keyExists = i18n.translationKeyExists(key);

        if (keyExists) {
            return i18n.translate(key, replacements);
        }
        return key;
    }

    return {...i18n, translate:translate};
}
