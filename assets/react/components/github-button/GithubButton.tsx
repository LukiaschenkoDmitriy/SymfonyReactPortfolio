import "./GithubButton.scss";

import React, { ReactNode } from "react";

export interface GithubButtonProps {
    children: ReactNode
};

const GithubButton: React.FC<GithubButtonProps> = ({children}) => {
    return (
        <div className="sr-github-button">
            {children}
        </div>
    );
}

export default GithubButton;