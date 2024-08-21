import "bootstrap";

import "@styles/bootstrap.css"
import "@styles/base.scss"

import ReactLoading from 'react-loading';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { createContext, StrictMode, useEffect, useState } from "react";

import { AppRouterInterface, getAppRouters } from "@app/routers";

import Header from "@components/header/Header";

import { RouterService } from "@services/RouterService";
import LanguageEnum from "@enum/LanguageEnum";

export interface AppContextInterface { 
    appRouters: AppRouterInterface[],
    setAppRouters: (routers: AppRouterInterface[]) => void,
    currentLanguage: LanguageEnum
}

export const AppContext = createContext<AppContextInterface>({appRouters: [], setAppRouters: () => { }, currentLanguage: LanguageEnum.ENGLISH});

const App: React.FC = () => {
    const [appRouters, setAppRouters] = useState<AppRouterInterface[]>([]);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const routers = await getAppRouters();
            const actualActiveRouters = RouterService.actualiseRoutersActive(routers, location.pathname);

            setAppRouters(actualActiveRouters);
        };

        fetchData();
    }, []);

    return (
        (appRouters.length === 0) ?
            <div className="vw-100 vh-100 d-flex flex-wrap justify-content-center align-content-center">
                <ReactLoading type="bars" color="#122932" height={"100px"} width={"100px"}/>
            </div>    
        :
        <AppContext.Provider value={{ appRouters: appRouters, setAppRouters: setAppRouters, currentLanguage: LanguageEnum.ENGLISH }}>
                <div className="sr-app">
                    <Header />
                    <div className="sr-body">
                        <Routes>
                            {appRouters.map((router) => (
                                <Route key={router.name} path={router.path} element={router.component("")} />
                            ))}
                            {appRouters.map((router) => (
                                router.underCagetories.map((subcategory) => (
                                    <Route key={subcategory.name+"subcategory"} path={subcategory.path} element={subcategory.component("")} />
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
            <App></App>
        </BrowserRouter>
    );
}

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <AppRouters></AppRouters>
    </StrictMode>
)