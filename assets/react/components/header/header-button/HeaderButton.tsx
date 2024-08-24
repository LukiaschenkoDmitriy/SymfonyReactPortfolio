import "./HeaderButton.scss";

import React from "react";
import { Link } from "react-router-dom";

import i18next from "@app/i18n";
import { AppRouterInterface } from "@app/routers";
import i18nplus from "@services/TranslateService";

// Define the props interface for the HeaderButton component
export interface HeaderButtonProps { 
    router: AppRouterInterface, // The router object to be displayed in the button
    clickHandler: (routerName: string) => void, // The function to be called when the button is clicked
}

// Functional component for the HeaderButton
const HeaderButton: React.FC<HeaderButtonProps> = ({ router, clickHandler }) => {
    const { t } = i18next; // Use i18next for translation

    // Render the button with the router's name and active state
    return (
        <Link 
            onClick={() => { clickHandler(router.path) }} // Call the clickHandler with the router's path when the button is clicked
            to={router.path} // Navigate to the router's path when the button is clicked
            className={`sr-header-button ${router.active ? 'sr-header-button-active' : ''}`} // Apply the 'sr-header-button-active' class if the router is active
        >
            {i18nplus("header."+router.name, router.name)}
        </Link>
    );
}

export default HeaderButton; // Export the HeaderButton component