import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import resources from "@locales/index";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        lng: 'en',
        fallbackLng: "en",
        resources: resources
    })

export default i18next;