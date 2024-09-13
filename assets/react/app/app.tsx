import "bootstrap";

import "@styles/bootstrap.css"
import "@styles/base.scss"

import ReactLoading from 'react-loading';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { createContext, StrictMode, useEffect, useState } from "react";

import { AppRouterInterface, getAppRouters, RouterType } from "@app/routers";

import Header from "@components/header/Header";
import SideBar from "@components/sidebar/SideBar";

import { RouterService } from "@services/RouterService";

import LanguageEnum from "@enum/LanguageEnum";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export interface AppContextInterface { 
    appRouters: AppRouterInterface[],
    setAppRouters: (routers: AppRouterInterface[]) => void,
    currentLanguage: LanguageEnum
    setCurrentLanguage: (language: LanguageEnum) => void
}

export const AppContext = createContext<AppContextInterface>({appRouters: [], setAppRouters: () => { }, currentLanguage: LanguageEnum.ENGLISH, setCurrentLanguage: () => {}});

const App: React.FC = () => {
    const [appRouters, setAppRouters] = useState<AppRouterInterface[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState<LanguageEnum>(LanguageEnum.ENGLISH);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const routers = await getAppRouters(currentLanguage);
            const actualActiveRouters = RouterService.actualiseRoutersActive(routers, location.pathname);
            setAppRouters(actualActiveRouters);
        };

        fetchData();
    }, [currentLanguage]);

    return (
        (appRouters.length === 0) ?
            <div className="vw-100 vh-100 d-flex flex-wrap justify-content-center align-content-center">
                <ReactLoading type="bars" color="#122932" height={"100px"} width={"100px"}/>
            </div>
        :
        <AppContext.Provider value={{ appRouters: appRouters, setAppRouters: setAppRouters, currentLanguage: currentLanguage, setCurrentLanguage: setCurrentLanguage }}>
                <div className="sr-app" id="sr-app-element">
                    <Header />
                    <div className="sr-body">
                        <SideBar />
                        <Routes>
                            {appRouters.map((router) => (
                                <Route key={router.name} path={router.path} element={router.component(router)} />
                            ))}
                            {appRouters.map((router) => (
                                router.underCagetories.map((subcategory) => (
                                    <Route key={subcategory.name+"subcategory"} path={subcategory.path} element={subcategory.component(subcategory)} />
                                ))
                            ))}
                            {appRouters.map((router) => (
                                router.underCagetories.map((subcategory) => (
                                    subcategory.underCagetories.map((subcategory2) => (
                                        (subcategory2.type != RouterType.ACHOR) ? <Route key={subcategory2.name+"subcategory2"} path={subcategory2.path} element={subcategory2.component(subcategory2)} />: null
                                    ))
                                ))
                            ))}
                        </Routes>
                    </div>
                </div>
        </AppContext.Provider>
    );
}

const AppRouters: React.FC = () => {
    return (
        <BrowserRouter>
            <GoogleReCaptchaProvider reCaptchaKey="6LfDY0IqAAAAAK3iVlmhuOqPcSgQWIs2UO7vSDGr">
                <App></App>
            </GoogleReCaptchaProvider>
        </BrowserRouter>
    );
}

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <AppRouters></AppRouters>
    </StrictMode>
)