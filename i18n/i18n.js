import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import esMX from "./resources/es-MX";
import en from "./resources/en";

const resources = {
  "es-MX": esMX,
  en: en,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  fallbackLng: "en",
  resources,
  lng: "en",
  ns: Object.keys(esMX),
  defaultNS: "shared",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
