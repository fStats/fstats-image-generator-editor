import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";

const repoBase = import.meta.env.BASE_URL?.endsWith("/")
    ? import.meta.env.BASE_URL || "/"
    : import.meta.env.BASE_URL + "/";

export const supportedLanguages = ["en"];
export const namespaces = [
    "common"
];

export const initPromise = i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLngs: supportedLanguages,
        backend: {
            loadPath: `${repoBase}locales/{{lng}}/{{ns}}.json`,
        },
        ns: namespaces,
        defaultNS: "common",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;