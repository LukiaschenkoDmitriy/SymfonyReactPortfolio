import "./ContactContent.scss";

import React, { CSSProperties, useEffect, useState } from "react";

import { ContentProps } from "../FactoryContent";

import i18nplus from "@services/TranslateService";


import Breadcrumb from "@components/breadcrumb/Breadcrumb";

import ContactEntity from "@data/ContactEntity";

import ContactDTO, { ContactDTOErrors } from "@dto/ContactDTO";
import APIService from "@api/APIService";

import contactBackground from "@images/contacts-page/send-message-bg.png";

import { HttpStatusCode } from "axios";

import {useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { AnimatePresence, motion } from "framer-motion";

import { ContactGroupAnimation, ContactGroupErrorAnumation } from "@app/animations";

// This file defines the ContactContent component, which includes a contact form with fields for name, email, theme, and message.
// It uses React hooks for managing state and handles form submission with reCAPTCHA verification.
// The component also utilizes framer-motion for animations and dynamically applies styles based on props and state.

const ContactContent: React.FC<ContentProps> = ({router}) => {
    document.title = i18nplus(router.name, router.name);

    const [contactEntity, setContactEntity] = useState<ContactEntity>({
        name: "",
        email: "",
        theme: "",
        message: "",
    });

    const [contactDTOErrors, setContactDTOErrors] = useState<ContactDTOErrors>({});
    const [contactHaveErrors, setContactHaveErrors] = useState<boolean>(false);

    const [successedSend, setSuccessedSend] = useState<boolean>(false);
    const [failedSend, setFailedSend] = useState<boolean>(false);

    const [captchaToken, setCaptchaToken] = useState<string>("");
    const { executeRecaptcha } = useGoogleReCaptcha();

    const pageStyles: CSSProperties = {
        background: `url('${contactBackground}')`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }

    const sendContact = async (e: React.FormEvent) => {
        e.preventDefault();

        if (contactHaveErrors || !executeRecaptcha) return;

        const recaptchaToken = await executeRecaptcha("submit");
        setCaptchaToken(recaptchaToken);

        (new APIService().sendContact(contactEntity, recaptchaToken)).then((response) => {
            if (response.status == HttpStatusCode.Ok) {
                setSuccessedSend(true);
            } else {
                setFailedSend(true);
            }
        }).catch((error) => {
            console.error(error);
            setFailedSend(true);
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContactEntity((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    useEffect(() => {
        const contactErrors = (new ContactDTO(contactEntity)).getErrors();

        setContactHaveErrors(Object.values(contactErrors).some(error => error != undefined));

        setContactDTOErrors(contactErrors);
    }, [contactEntity])

    return (
        <div className="sr-content-inner sr-content-inner-experience" style={pageStyles}>
            <div className="container my-5">
            <Breadcrumb router={router}/>
                <section className="sr-content-page" id="contact-information">
                    <h1 className="title">{i18nplus("contact.title", "contact.title")}</h1>
                    <form className="sr-contact-form row" onSubmit={sendContact}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                className="form-group col-12 col-md-6"
                                custom={{
                                    index: 1,
                                    xOffset: 0,
                                    yOffset: -500
                                }}
                                key="name_animation"
                                initial="out"
                                animate="in"
                                variants={ContactGroupAnimation}
                            >
                                <label htmlFor="name" className="sr-label">{i18nplus("contact.name", "contact.name")}</label>
                                <input onChange={handleChange} value={contactEntity.name} type="text" id="name" name="name" className="sr-input form-control" placeholder={i18nplus("contact.placeholder.name", "contact.placeholder.name")}/>
                                <AnimatePresence mode="wait">
                                    {contactDTOErrors.name != undefined ? (
                                        <motion.div
                                            className="alert alert-danger"
                                            role="alert"
                                            custom={4}
                                            whileHover="hover"
                                            key={"name_error_animation"}
                                            initial="out"
                                            animate="in"
                                            exit="out"
                                            variants={ContactGroupErrorAnumation}
                                        >
                                            {contactDTOErrors.name}
                                        </motion.div>
                                    ): null}
                                </AnimatePresence>
                            </motion.div>
                            <motion.div
                                className="form-group col-12 col-md-6"
                                custom={{
                                    index: 1,
                                    xOffset: 0,
                                    yOffset: -500
                                }}
                                key="email_animation"
                                initial="out"
                                animate="in"
                                variants={ContactGroupAnimation}
                            >
                                <label htmlFor="email" className="sr-label">{i18nplus("contact.email", "contact.email")}</label>
                                <input onChange={handleChange} value={contactEntity.email} type="text" id="email" name="email" className="sr-input form-control" placeholder={i18nplus("contact.placeholder.email", "contact.placeholder.email")}/>
                                <AnimatePresence mode="wait">
                                    {contactDTOErrors.email != undefined ? (
                                        <motion.div
                                            className="alert alert-danger"
                                            role="alert"
                                            custom={5}
                                            key="email_error_animation"
                                            whileHover="hover"
                                            initial="out"
                                            animate="in"
                                            exit="out"
                                            variants={ContactGroupErrorAnumation}
                                        >
                                            {contactDTOErrors.email}
                                        </motion.div>
                                    ): null}
                                </AnimatePresence>
                            </motion.div>
                            <motion.div
                                className="form-group col-12"
                                custom={{
                                    index: 2,
                                    xOffset: -500,
                                    yOffset: 0
                                }}
                                key="theme_animation"
                                initial="out"
                                animate="in"
                                variants={ContactGroupAnimation}
                            >
                                <label htmlFor="theme" className="sr-label">{i18nplus("contact.theme", "contact.theme")}</label>
                                <input onChange={handleChange} value={contactEntity.theme} type="text" id="theme" name="theme" className="sr-input form-control" placeholder={i18nplus("contact.placeholder.theme", "contact.placeholder.theme")}/>
                                <AnimatePresence mode="wait">
                                    {contactDTOErrors.theme != undefined ? (
                                        <motion.div
                                            className="alert alert-danger"
                                            role="alert"
                                            custom={6}
                                            key="theme_error_animation"
                                            whileHover="hover"
                                            initial="out"
                                            animate="in"
                                            exit="out"
                                            variants={ContactGroupErrorAnumation}
                                        >
                                            {contactDTOErrors.theme}
                                        </motion.div>
                                    ): null}
                                </AnimatePresence>
                            </motion.div>
                            <motion.div
                                className="form-group col-12"
                                custom={{
                                    index: 2,
                                    xOffset: 500,
                                    yOffset: 0
                                }}
                                key="message_animation"
                                initial="out"
                                animate="in"
                                variants={ContactGroupAnimation}
                            >
                                <label htmlFor="message" className="sr-label">{i18nplus("contact.message", "contact.message")}</label>
                                <textarea onChange={handleChange} value={contactEntity.message} id="message" name="message" className="sr-input form-control" placeholder={i18nplus("contact.placeholder.message", "contact.placeholder.message")}/>
                                <AnimatePresence mode="wait">
                                    {contactDTOErrors.message != undefined ? (
                                        <motion.div
                                            className="alert alert-danger"
                                            role="alert"
                                            custom={6}
                                            key="message_error_animation"
                                            whileHover="hover"
                                            initial="out"
                                            animate="in"
                                            exit="out"
                                            variants={ContactGroupErrorAnumation}
                                        >
                                            {contactDTOErrors.message}
                                        </motion.div>
                                    ): null}
                                </AnimatePresence>
                            </motion.div>
                            
                            <AnimatePresence mode="wait">
                                {successedSend ? (
                                    <motion.div
                                        className="col-12"
                                        custom={1}
                                        key="contact_success_animation"
                                        initial="out"
                                        animate="in"
                                        exit="out"
                                        variants={ContactGroupErrorAnumation}
                                    >
                                        <div className="alert alert-success" role="alert">
                                            {i18nplus("contact.success", "contact.success")}
                                        </div>
                                    </motion.div>
                                ): null}
                                {failedSend ? (
                                    <motion.div
                                        className="col-12 mt-3"
                                        custom={1}
                                        key="contact_failed_animation"
                                        initial="out"
                                        animate="in"
                                        exit="out"
                                        variants={ContactGroupErrorAnumation}
                                    >
                                        <div className="alert alert-danger" role="alert">
                                            {i18nplus("contact.failed", "contact.failed")}
                                        </div>
                                    </motion.div>
                                ): null}
                            </AnimatePresence>

                            <div className="col-12" key={"submit_animation"}>
                                <motion.button
                                    className="sr-contact-submit"
                                    custom={{
                                        index: 2,
                                        xOffset: 0,
                                        yOffset: 500
                                    }}
                                    initial="out"
                                    animate="in"
                                    variants={ContactGroupAnimation}
                                    type="submit"
                                    disabled={contactHaveErrors}
                                >
                                    {i18nplus("contact.submit", "contact.submit")}
                                </motion.button>
                            </div>
                        </AnimatePresence>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default ContactContent;