import "./Footer.scss";

import React, { useContext } from "react";

import { AppContext } from "@app/app";

import { RouterService } from "@services/RouterService";

import HeaderButtonMobile from "@components/header/header-button-mobile/HeaderButtonMobile";

// This file defines the Footer component, which renders navigation buttons for each router in the app.
// The component uses the AppContext to access and update the appRouters state.
// The `switchRouter` function updates the active routers when a button is clicked.
// The component maps over `appRouters` and `underCagetories` to generate `HeaderButtonMobile` components for navigation.

const Footer:React.FC = () => {

    const AppContent = useContext(AppContext);
    const { appRouters, setAppRouters } = AppContent;

    function switchRouter(routerPath: string) {
        let actualRouters = RouterService.actualiseRoutersActive(appRouters, routerPath);
        setAppRouters([...actualRouters]);
    }

    return (
        <div className="sr-footer">
            {appRouters.map((router) => (
                <HeaderButtonMobile key={router.name+"_mobile26"+ Math.random()*100} clickHandler={switchRouter} router={router} />
            ))}
            {appRouters[0].underCagetories.map((router) => (
                <HeaderButtonMobile key={router.name+"_mobile27"+ Math.random()*100} clickHandler={switchRouter} router={router} />
            ))}
        </div>
    )
}

export default Footer;

