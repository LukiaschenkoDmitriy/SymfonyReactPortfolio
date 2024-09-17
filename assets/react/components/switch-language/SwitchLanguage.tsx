import "./SwitchLanguage.scss";

import React, { useContext } from "react"

import i18next from "@app/i18n";

import { AppContext } from "@app/app"
import LanguageEnum from "@enum/LanguageEnum";

// This file defines the SwitchLanguage component, which allows users to switch between different languages.
// It displays a list of available languages and highlights the currently selected language.
// On clicking a language, it updates the application context and refreshes the app routers.

const SwitchLanguage: React.FC = () => {
    const appContext = useContext(AppContext);
    const { currentLanguage, setCurrentLanguage, setAppRouters } = appContext;

    const handleLanguageClick = (language: LanguageEnum) => {
        i18next.changeLanguage(language);

        setCurrentLanguage(language);
        setAppRouters([]);
    };

    return (
        <div className="sr-swith-language">
            <div className={currentLanguage == LanguageEnum.ENGLISH ? "language language-active" : "language"} onClick={() => { handleLanguageClick(LanguageEnum.ENGLISH) }}>
                {LanguageEnum.ENGLISH}
            </div>
            <div className={currentLanguage == LanguageEnum.POLISH ? "language language-active" : "language"} onClick={() => { handleLanguageClick(LanguageEnum.POLISH) }}>
                {LanguageEnum.POLISH}
            </div>
            <div className={currentLanguage == LanguageEnum.UKRAINE ? "language language-active" : "language"} onClick={() => { handleLanguageClick(LanguageEnum.UKRAINE) }}>
                {LanguageEnum.UKRAINE}
            </div>
            <div className={currentLanguage == LanguageEnum.DEUTSCH ? "language language-active" : "language"} onClick={() => { handleLanguageClick(LanguageEnum.DEUTSCH) }}>
                {LanguageEnum.DEUTSCH}
            </div>
            <div className={currentLanguage == LanguageEnum.RUSSIAN ? "language language-active" : "language"} onClick={() => { handleLanguageClick(LanguageEnum.RUSSIAN) }}>
                {LanguageEnum.RUSSIAN}
            </div>
        </div>
    );
}

export default SwitchLanguage;