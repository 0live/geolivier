import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "hello": "Hello World",
      "wip.title": "Work in progress",
      "wip.subtitle": "We're currently building something amazing.",
      "wip.expectedLaunch": "Tomorrow, kind off",
    }
  },
  fr: {
    translation: {
      "hello": "Bonjour le monde",
      "wip.title": "Travail en cours",
      "wip.subtitle": "Nous construisons actuellement quelque chose d'incroyable.",
      "wip.expectedLaunch": "Demain, ou presque",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
