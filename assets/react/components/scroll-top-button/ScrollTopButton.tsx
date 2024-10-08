import "./ScrollTopButton.scss";

import $ from "jquery";

import React, { useState, useEffect } from 'react';

import { FaArrowUp } from "react-icons/fa";

// This file defines the ScrollToTopButton component, which renders a button to scroll to the top of the page.
// The button becomes visible when the user scrolls down more than 500 pixels and animates the scroll when clicked.

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const srApp = $("#sr-app-element");

    const handleScroll = () => {
        const scrolled = srApp.scrollTop();
        if (scrolled) {
            (scrolled > 500) ? setIsVisible(true) : setIsVisible(false);
        }
    };

    useEffect(() => {
        srApp.on("scroll", handleScroll);

        return () => {
            srApp.off("scroll", handleScroll);
        };
    });

    useEffect(() => {
        isVisible ? $(".sr-scroll-top-button").slideDown(): $(".sr-scroll-top-button").slideUp();
    }, [isVisible])

    const scrollToTop = () => {
        srApp.animate({scrollTop: 0}, "fast");
    };

    return (
        <button
            className='sr-scroll-top-button'
            onClick={scrollToTop}
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTopButton;
