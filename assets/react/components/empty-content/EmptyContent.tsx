import "./EmptyContent.scss";

import React from "react";

// This file defines the EmptyContent component, which is used to display a placeholder message when there is no content available.
// The component receives a `text` prop, which is the message to be displayed inside the empty content container.
// The component renders a `div` with the class `sr-empty-content` and displays the provided text inside it.

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