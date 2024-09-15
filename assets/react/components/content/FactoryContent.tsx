import "./FactoryContent.scss";

import React, { useEffect } from "react";

import { AppRouterInterface, PageType } from "@app/routers";

import HomeContent from "./home-content/HomeContent";
import SkillContent from "./skill-content/SkillContent";
import AboutContent from "./about-content/AboutContent";
import ContactContent from "./contact-content/ContactContent";
import ProjectContent from "./project-content/ProjectContent";
import ExperienceContent from "./experience-content/ExperienceContent";
import CollectionContent from "./collection-content/CollectionContent";
import Footer from "@components/footer/Footer";
import ScrollToTopButton from "../scroll-top-button/ScrollTopButton";

import { useLocation } from "react-router-dom";

import { motion } from "framer-motion";
import { ContentAnimation } from "@app/animations";
import { RouterService } from "@services/RouterService";

export interface FactoryContentProps {
    router: AppRouterInterface,
    pageType: PageType
}

export interface ContentProps {
    router: AppRouterInterface
}

const FactoryContent: React.FC<FactoryContentProps> = ({router, pageType}) => {

    const location = useLocation();

    useEffect(() => {
        RouterService.toTopScroll();
    }, [])

    const getContent = () => {
        switch (pageType) {
            case PageType.PROJECT:
                return (
                    <ProjectContent router={router}/>
                );
            case PageType.EXPERIENCE:
                return (
                    <ExperienceContent router={router}/>
                );
                
            case PageType.SKILL:
                return (
                    <SkillContent router={router}/>
                );
            case PageType.HOME:
                return (
                    <HomeContent router={router}/>
                );
            case PageType.ABOUT_ME:
                return (
                    <AboutContent router={router}/>
                );
            case PageType.CONTACT:
                return (
                    <ContactContent router={router}/>
                );
            case PageType.COLLECTION:
                return (
                    <CollectionContent router={router}/>
                );
            default:
                return <div>404 Not Found</div>;
        }
    }

    return (
        <div className="sr-container">
            <ScrollToTopButton/>
                <motion.div
                    initial="out"
                    animate="in"
                    exit="exit"
                    variants={ContentAnimation}
                >
                    {getContent()}
                </motion.div>
            <Footer />
        </div>
    );
}

export default FactoryContent;