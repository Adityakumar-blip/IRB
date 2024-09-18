import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './locales/english';
import fr from './locales/french';
import de from './locales/German';
import id from './locales/indonesia';
import it from './locales/Italian';
import ja from './locales/Japanese';
import ko from './locales/Korean';
import pl from './locales/Polish';
import pt from './locales/Portuguese';
import es from './locales/spanish';
import th from './locales/Thai';
import zh from './locales/Chinese';
import nl from './locales/Dutch';
import vi from './locales/Vietnamese';
import ph from './locales/Filipino';

const resources = {
  en: {translation: en},
  fr: {translation: fr},
  de: {translation: de},
  id: {translation: id},
  it: {translation: it},
  ja: {translation: ja},
  ko: {translation: ko},
  pl: {translation: pl},
  pt: {translation: pt},
  es: {translation: es},
  th: {translation: th},
  zh: {translation: zh},
  nl: {translation: nl},
  vi: {translation: vi},
  ph: {translation: ph},
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
