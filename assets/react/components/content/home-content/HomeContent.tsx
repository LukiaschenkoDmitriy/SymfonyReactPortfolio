import "./HomeContent.scss";

import React, { CSSProperties } from "react";

import { ContentProps } from "../FactoryContent";

import Breadcrumb from "@components/breadcrumb/Breadcrumb";

import Card from "../collection-content/card/Card";
import i18nplus from "@services/TranslateService";

import { AnimatePresence } from "framer-motion";

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