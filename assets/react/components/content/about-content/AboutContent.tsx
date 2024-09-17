import "./AboutContent.scss";

import imgPhoto from "@images/about-page/photo.jpg";
import imgEducation from "@images/about-page/wspa.png";

import React, { CSSProperties } from "react";

import Language from "./language/Language";
import { ContentProps } from "../FactoryContent";
import PersonalSkill from "./personal-skill/PersonalSkill";

import Breadcrumb from "@components/breadcrumb/Breadcrumb";

import i18nplus from "@services/TranslateService";

import { AnimatePresence, motion } from "framer-motion";
import { AboutItemAnimation } from "@app/animations";

const AboutContent: React.FC<ContentProps> = ({router}) => {

    document.title = i18nplus(router.name, router.name);

    const pageStyles: CSSProperties = {
        background: `url('${router.background}')`,
    }

    return (
        <div className="sr-content-inner sr-content-inner-about" style={pageStyles}>
            <div className="container my-5">
                <Breadcrumb router={router}/>
                <AnimatePresence mode="wait">
                    <motion.section className="sr-about-content sr-content-page" id="about-me-info" key="about-me-info"
                        initial="out"
                        whileTap="hover"
                        whileInView="inView"
                        variants={AboutItemAnimation}
                    >
                        <h1 className="title">{i18nplus("about_page.about_me", "about_page.about_me")}</h1>
                        <div className="sr-about-container">
                            <div className="sr-about-row row">
                                <div className="description col-12 col-lg-6">
                                    <strong>{i18nplus("about_page.description", "about_page.description")}</strong>
                                </div>
                                <div className="image col-12 col-lg-6">
                                    <img src={imgPhoto} alt="Photo" />
                                </div>
                            </div>
                        </div>
                    </motion.section>
                    <motion.section className="sr-education-content sr-content-page" id="education-info" key="education-info"
                        initial="out"
                        whileTap="hover"
                        whileInView="inView"
                        variants={AboutItemAnimation}
                    >
                        <h1 className="title">{i18nplus("about_page.education", "about_page.education")}</h1>
                        <div className="sr-about-container">
                            <div className="sr-about-row row">
                                <div className="image col-12 col-lg-6">
                                    <img src={imgEducation} alt="Photo" />
                                </div>
                                <div className="description col-12 col-lg-6">
                                    <strong>{i18nplus("about_page.education_description", "about_page.education_description")}</strong>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                    <motion.section className="sr-languages-content sr-content-page" id="languages-info" key="languages-info"
                        initial="out"
                        whileInView="inView"
                        whileTap="hover"
                        variants={AboutItemAnimation}
                    >
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
                    </motion.section>
                    <motion.section className="sr-personal-skills-content sr-content-page" id="personal-skills-info" key="personal-skills"
                        initial="out"
                        whileInView="inView"
                        whileTap="hover"
                        variants={AboutItemAnimation}
                    >
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
                    </motion.section>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default AboutContent;