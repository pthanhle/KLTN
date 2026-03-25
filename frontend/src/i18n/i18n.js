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
import enParts from '../locales/en/parts.json';
import viParts from '../locales/vi/parts.json';
import enProfile from '../locales/en/profile.json';
import viProfile from '../locales/vi/profile.json';
import enBooking from '../locales/en/booking.json';
import viBooking from '../locales/vi/booking.json';
import enWishlist from '../locales/en/wishlist.json';
import viWishlist from '../locales/vi/wishlist.json';
import enCheckout from '../locales/en/checkout.json';
import viCheckout from '../locales/vi/checkout.json';
import enContact from '../locales/en/contact.json';
import viContact from '../locales/vi/contact.json';
import enTracking from '../locales/en/tracking.json';
import viTracking from '../locales/vi/tracking.json';

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
                services: enServices,
                parts: enParts,
                profile: enProfile,
                booking: enBooking,
                wishlist: enWishlist,
                checkout: enCheckout,
                contact: enContact,
                tracking: enTracking,
            },
            vi: {
                translation: viTranslation,
                layout: viLayout,
                auth: viAuth,
                admin: viAdmin,
                error: viError,
                products: viProducts,
                services: viServices,
                parts: viParts,
                profile: viProfile,
                booking: viBooking,
                wishlist: viWishlist,
                checkout: viCheckout,
                contact: viContact,
                tracking: viTracking,
            },
        },
        lng: 'vi', // Default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already safeguards from XSS
        },
    });

export default i18n;
