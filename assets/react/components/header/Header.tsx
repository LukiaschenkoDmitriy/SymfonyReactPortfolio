import "./header_component.scss";

import React, { useEffect } from "react";
import HeaderButton from "./HeaderButton";
import { AppRouters } from "../../routers";

const Header: React.FC = () => {
    const [appRouters, setAppRouters] = React.useState(AppRouters);

    function switchRouter(routerPath: string) { 
        appRouters.forEach((router, index) => {
            if (router.path === routerPath) {
                AppRouters[index].active = true;
            } else {
                AppRouters[index].active = false;
            }

            setAppRouters([...AppRouters]);
        });
    }
    
    useEffect(() => {

    }, appRouters)

    return (
        <div className="sr-header">
            <div className="container">
                <div className="sr-button-container">
                    {appRouters.map((router) => (
                        <HeaderButton key={router.name} clickHandler={switchRouter} router={router} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header;