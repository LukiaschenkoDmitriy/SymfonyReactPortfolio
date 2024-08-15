import "./header_component.scss";

import React, { useContext, useEffect } from "react";

import { AppContext } from "../../app";
import HeaderButton from "./HeaderButton";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import HeaderButtonMobile from "./HeaderButtonMobile";
import { RouterService } from "@services/RouterService";

const Header: React.FC = () => {
    const AppContent = useContext(AppContext)

    const { appRouters, setAppRouters } = AppContent;

    function switchRouter(routerPath: string) {
        let actualRouters = RouterService.actualiseRoutersActive(appRouters, routerPath);
        setAppRouters([...actualRouters]);
    }
    
    useEffect(() => {

    }, appRouters)

    return (
        <>
            <div className="sr-header">
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