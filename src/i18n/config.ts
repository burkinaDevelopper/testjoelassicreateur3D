// Import Dependencies
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Local Imports
import { type LocaleCode, supportedLanguages } from "./langs";

// ----------------------------------------------------------------------

export const defaultLang: LocaleCode = "fr";
export const fallbackLang: LocaleCode = "fr";

// Vérifier si on est côté client (Next.js SSR compatible)
const isClient = typeof window !== 'undefined';
const initialLang = isClient 
  ? localStorage.getItem("i18nextLng") || defaultLang 
  : defaultLang;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18nextLng",
      lookupSessionStorage: "i18nextLng",
    },
    fallbackLng: fallbackLang,
    lng: initialLang,
    supportedLngs: supportedLanguages,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
    lowerCaseLng: true,
    debug: false,
  });

i18n.languages = supportedLanguages;

export default i18n;
