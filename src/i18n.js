// Libs import
import i18n from "i18next";
import detector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next";

// Translation resources
import translationsEN from "translations/en/translations-en.json";
import translationsPtBr from "translations/pt_br/translations-pt-br.json";

const resources = {
  en: { translation: translationsEN },
  pt_br: { translation: translationsPtBr }
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;