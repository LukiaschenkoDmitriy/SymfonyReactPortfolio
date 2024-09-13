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
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="name" className="sr-label">{i18nplus("contact.name", "contact.name")}</label>
                            <input onChange={handleChange} value={contactEntity.name} type="text" id="name" name="name" className="sr-input form-control" placeholder={i18nplus("contact.placeholder.name", "contact.placeholder.name")}/>
                            {contactDTOErrors.name != undefined ? (
                                <div className="alert alert-danger" role="alert">{contactDTOErrors.name}</div>
                            ): null}
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="email" className="sr-label">{i18nplus("contact.email", "contact.email")}</label>
                            <input onChange={handleChange} value={contactEntity.email} type="text" id="email" name="email" className="sr-input form-control" placeholder={i18nplus("contact.placeholder.email", "contact.placeholder.email")}/>
                            {contactDTOErrors.email != undefined ? (
                                <div className="alert alert-danger" role="alert">{contactDTOErrors.email}</div>
                            ): null}
                        </div>
                        <div className="form-group col-12">
                            <label htmlFor="theme" className="sr-label">{i18nplus("contact.theme", "contact.theme")}</label>
                            <input onChange={handleChange} value={contactEntity.theme} type="text" id="theme" name="theme" className="sr-input form-control" placeholder={i18nplus("contact.placeholder.theme", "contact.placeholder.theme")}/>
                            {contactDTOErrors.theme != undefined ? (
                                <div className="alert alert-danger" role="alert">{contactDTOErrors.theme}</div>
                            ): null}
                        </div>
                        <div className="form-group col-12">
                            <label htmlFor="message" className="sr-label">{i18nplus("contact.message", "contact.message")}</label>
                            <textarea onChange={handleChange} value={contactEntity.message} id="message" name="message" className="sr-input form-control" placeholder={i18nplus("contact.placeholder.message", "contact.placeholder.message")}/>
                            {contactDTOErrors.message != undefined ? (
                                <div className="alert alert-danger" role="alert">{contactDTOErrors.message}</div>
                            ): null}
                        </div>

                        {successedSend ? (
                            <div className="alert alert-success col-12 my-5 px-5" role="alert">
                                {i18nplus("contact.success", "contact.success")}
                            </div>
                        ): null}
                        {failedSend ? (
                            <div className="alert alert-danger col-12 my-5 px-5" role="alert">
                                {i18nplus("contact.failed", "contact.failed")}
                            </div>
                        ): null}
                        <button type="submit" disabled={contactHaveErrors} className="sr-contact-submit col-12">{i18nplus("contact.submit", "contact.submit")}</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default ContactContent;