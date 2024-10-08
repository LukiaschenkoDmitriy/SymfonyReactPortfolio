import "./GithubButton.scss";

import React, { ReactNode } from "react";

// This file defines the GithubButton component, which is a wrapper for rendering GitHub-related content.
// It takes children as a prop and displays them inside a styled container.

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