// This file sets up i18next for internationalization in a React application.
// It initializes i18next with react-i18next and i18next-browser-languagedetector for language detection.

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import resources from "@locales/index"; // Import translation resources

i18next
    .use(initReactI18next) // Integrate i18next with React
    .use(LanguageDetector) // Detect the user's language
    .init({
        lng: 'en', // Default language
        fallbackLng: "en", // Fallback language if detection fails
        resources: resources // Load translation resources
    });

export default i18next; // Export the configured i18next instance
