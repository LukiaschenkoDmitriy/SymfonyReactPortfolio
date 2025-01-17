import { AppRouterInterface } from "@app/routers";
import "./Card.scss";

import React, { CSSProperties, useContext } from "react";

import i18nplus from "@services/TranslateService";
import { Link } from "react-router-dom";
import { AppContext } from "@app/app";
import { RouterService } from "@services/RouterService";

import { motion } from "framer-motion";
import { CardItemAnimation } from "@app/animations";

// This file defines the Card component, which represents a card item with a background image and optional content (e.g., icon, points, role).
// The component uses framer-motion for animations and applies styles dynamically based on props.
// It includes a function to update the application's router context and renders a link to navigate to the card's path.

export interface CardProps {
    router: AppRouterInterface,
    background?: string
    index?: number
}

const Card: React.FC<CardProps> = ({router, background, index}) => {

    const AppContent = useContext(AppContext);
    const { appRouters, setAppRouters } = AppContent;

    function switchRouter(routerPath: string) {
        let actualRouters = RouterService.actualiseRoutersActive(appRouters, routerPath);
        setAppRouters([...actualRouters]);
    }

    const innerStyle: CSSProperties = {
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: background ? `url('${background}')` : undefined
    };

    const backgroundFilterStyle: CSSProperties = {
        width: "100%",
        position: "absolute",
        height: "100%",
        background: "rgba(0, 0, 0, 0.3)",
        top: 0,
        left: 0,
    }

    return (
        <motion.div
            className="sr-card col-12 col-lg-6 col-xl-4"
            key={"card_animation_"+router.name}
            whileHover={"hover"}
            custom={index}
            initial="out"
            animate="in"
            exit="out"
            variants={CardItemAnimation}
        >
            <Link to={router.path} onClick={() => {switchRouter(router.path)}}>
                <div className="inner" style={innerStyle}>
                    <div className="backgroundFilter" style={background ? backgroundFilterStyle : {}}></div>
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
                    {router.role != undefined ? (
                        <div className="role my-4"><strong>{i18nplus(router.role, router.role)}</strong></div>
                    ): (
                        <></>
                    )}
                </div>
            </Link>
        </motion.div>
    )
}

export default Card;