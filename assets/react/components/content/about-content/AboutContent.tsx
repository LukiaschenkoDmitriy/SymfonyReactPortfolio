import "./AboutContent.scss";

import imgPhoto from "@images/about-page/photo.jpg";
import imgEducation from "@images/about-page/wspa.png";

import React from "react";

import { ContentProps } from "../FactoryContent";

import Breadcrumb from "@components/breadcrumb/Breadcrumb";

import i18nplus from "@services/TranslateService";
import Language from "./language/Language";
import PersonalSkill from "./personal-skill/PersonalSkill";

const AboutContent: React.FC<ContentProps> = ({router}) => {
    return (
        <div className="sr-content-inner sr-content-inner-about">
            <div className="container my-5">
                <Breadcrumb router={router}/>
                <section className="sr-about-content sr-content-page vh-100" id="about-me-info">
                    <h1 className="title">{i18nplus("about_page.about_me", "about_page.about_me")}</h1>
                    <div className="sr-about-container">
                        <div className="sr-about-row row">
                            <div className="description col-12 col-lg-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                            <div className="image col-12 col-lg-6">
                                <img src={imgPhoto} alt="Photo" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="sr-education-content sr-content-page vh-100" id="education-info">
                    <h1 className="title">{i18nplus("about_page.education", "about_page.education")}</h1>
                    <div className="sr-about-container">
                        <div className="sr-about-row row">
                            <div className="image col-12 col-lg-6">
                                <img src={imgEducation} alt="Photo" />
                            </div>
                            <div className="description col-12 col-lg-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                </section>
                <section className="sr-languages-content sr-content-page vh-100" id="languages-info">
                    <h1 className="title">{i18nplus("about_page.languages", "about_page.languages")}</h1>
                    <div className="sr-about-container">
                        <div className="sr-about-row">
                            <div className="languages">
                                <Language name={i18nplus("languages.ukraine", "languages.ukraine")} level="C2"/>
                                <Language name={i18nplus("languages.russian", "languages.russian")} level="C1"/>
                                <Language name={i18nplus("languages.polish", "languages.polish")} level="B1"/>
                                <Language name={i18nplus("languages.english", "languages.english")} level="A2"/>
                                <Language name={i18nplus("languages.deutsch", "languages.deutsch")} level="A0"/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="sr-personal-skills-content sr-content-page vh-100" id="personal-skills-info">
                    <h1 className="title">{i18nplus("about_page.personal_skills", "about_page.personal_skills")}</h1>
                    <div className="sr-about-container">
                        <div className="sr-about-row">
                            <div className="personal-skills">
                                <PersonalSkill name={i18nplus("personal_skill.responsibility", "personal_skill.responsibility")} level={7}/>
                                <PersonalSkill name={i18nplus("personal_skill.communication", "personal_skill.communication")} level={7}/>
                                <PersonalSkill name={i18nplus("personal_skill.teamwork", "personal_skill.teamwork")} level={7}/>
                                <PersonalSkill name={i18nplus("personal_skill.mindfulness", "personal_skill.indfulness")} level={6}/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AboutContent;