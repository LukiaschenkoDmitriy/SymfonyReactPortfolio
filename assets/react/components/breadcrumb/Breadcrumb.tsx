import "./Breadcrumb.scss";

import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { AppContext } from "@app/app";
import { AppRouterInterface } from "@app/routers";

import i18nplus from "@services/TranslateService";
import { RouterService } from "@services/RouterService";

// This file defines a Breadcrumb component for displaying navigation breadcrumbs.
// It utilizes the `AppContext` to access current app routes and updates the active routes based on user interaction.
// It uses `RouterService` to generate breadcrumb links from the current URL path and `TranslateService` for translations.
// The breadcrumbs are rendered as clickable links that update the route context when clicked.

export interface BreadcrumbProps {
    router: AppRouterInterface
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({router}) => {
    const appContent = useContext(AppContext);

    const { appRouters, setAppRouters } = appContent;

    const location = useLocation();

    const breadcrumbs = RouterService.getBreadcrumbs(appContent.appRouters, location.pathname);

    function switchRouter(routerPath: string) {
        let actualRouters = RouterService.actualiseRoutersActive(appRouters, routerPath);
        setAppRouters([...actualRouters]);
    }

    return (
        <div className="sr-breacrumb">
            {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.name + "_breadcrumb_" + index}>
                    <Link key={breadcrumb.name+"_breadcrumb"} to={breadcrumb.path} onClick={() => { switchRouter(breadcrumb.path) }}>
                        {i18nplus(breadcrumb.name, breadcrumb.name)}
                    </Link>
                    {breadcrumbs.length > breadcrumbs.indexOf(breadcrumb) + 1 ? <span key={breadcrumb.name+"_breacrumb_span"}> / </span>: <span key={breadcrumb.name+"_breacrumb_span"}></span>}
                </React.Fragment>
            ))}
        </div>
    );
}

export default Breadcrumb;