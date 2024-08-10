import "bootstrap";
import "./styles/bootstrap.css";
import "./styles/base.scss";

import React, { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRouters } from "./routers";

const App: React.FC = () => {

    return (
        <BrowserRouter>
        <div className="sr-app">
            <Header />
            <div className="sr-body">
                <Routes>
                    {AppRouters.map((router) => (
                        <Route path={router.path} element={router.component()} />
                    ))}
                </Routes>
            </div>
            </div>
        </BrowserRouter>
    );
}

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <App></App>
    </StrictMode>
)