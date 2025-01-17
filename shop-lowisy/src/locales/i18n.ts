import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// config

import enLocales from '../../public/locales/en/common.json'
import deLocales from '../../public/locales/de/common.json';

// ----------------------------------------------------------------------

let lng = 'en';

if (typeof window !== 'undefined') {
    lng = localStorage.getItem('i18nextLng') || 'en';
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translations: enLocales },
            de: { translations: deLocales },
        },
        lng,
        fallbackLng: 'en',
        debug: false,
        ns: ['translations'],
        defaultNS: 'translations',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
