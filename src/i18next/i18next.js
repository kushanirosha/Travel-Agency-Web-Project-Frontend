import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enFile from "./en.json"
import dvFile from "./dv.json"

const resources = {
  en: {
    translation: enFile
  },
  dv: {
    translation: dvFile
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;