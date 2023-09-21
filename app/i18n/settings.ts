import type { InitOptions } from "i18next";
export const fallbackLng = "en-us";
export const locales = [fallbackLng, "ja-jp"] as const;
export const defaultNS = "translation";

export const isSupportedLanguage = (lang?: string): boolean =>
    locales.includes(lang as (typeof locales)[number]);

export const getOptions = (
    lng = fallbackLng,
    ns: string | string[] = defaultNS,
): InitOptions => ({
    // debug: true,
    supportedLngs: locales,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    lowerCaseLng: true,
    ns,
});
