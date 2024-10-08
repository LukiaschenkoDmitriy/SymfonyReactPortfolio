import i18next from "@app/i18n";

/**
 * Translates the given key using i18next. If the translation is not found, returns the provided default translation.
 *
 * @param key - The translation key to look up.
 * @param defaultTranslate - The default translation to return if the key is not found.
 * @returns The translated string if the key is found, otherwise the default translation.
 */

export default function i18nplus(key: string, defaultTranslate: string): string 
{
    const { t } = i18next;
    return t(key) != key ? t(key) : defaultTranslate;
}