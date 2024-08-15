import "./HeaderButton.scss";

import React from "react";
import { Link } from "react-router-dom";

import i18next from "@app/i18n";
import { AppRouterInterface } from "@app/routers";


export interface HeaderButtonProps { 
    router: AppRouterInterface,
    clickHandler: (routerName: string) => void,
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ router, clickHandler }) => {
    const { t } = i18next;
    return (
        <Link onClick={() => { clickHandler(router.path) }} to={router.path} className={`sr-header-button ${router.active ? 'sr-header-button-active' : ''}`}>
            {t("header."+router.name)}
        </Link>
    );
}

export default HeaderButton;