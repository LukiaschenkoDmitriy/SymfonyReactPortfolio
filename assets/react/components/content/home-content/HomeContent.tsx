import "./HomeContent.scss";

import React, { CSSProperties } from "react";

import { ContentProps } from "../FactoryContent";

import Breadcrumb from "@components/breadcrumb/Breadcrumb";

import Card from "../collection-content/card/Card";
import i18nplus from "@services/TranslateService";

import { AnimatePresence } from "framer-motion";

// This file defines the HomeContent component, which serves as the main page for the home section of the site.
// It sets the document title to "Dmytrii Lukiashchenko" and applies a background image to the page based on the router's background property.
// The component uses framer-motion's AnimatePresence to handle animations for the display of cards representing categories or items.
// Breadcrumb navigation is included at the top, and the content is displayed in a grid layout with cards for each subrouter.

const HomeContent: React.FC<ContentProps> = ({router}) => {

    document.title = "Dmytrii Lukiashchenko";

    const pageStyles: CSSProperties = {
        background: `url('${router.background}')`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }

    return (
        <div className="sr-home-content sr-content-inner" style={pageStyles}>
            <div className="container my-5">
                <Breadcrumb router={router}/>
                <section className="sr-content-page sr-home-page">
                    <h1 className="title">{i18nplus(router.name, router.name)}</h1>
                    <div className="home-content row">
                        <AnimatePresence mode="wait">
                            {router.underCagetories.map((subrouter, index) => (
                                <Card key={subrouter.name+"_home_page"} index={index} router={subrouter} background={subrouter.background}/>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default HomeContent;