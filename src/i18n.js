import i18n from "i18next";
import detector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "image_template_generator": "Image template generator"
    }
  },
  fr: {
    translation: {
      "image_template_generator": "Générateur de modèles d'images"
    }
  },
  pt_br: {
    translation: {
      "image_template_generator": "Gerador de templates de imagem"
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