import "./Breadcrumb.scss";

import { Link, useLocation } from "react-router-dom";

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

    const breadcrumbs = RouterService.getBreadcrumbs(appContent.appRouters, location.pathname);

    return (
        <div className="sr-breacrumb">
            {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.name + "_breadcrumb_" + index}>
                    <Link key={breadcrumb.name+"_breadcrumb"} to={breadcrumb.path}>
                        {i18nplus("header."+breadcrumb.name, breadcrumb.name)}
                    </Link>
                    {breadcrumbs.length > breadcrumbs.indexOf(breadcrumb) + 1 ? <span key={breadcrumb.name+"_breacrumb_span"}> / </span>: <span key={breadcrumb.name+"_breacrumb_span"}></span>}
                </React.Fragment>
            ))}
        </div>
    );
}

export default Breadcrumb;