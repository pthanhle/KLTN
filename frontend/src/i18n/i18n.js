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
import enAdminOrders from '../locales/en/adminOrders.json';
import viAdminOrders from '../locales/vi/adminOrders.json';
import enAdminPromotions from '../locales/en/adminPromotions.json';
import viAdminPromotions from '../locales/vi/adminPromotions.json';
import enAdminPromotionForm from '../locales/en/adminPromotionForm.json';
import viAdminPromotionForm from '../locales/vi/adminPromotionForm.json';
import enAdminCustomers from '../locales/en/adminCustomers.json';
import viAdminCustomers from '../locales/vi/adminCustomers.json';
import enAdminCustomerDetail from '../locales/en/adminCustomerDetail.json';
import viAdminCustomerDetail from '../locales/vi/adminCustomerDetail.json';
import enAdminBrands from '../locales/en/adminBrands.json';
import viAdminBrands from '../locales/vi/adminBrands.json';
import enAdminCategories from '../locales/en/adminCategories.json';
import viAdminCategories from '../locales/vi/adminCategories.json';
import enAdminCars from '../locales/en/adminCars.json';
import viAdminCars from '../locales/vi/adminCars.json';
import enAdminCarForm from '../locales/en/adminCarForm.json';
import viAdminCarForm from '../locales/vi/adminCarForm.json';
import enError from '../locales/en/error.json';
import viError from '../locales/vi/error.json';
import enProducts from '../locales/en/products.json';
import viProducts from '../locales/vi/products.json';
import enServices from '../locales/en/services.json';
import viServices from '../locales/vi/services.json';
import enParts from '../locales/en/parts.json';
import viParts from '../locales/vi/parts.json';
import enAdminParts from '../locales/en/adminParts.json';
import viAdminParts from '../locales/vi/adminParts.json';
import enAdminPartForm from '../locales/en/adminPartForm.json';
import viAdminPartForm from '../locales/vi/adminPartForm.json';
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
import enPartDetail from '../locales/en/partDetail.json';
import viPartDetail from '../locales/vi/partDetail.json';
import enAdminServiceItems from '../locales/en/adminServiceItems.json';
import viAdminServiceItems from '../locales/vi/adminServiceItems.json';
import enAdminStaff from '../locales/en/adminStaff.json';
import viAdminStaff from '../locales/vi/adminStaff.json';
import enAdminStaffDetail from '../locales/en/adminStaffDetail.json';
import viAdminStaffDetail from '../locales/vi/adminStaffDetail.json';
import enAdminStaffAttendance from '../locales/en/adminStaffAttendance.json';
import viAdminStaffAttendance from '../locales/vi/adminStaffAttendance.json';
import enAdminStaffCompliance from '../locales/en/adminStaffCompliance.json';
import viAdminStaffCompliance from '../locales/vi/adminStaffCompliance.json';
import enAdminStaffCreate from '../locales/en/adminStaffCreate.json';
import viAdminStaffCreate from '../locales/vi/adminStaffCreate.json';
import enAdminTestDriveBookings from '../locales/en/adminTestDriveBookings.json';
import viAdminTestDriveBookings from '../locales/vi/adminTestDriveBookings.json';
import enAdminServiceReception from '../locales/en/adminServiceReception.json';
import viAdminServiceReception from '../locales/vi/adminServiceReception.json';
import enAdminRODetail from '../locales/en/adminRODetail.json';
import viAdminRODetail from '../locales/vi/adminRODetail.json';
import enAdminOrderDetail from '../locales/en/adminOrderDetail.json';
import viAdminOrderDetail from '../locales/vi/adminOrderDetail.json';
import enLoyalty from '../locales/en/loyalty.json';
import viLoyalty from '../locales/vi/loyalty.json';
import enAdminDashboard from '../locales/en/adminDashboard.json';
import viAdminDashboard from '../locales/vi/adminDashboard.json';
import enAdminVehicleContracts from '../locales/en/adminVehicleContracts.json';
import viAdminVehicleContracts from '../locales/vi/adminVehicleContracts.json';
import enAdminRevenueReport from '../locales/en/adminRevenueReport.json';
import viAdminRevenueReport from '../locales/vi/adminRevenueReport.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslation,
                layout: enLayout,
                auth: enAuth,
                admin: enAdmin,
                adminOrders: enAdminOrders,
                adminPromotions: enAdminPromotions,
                adminPromotionForm: enAdminPromotionForm,
                adminCustomers: enAdminCustomers,
                adminCustomerDetail: enAdminCustomerDetail,
                adminBrands: enAdminBrands,
                adminCategories: enAdminCategories,
                adminCars: enAdminCars,
                adminCarForm: enAdminCarForm,
                adminParts: enAdminParts,
                adminPartForm: enAdminPartForm,
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
                partDetail: enPartDetail,
                adminServiceItems: enAdminServiceItems,
                adminStaff: enAdminStaff,
                adminStaffDetail: enAdminStaffDetail,
                adminStaffAttendance: enAdminStaffAttendance,
                adminStaffCompliance: enAdminStaffCompliance,
                adminStaffCreate: enAdminStaffCreate,
                adminTestDriveBookings: enAdminTestDriveBookings,
                adminServiceReception: enAdminServiceReception,
                adminRODetail: enAdminRODetail,
                adminOrderDetail: enAdminOrderDetail,
                loyalty: enLoyalty,
                adminDashboard: enAdminDashboard,
                adminVehicleContracts: enAdminVehicleContracts,
                adminRevenueReport: enAdminRevenueReport,
            },
            vi: {
                translation: viTranslation,
                layout: viLayout,
                auth: viAuth,
                admin: viAdmin,
                adminOrders: viAdminOrders,
                adminPromotions: viAdminPromotions,
                adminPromotionForm: viAdminPromotionForm,
                adminCustomers: viAdminCustomers,
                adminCustomerDetail: viAdminCustomerDetail,
                adminBrands: viAdminBrands,
                adminCategories: viAdminCategories,
                adminCars: viAdminCars,
                adminCarForm: viAdminCarForm,
                adminParts: viAdminParts,
                adminPartForm: viAdminPartForm,
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
                partDetail: viPartDetail,
                adminServiceItems: viAdminServiceItems,
                adminStaff: viAdminStaff,
                adminStaffDetail: viAdminStaffDetail,
                adminStaffAttendance: viAdminStaffAttendance,
                adminStaffCompliance: viAdminStaffCompliance,
                adminStaffCreate: viAdminStaffCreate,
                adminTestDriveBookings: viAdminTestDriveBookings,
                adminServiceReception: viAdminServiceReception,
                adminRODetail: viAdminRODetail,
                adminOrderDetail: viAdminOrderDetail,
                loyalty: viLoyalty,
                adminDashboard: viAdminDashboard,
                adminVehicleContracts: viAdminVehicleContracts,
                adminRevenueReport: viAdminRevenueReport,
            },
        },
        lng: localStorage.getItem('i18nextLng') || localStorage.getItem('language') || 'vi',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;