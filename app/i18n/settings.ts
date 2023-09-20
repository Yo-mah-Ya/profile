import type { InitOptions } from "i18next";
export const fallbackLng = "en-us";
export const languages = [fallbackLng, "ja-jp"] as const;
export const defaultNS = "translation";

export const isSupportedLanguage = (lang?: string): boolean =>
    languages.includes(lang as (typeof languages)[number]);

export const getOptions = (
    lng = fallbackLng,
    ns: string | string[] = defaultNS,
): InitOptions => ({
    // debug: true,
    supportedLngs: languages,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    lowerCaseLng: true,
    ns,
});
