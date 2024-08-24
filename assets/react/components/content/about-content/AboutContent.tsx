import "./AboutContent.scss";

import React from "react";

import { ContentProps } from "../FactoryContent";

const AboutContent: React.FC<ContentProps> = ({router}) => {
    return (
        <div className="sr-about-content">
            About Page
        </div>
    );
}

export default AboutContent;