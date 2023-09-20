import { fallbackLng, isSupportedLanguage } from "../i18n/settings";

export const buildLinkPath =
    (locale: string) =>
    (path: string): string =>
        isSupportedLanguage(locale)
            ? `/${locale}/${path}`
            : `/${fallbackLng}/${path}`;
