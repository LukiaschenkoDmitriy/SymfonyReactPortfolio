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
            <div className="sr-header position-relative">
                <SwitchLanguage/>
                <div className="container">
                    <div className="sr-button-container d-none d-lg-flex">
                        {appRouters.map((router) => (
                            <HeaderButton key={router.name} clickHandler={switchRouter} router={router} />
                        ))}
                    </div>
                    <div className="sr-button-mobile d-flex d-lg-none">
                        <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                            <IoIosMenu></IoIosMenu>
                        </a>
                    </div>
                </div>
            </div>
            <div className="offcanvas offcanvas-start" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Dmytrii Lukiashchenko</h5>
                    <button type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <IoMdClose></IoMdClose>
                    </button>
                </div>
                <div className="offcanvas-body">
                    {appRouters.map((router) => (
                        <HeaderButtonMobile key={router.name+"_mobile"} clickHandler={switchRouter} router={router} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Header;