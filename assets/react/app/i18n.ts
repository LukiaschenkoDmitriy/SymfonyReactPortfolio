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
                    "about_page": {
                        "about_me": "About Me",
                        "education": "Education",
                        "languages": "Languages",
                        "personal_skills": "Personal skills"
                    },
                    "languages": {
                        "english": "English",
                        "ukraine": "Ukraine",
                        "polish": "Polish",
                        "deutsch": "Deutsch",
                        "russian": "Russian"
                    },
                    "personal_skill": {
                        "responsibility": "Responsibility",
                        "mindfulness": "Mindfulness",
                        "communication": "Communication",
                        "teamwork": "Teamwork"
                    },
                    "sidebar": {
                        "about_me_info": "About me",
                        "education_info": "Education",
                        "languages_info": "Languages",
                        "personal_skills_info": "Personal skills",
                    },
                    "global": {
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