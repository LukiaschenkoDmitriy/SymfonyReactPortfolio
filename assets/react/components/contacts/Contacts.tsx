import "./Contacts.scss";

import React from "react";

import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaGitlab } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

// This file defines a Contacts component for displaying various contact links.
// It renders a list of social media and contact icons as clickable links, opening in a new tab.
// The component includes links to GitHub, GitLab, LinkedIn, Telegram, Facebook, and a telephone link.

const Contacts: React.FC = () => {
    return (
        <div className="sr-contacts">
            <a className="sr-contact" href="https://github.com/LukiaschenkoDmitriy" target="_blank"><FaGithub /></a>
            <a className="sr-contact" href="https://gitlab.com/LukiaschenkoDmitriy" target="_blank"><FaGitlab /></a>
            <a className="sr-contact" href="https://www.linkedin.com/in/dmytrii-lukiashchenko-490987282/" target="_blank"><FaLinkedin /></a>
            <a className="sr-contact" href="https://t.me/dmlukiashchenko" target="_blank"><FaTelegram /></a>
            <a className="sr-contact" href="https://www.facebook.com/dmLukiaschenko/" target="_blank"><FaFacebook /></a>
            <a className="sr-contact" href="tel:+48883757093" target="_blank"><BsFillTelephoneFill /></a>
        </div>
    )
}

export default Contacts;