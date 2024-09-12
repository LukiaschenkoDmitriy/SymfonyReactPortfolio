import "./EmptyContent.scss";

import React from "react";

export interface EmptyContentProps {
    text: string
}

const EmptyContent: React.FC<EmptyContentProps> = ({text}) => {
    return (
        <div className="sr-empty-content">
            {text}
        </div>
    )
}

export default EmptyContent;