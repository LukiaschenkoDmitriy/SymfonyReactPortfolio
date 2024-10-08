import ContactEntity from "@data/ContactEntity";
import i18nplus from "@services/TranslateService";

export interface ContactDTOErrors {
    name?: string,
    email?: string,
    theme?: string,
    message?: string,
}

export default class ContactDTO implements ContactEntity {
    name: string;
    email: string;
    theme: string;
    message: string;

    public constructor(contact: ContactEntity) {
        this.name = contact.name;
        this.email = contact.email;
        this.theme = contact.theme;
        this.message = contact.message;
    }

    public getErrors(): ContactDTOErrors {
        const contactDTOErrors: ContactDTOErrors = {}

        const validateEmail = (email: string) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
          };

        if (this.name.length == 0) contactDTOErrors.name = i18nplus("contact.errors.name", "contact.errors.name");
        if (!validateEmail(this.email)) contactDTOErrors.email = i18nplus("contact.errors.email","contact.errors.email");
        if (this.theme.length == 0) contactDTOErrors.theme = i18nplus("contact.errors.theme", "contact.errors.theme");
        if (this.message.length == 0) contactDTOErrors.message = i18nplus("contact.errors.message", "contact.errors.message");

        return contactDTOErrors;
    }
}