import "./HomeContent.scss";

import React, { CSSProperties } from "react";

import { ContentProps } from "../FactoryContent";

import Breadcrumb from "@components/breadcrumb/Breadcrumb";

import Card from "../collection-content/card/Card";
import i18nplus from "@services/TranslateService";

const HomeContent: React.FC<ContentProps> = ({router}) => {

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
                        {router.underCagetories.map((subrouter) => (
                            <Card key={subrouter.name+"_home_page"} router={subrouter} background={subrouter.background}/>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default HomeContent;