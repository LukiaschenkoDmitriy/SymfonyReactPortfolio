import "./HomeContent.scss";

import React from "react";

import { ContentProps } from "../FactoryContent";

const HomeContent: React.FC<ContentProps> = ({router}) => {
    return (
        <div className="sr-about-content">
            Home Page
        </div>
    );
}

export default HomeContent;