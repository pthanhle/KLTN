import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en/translation.json';
import viTranslation from '../locales/vi/translation.json';
import enLayout from '../locales/en/layout.json';
import viLayout from '../locales/vi/layout.json';
import enAuth from '../locales/en/auth.json';
import viAuth from '../locales/vi/auth.json';
import enAdmin from '../locales/en/admin.json';
import viAdmin from '../locales/vi/admin.json';
import enError from '../locales/en/error.json';
import viError from '../locales/vi/error.json';
import enProducts from '../locales/en/products.json';
import viProducts from '../locales/vi/products.json';
import enServices from '../locales/en/services.json';
import viServices from '../locales/vi/services.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslation,
                layout: enLayout,
                auth: enAuth,
                admin: enAdmin,
                error: enError,
                products: enProducts,
                services: enServices
            },
            vi: {
                translation: viTranslation,
                layout: viLayout,
                auth: viAuth,
                admin: viAdmin,
                error: viError,
                products: viProducts,
                services: viServices
            },
        },
        lng: 'vi', // Default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already safeguards from XSS
        },
    });

export default i18n;
