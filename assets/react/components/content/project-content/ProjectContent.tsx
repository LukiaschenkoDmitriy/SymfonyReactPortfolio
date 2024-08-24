import "./ProjectContent.scss";

import React from "react";

import { ContentProps } from "../FactoryContent";

const ProjectContent: React.FC<ContentProps> = ({router}) => {
    return (
        <div className="sr-about-content">
            Project Page
        </div>
    );
}

export default ProjectContent;