import "./CollectionContent.scss";

import React, { CSSProperties } from "react";

import Card from "./card/Card";
import { ContentProps } from "../FactoryContent";

import Breadcrumb from "@components/breadcrumb/Breadcrumb";

import i18nplus from "@services/TranslateService";

import { AnimatePresence } from "framer-motion";

const CollectionContent: React.FC<ContentProps> = ({router}) => {

    document.title = i18nplus(router.name, router.name);

    const pageStyles: CSSProperties = {
        backgroundImage: `url('${router.background}')`,
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
                                <Card key={subrouter.name+"_collection_page"} index={index} router={subrouter} background={subrouter.background}/>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CollectionContent;