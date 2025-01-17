import { useTranslation } from 'react-i18next';
import useSettings from './useSettings';
import { enUS, frFR, zhCN, viVN, arSD, deDE } from '@mui/material/locale';

// config


export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'German',
    value: 'de',
    systemValue: deDE,
    icon: '/assets/icons/flags/ic_flag_de.svg',
  }
];

export const defaultLang = allLangs[0];

// ----------------------------------------------------------------------

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();

  //const { onChangeDirectionByLang } = useSettings();

  const langStorage = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : '';

  const currentLang = allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
    //onChangeDirectionByLang(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text: any, options?: any) => translate(text, options),
    currentLang,
    allLangs,
  };
}
