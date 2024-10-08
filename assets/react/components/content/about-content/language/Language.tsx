import "./Language.scss";

import React from "react";

export interface LanguageProps {
    name: string,
    level: string
}

const Language: React.FC<LanguageProps> = ({name, level}) => {

    return (
        <div className="sr-language-wrapper">
            <div className="sr-language row">
                <div className="name col-12 col-lg-6">
                    <strong>{name}</strong>
                </div>
                <div className="rate col-12 col-lg-6">
                    <strong>{level}</strong>
                </div>
            </div>
        </div>
    )
}

export default Language;