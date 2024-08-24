import i18next from "@app/i18n";

export default function i18nplus(key: string, defaultTranslate: string): string 
{
    const { t } = i18next;
    return t(key) != key ? t(key) : defaultTranslate;
}