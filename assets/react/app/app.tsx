// This file initializes the main React application and sets up routing and global context.
// It uses framer-motion for animations and react-google-recaptcha for CAPTCHA validation.
// The application is wrapped in a BrowserRouter for routing and GoogleReCaptchaProvider for reCAPTCHA support.

import "bootstrap";
import "@styles/bootstrap.css";
import "@styles/base.scss";

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

// Context interface for managing global state
export interface AppContextInterface { 
    appRouters: AppRouterInterface[];
    setAppRouters: (routers: AppRouterInterface[]) => void;
    currentLanguage: LanguageEnum;
    setCurrentLanguage: (language: LanguageEnum) => void;
}

// Create a context with default values for routing and language
export const AppContext = createContext<AppContextInterface>({
    appRouters: [],
    setAppRouters: () => { },
    currentLanguage: LanguageEnum.ENGLISH,
    setCurrentLanguage: () => { }
});

// Main application component
const App: React.FC = () => {
    // State to manage application routes and language
    const [appRouters, setAppRouters] = useState<AppRouterInterface[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState<LanguageEnum>(LanguageEnum.ENGLISH);
    const location = useLocation();

    // Fetch routes based on the current language and update state
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
            {appRouters.length === 0 ? (
                // Show loading animation while routes are being fetched
                <motion.div
                    key="loading_animation"
                    initial="out"
                    animate="in"
                    exit="out"
                    variants={LoadingAnimation}
                >
                    <div className="vw-100 vh-100 d-flex flex-wrap justify-content-center align-content-center">
                        <ReactLoading type="bars" color="#122932" height="100px" width="100px"/>
                    </div>
                </motion.div>
            ) : (
                // Provide context values and render application components
                <AppContext.Provider value={{ appRouters, setAppRouters, currentLanguage, setCurrentLanguage }}>
                    <div className="sr-app" id="sr-app-element">
                        <AnimatePresence mode="wait">
                            {/* Render header with animation */}
                            <motion.div
                                key={`header_animation_${currentLanguage}`}
                                initial="out"
                                animate="in"
                                exit="exit"
                                variants={HeaderAnimation}
                            >
                                <Header />
                            </motion.div>
                        </AnimatePresence>
                        <div className="sr-body">
                            {/* Render sidebar with animation */}
                            <motion.div
                                key={`sidebar_animation_${currentLanguage}`}
                                initial="out"
                                animate="in"
                                exit="exit"
                                variants={SideBarAnimation}
                            >
                                <SideBar />
                            </motion.div>
                            <AnimatePresence mode="wait">
                                {/* Define routes based on the current path and language */}
                                <Routes location={location} key={`${location.pathname}_${currentLanguage}`}>
                                    {RouterService.getAllRouters(appRouters).map((router) => (
                                        <Route key={router.name} path={router.path} element={router.component(router)} />
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

// Root component to wrap the application with Router and reCAPTCHA provider
const AppRouters: React.FC = () => {
    return (
        <BrowserRouter>
            <GoogleReCaptchaProvider reCaptchaKey="6LfDY0IqAAAAAK3iVlmhuOqPcSgQWIs2UO7vSDGr">
                <App />
            </GoogleReCaptchaProvider>
        </BrowserRouter>
    );
}

// Render the application root
createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <AppRouters />
    </StrictMode>
);
