import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        resources: {
            en: {
                translation: {
                    "header": {
                        "home": "Home",
                        "about_me": "About Me",
                        "skills": "Skills",
                        "experiences": "Experiences",
                        "projects": "Projects",
                        "contact": "Contact"
                    }
                }
            }
        }
    })

export default i18next;