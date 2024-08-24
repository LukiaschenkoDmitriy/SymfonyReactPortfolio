import "./CollectionContent.scss";

import React from "react";

import { ContentProps } from "../FactoryContent";

const CollectionContent: React.FC<ContentProps> = ({router}) => {
    return (
        <div className="sr-about-content">
            Collection Page
        </div>
    );
}

export default CollectionContent;