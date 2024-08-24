import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb";

import React, { useContext } from "react";
import { AppRouterInterface } from "@app/routers";
import { RouterService } from "@services/RouterService";
import { AppContext } from "@app/app";
import i18nplus from "@services/TranslateService";

export interface BreadcrumbProps {
    router: AppRouterInterface
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({router}) => {
    const appContent = useContext(AppContext);

    const location = useLocation();

    return (
        <div>
            {RouterService.getBreadcrumbs(appContent.appRouters, location.pathname).map((breadcrumb) => (
                <Link key={breadcrumb.name+"_breadcrumb"} to={breadcrumb.path}>{i18nplus("header."+breadcrumb.name, breadcrumb.name)} /</Link>
            ))}
        </div>
    );
}

export default Breadcrumb;