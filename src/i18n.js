import i18n from "i18next";
import detector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      currency: {
        brl: {
          main_ticker: "R$"
        }
      },
      functionalities: {
        template_generation: "Template generation",
        including_information: "Including information",
        select_images: "Selection of images",
        edit_images: "Edit images"
      },
      general: {
        crop: "Crop",
        nextImage: "Next",
        previous: "Previous",
        print: "Print",
        product: {
          identifier: "Product identifier",
          value: "Product value"
        }
      },
      image_template_generator: "Image template generator",
      select_images: {
        uploader: {
          description: "Drag & Drop your files or",
          complemented_description: "Search the file"
        }
      }
    }
  },
  pt_br: {
    translation: {
      currency: {
        brl: {
          main_ticker: "R$"
        }
      },
      functionalities: {
        template_generation: "Geração do template",
        including_information: "Inclusão de informações",
        select_images: "Seleção de imagens",
        edit_images: "Edição de imagens"
      },
      general: {
        crop: "Recortar",
        nextImage: "Próxima",
        previous: "Anterior",
        print: "Imprimir",
        product: {
          identifier: "Identificador do produto",
          value: "Valor do produto"
        }
      },
      image_template_generator: "Gerador de templates de imagem",
      select_images: {
        uploader: {
          description: "Arraste e solte seus arquivos ou",
          complemented_description: "Procure o arquivo"
        }
      }
    },
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