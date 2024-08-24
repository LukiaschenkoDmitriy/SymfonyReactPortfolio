import "./Header.scss";

import React, { useContext, useEffect } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";

import { AppContext } from "@app/app";

import HeaderButton from "@components/header/header-button/HeaderButton";
import HeaderButtonMobile from "@components/header/header-button-mobile/HeaderButtonMobile";

import { RouterService } from "@services/RouterService";
import SwitchLanguage from "./switch-language/SwitchLanguage";

const Header: React.FC = () => {
    // Use the AppContext to access and update appRouters state
    const AppContent = useContext(AppContext);
    const { appRouters, setAppRouters } = AppContent;

    // Function to switch the active router and update appRouters state
    function switchRouter(routerPath: string) {
        let actualRouters = RouterService.actualiseRoutersActive(appRouters, routerPath);
        setAppRouters([...actualRouters]);
    }
    
    // Update the active router when appRouters state changes
    useEffect(() => {

    }, [appRouters])

    return (
        <>
            <div className="sr-header position-fixed">
                <SwitchLanguage/>
                <div className="sr-header-container">
                    <div className="sr-button-container d-none d-md-flex">
                        {appRouters.map((router) => (
                            <HeaderButton key={router.name} clickHandler={switchRouter} router={router} />
                        ))}
                        {appRouters[0].underCagetories.map((router) => (
                            <HeaderButton key={router.name} clickHandler={switchRouter} router={router} />
                        ))}
                    </div>
                    <div className="sr-button-mobile d-flex d-md-none">
                        <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                            <IoIosMenu></IoIosMenu>
                        </a>
                    </div>
                </div>
            </div>
            <div className="offcanvas offcanvas-start" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5>
                    <button type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <IoMdClose></IoMdClose>
                    </button>
                </div>
                <div className="offcanvas-body">
                    {appRouters.map((router) => (
                        <HeaderButtonMobile key={router.name+"_mobile22"+ Math.random()*100} clickHandler={switchRouter} router={router} />
                    ))}
                    {appRouters[0].underCagetories.map((router) => (
                        <HeaderButtonMobile key={router.name+"_mobile23"+ Math.random()*100} clickHandler={switchRouter} router={router} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Header;