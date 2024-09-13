import "./SideBar.scss";

import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";


import { AppContext } from "@app/app";
import { RouterType } from "@app/routers";

import SwitchLanguage from "@components/switch-language/SwitchLanguage";

import i18nplus from "@services/TranslateService";
import { RouterService } from "@services/RouterService";

import avatarPhoto from "@images/about-page/avatar.png";


const SideBar: React.FC = () => {
    const appContext = useContext(AppContext);
    const location = useLocation();

    const handleSubRouterClick = (routerPath: string) => {
        let actualRouters = RouterService.actualiseRoutersActive(appContext.appRouters, routerPath);
        appContext.setAppRouters([...actualRouters]);
    }

    const currentRouter = RouterService.getActualRouter(appContext.appRouters, location.pathname);

    return (
        <div className="sr-sidebar d-none d-md-flex flex-column">
            <div className="logo-container">
                <div className="logo">
                    <img src={avatarPhoto} alt="" />
                </div>
                <p className="username">Dmytrii Lukiashchenko</p>
                <p className="role">{i18nplus("sidebar.role", "sidebar.role")}</p>
            </div>
            <div className="navigation-container flex-grow-1">
                <SwitchLanguage/>
                <div className="navigation-title">
                    <strong>{i18nplus("sidebar.page_nav", "sidebar.page_nav")}</strong>
                </div>

                <div className="navigation-inner text-center">
                    {(currentRouter?.underCagetories.length != 0) ? (
                        currentRouter?.underCagetories[0].type == RouterType.ROUTER ? (
                            <div key={currentRouter.name}>
                                {currentRouter.underCagetories.map((subRouter) => (
                                    <Link className="d-block" key={subRouter.name+"sidebar"} to={subRouter.path} onClick={() => handleSubRouterClick(subRouter.path)}>
                                        { i18nplus(subRouter.name, subRouter.name) }
                                    </Link>
                                ))}
                            </div>
                        ): currentRouter?.underCagetories[0].type == RouterType.ACHOR ? 
                            (
                                <div key={currentRouter.name}>
                                    {currentRouter.underCagetories.map((subRouter) => (
                                        <a className="d-block" href={`${subRouter.path}`} key={subRouter.name+"sidebar"}>
                                            { i18nplus(subRouter.name, subRouter.name) }
                                        </a>
                                    ))}
                                </div>
                            ):
                            (
                                <a className="d-block"> Routers or Achors Not Found </a>
                            )
                        
                    ): <a className="d-block"> Routers or Achors Not Found </a>}
                </div>
            </div>
        </div>
    )
}

export default SideBar;