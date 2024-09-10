import { AppRouterInterface } from "@app/routers";
import "./Card.scss";

import React, { CSSProperties, useContext } from "react";

import i18nplus from "@services/TranslateService";
import { Link } from "react-router-dom";
import { AppContext } from "@app/app";
import { RouterService } from "@services/RouterService";

export interface CardProps {
    router: AppRouterInterface,
    background?: string
}

const Card: React.FC<CardProps> = ({router, background}) => {

    const AppContent = useContext(AppContext);
    const { appRouters, setAppRouters } = AppContent;

    function switchRouter(routerPath: string) {
        let actualRouters = RouterService.actualiseRoutersActive(appRouters, routerPath);
        setAppRouters([...actualRouters]);
    }

    const innerStyle: CSSProperties = {
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    if (background != null) innerStyle.background = `url('${background}')`;

    return (
        <div className="sr-card col-12 col-md-6 col-lg-4">
            <Link to={router.path} onClick={() => {switchRouter(router.path)}}>
                <div className="inner" style={innerStyle}>
                    {(router.icon != undefined) ? (
                        <img className="card-icon" src={router.icon} alt={router.name} />
                    ) : (
                        <></>
                    )}
                    <h2>{i18nplus(router.name, router.name)}</h2>
                    {(router.points != undefined) ? (
                        <div className="points"><strong>{router.points}/10</strong></div>
                    ) : (
                        <></>
                    )}
                </div>
            </Link>
        </div>
    )
}

export default Card;