import "./AboutContent.scss";

import React from "react";

import { ContentProps } from "../FactoryContent";
import Breadcrumb from "@components/breadcrumb/Breadcrumb";
import i18nplus from "@services/TranslateService";

const AboutContent: React.FC<ContentProps> = ({router}) => {
    return (
        <div className="sr-content-inner sr-content-inner-about">
            <div className="container my-5">
                <Breadcrumb router={router}/>
                <div className="sr-about-content" id="#about-me-info">
                    <h1 className="title">{i18nplus("header."+router.name, router.name)}</h1>
                    <div className="sr-about-container">
                        <div className="sr-about-row row">
                            <div className="description col-12 col-lg-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                            <div className="image col-12 col-lg-6">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutContent;