import "./ContactContent.scss";

import React from "react";

import { ContentProps } from "../FactoryContent";

const ContactContent: React.FC<ContentProps> = ({router}) => {
    return (
        <div className="sr-about-content">
            Contact Page
        </div>
    );
}

export default ContactContent;