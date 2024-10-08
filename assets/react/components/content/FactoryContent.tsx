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

// This file defines the FactoryContent component, which is responsible for rendering different types of page content based on the `pageType` prop.
// It uses the `useLocation` hook to detect route changes and invokes `RouterService.toTopScroll()` to scroll to the top of the page on route changes.
// The `getContent` function determines which content component to render based on the `pageType` (e.g., ProjectContent, ExperienceContent, etc.).
// The component uses `motion.div` from `framer-motion` to apply animations during transitions between different content sections.
// Additionally, it includes a ScrollToTopButton and a Footer component for improved user experience and navigation.
// If no matching `pageType` is found, a 404 error message is displayed.

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