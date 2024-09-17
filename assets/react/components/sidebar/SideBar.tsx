import "./SideBar.scss";

import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { AppContext } from "@app/app";
import { RouterType } from "@app/routers";

import SwitchLanguage from "@components/switch-language/SwitchLanguage";

import i18nplus from "@services/TranslateService";
import { RouterService } from "@services/RouterService";

import avatarPhoto from "@images/about-page/avatar.png";
import Contacts from "@components/contacts/Contacts";

import { AnimatePresence, motion } from "framer-motion";
import { SideBarItemAnimation } from "@app/animations";


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
                <Contacts />    
                <SwitchLanguage/>
                <div className="navigation-title">
                    <strong>{i18nplus("sidebar.page_nav", "sidebar.page_nav")}</strong>
                </div>

                <div className="navigation-inner text-center">
                    <AnimatePresence mode="wait">
                        {(currentRouter?.underCagetories.length != 0) ? (
                            currentRouter?.underCagetories[0].type == RouterType.ROUTER ? (
                                <div key={currentRouter.name}>
                                    {currentRouter.underCagetories.map((subRouter, index) => (
                                        <motion.div 
                                            key={subRouter.name+"sidebar"}
                                            custom={index}
                                            initial="out"
                                            animate="in"
                                            exit="out"
                                            variants={SideBarItemAnimation}
                                        >
                                            <Link className="d-block" to={subRouter.path} onClick={() => handleSubRouterClick(subRouter.path)}>
                                                { i18nplus(subRouter.name, subRouter.name) }
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            ): currentRouter?.underCagetories[0].type == RouterType.ACHOR ? 
                                (
                                    <div key={currentRouter.name}>
                                        {currentRouter.underCagetories.map((subRouter, index) => (
                                            <motion.div 
                                                key={subRouter.name+"sidebar"}
                                                custom={index}
                                                initial="out"
                                                animate="in"
                                                exit="out"
                                                variants={SideBarItemAnimation}
                                            >
                                                <a className="d-block" href={`${subRouter.path}`}>
                                                    { i18nplus(subRouter.name, subRouter.name) }
                                                </a>
                                            </motion.div>
                                        ))}
                                    </div>
                                ):
                                (
                                    <a className="d-block"> Routers or Achors Not Found </a>
                                )
                            
                        ): <a className="d-block"> Routers or Achors Not Found </a>}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default SideBar;