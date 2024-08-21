import "./SwitchLanguage.scss";

import React, { useContext } from "react"

import { AppContext } from "@app/app"
import LanguageEnum from "@enum/LanguageEnum";

const SwitchLanguage: React.FC = () => {
    const appContext = useContext(AppContext);
    const { currentLanguage, setCurrentLanguage, setAppRouters } = appContext;

    return (
        <div className="sr-swith-language position-absolute">
            <div className={currentLanguage == LanguageEnum.ENGLISH ? "language language-active" : "language"} onClick={() => { setCurrentLanguage(LanguageEnum.ENGLISH); setAppRouters([]) }}>
                {LanguageEnum.ENGLISH}
            </div>
            <div className={currentLanguage == LanguageEnum.POLISH ? "language language-active" : "language"} onClick={() => { setCurrentLanguage(LanguageEnum.POLISH); setAppRouters([]) }}>
                {LanguageEnum.POLISH}
            </div>
            <div className={currentLanguage == LanguageEnum.UKRAINE ? "language language-active" : "language"} onClick={() => { setCurrentLanguage(LanguageEnum.UKRAINE); setAppRouters([]) }}>
                {LanguageEnum.UKRAINE}
            </div>
            <div className={currentLanguage == LanguageEnum.DEUTSCH ? "language language-active" : "language"} onClick={() => { setCurrentLanguage(LanguageEnum.DEUTSCH); setAppRouters([]) }}>
                {LanguageEnum.DEUTSCH}
            </div>
        </div>
    );
}

export default SwitchLanguage;