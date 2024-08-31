import { AppRouterInterface } from "@app/routers";
import "./Card.scss";

import React, { CSSProperties, useContext } from "react";

import i18nplus from "@services/TranslateService";
import { Link } from "react-router-dom";
import { AppContext } from "@app/app";
import { RouterService } from "@services/RouterService";

export interface CardProps {
    router: AppRouterInterface,
    background: string
}

const Card: React.FC<CardProps> = ({router, background}) => {

    const AppContent = useContext(AppContext);
    const { appRouters, setAppRouters } = AppContent;

    function switchRouter(routerPath: string) {
        let actualRouters = RouterService.actualiseRoutersActive(appRouters, routerPath);
        setAppRouters([...actualRouters]);
    }

    const innerStyle: CSSProperties = {
        background: `url('${background}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    return (
        <div className="sr-card col-12 col-md-6 col-lg-4">
            <Link to={router.path} onClick={() => {switchRouter(router.path)}}>
                <div className="inner" style={innerStyle}>
                    <h2>{i18nplus(router.name, router.name)}</h2>
                </div>
            </Link>
        </div>
    )
}

export default Card;