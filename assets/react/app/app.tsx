import "bootstrap";

import "@styles/bootstrap.css"
import "@styles/base.scss"

import ReactLoading from 'react-loading';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { createContext, StrictMode, useEffect, useState } from "react";

import { AppRouterInterface, getAppRouters } from "@app/routers";

import Header from "@components/header/Header";
import SideBar from "@components/sidebar/SideBar";

import { RouterService } from "@services/RouterService";

import LanguageEnum from "@enum/LanguageEnum";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { AnimatePresence, motion } from "framer-motion";
import { HeaderAnimation, LoadingAnimation, SideBarAnimation } from "./animations";


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
        <AnimatePresence mode="wait">
            {(appRouters.length === 0) ? (
                <motion.div
                    key={"loading_animation"}
                    initial="out"
                    animate="in"
                    exit="out"
                    variants={LoadingAnimation}
                >
                    <div className="vw-100 vh-100 d-flex flex-wrap justify-content-center align-content-center">
                        <ReactLoading type="bars" color="#122932" height={"100px"} width={"100px"}/>
                    </div>
                </motion.div>
            ) : (
                <AppContext.Provider value={{ appRouters: appRouters, setAppRouters: setAppRouters, currentLanguage: currentLanguage, setCurrentLanguage: setCurrentLanguage }}>
                    <div className="sr-app" id="sr-app-element">
                        <AnimatePresence>
                            <motion.div
                                key={"header_animation_"+currentLanguage}
                                initial="out"
                                animate="in"
                                exit="exit"
                                variants={HeaderAnimation}
                            >
                                <Header />
                            </motion.div>
                        </AnimatePresence>
                        <div className="sr-body">
                            <motion.div
                                key={"sidebar_animation_"+currentLanguage}
                                initial="out"
                                animate="in"
                                exit="exit"
                                variants={SideBarAnimation}
                            >
                                <SideBar />
                            </motion.div>
                            <AnimatePresence mode="wait">
                                <Routes location={location} key={location.pathname+"_"+currentLanguage}>
                                    {RouterService.getAllRouters(appRouters).map((router) => (
                                        <Route key={router.name} path={router.path} element={
                                            router.component(router)
                                        } />
                                    ))}
                                </Routes>
                            </AnimatePresence>
                        </div>
                    </div>
                </AppContext.Provider>
            )}
        </AnimatePresence>
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