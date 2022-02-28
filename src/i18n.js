import i18n from "i18next";
import detector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "image_template_generator": "Image template generator",
      general: {
        print: "Print"
      }
    }
  },
  pt_br: {
    translation: {
      "image_template_generator": "Gerador de templates de imagem"
    },
    general: {
      print: "Imprimir"
    }
  }
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