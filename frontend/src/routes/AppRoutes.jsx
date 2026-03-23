import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';
import { PageLoader } from '../components/ui/page-loader';

const CustomerLayout = lazy(() => import('../layout/CustomerLayout'));
const AdminLayout = lazy(() => import('../layout/AdminLayout'));

const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/Auth/ResetPassword'));
const VerifyOTP = lazy(() => import('../pages/Auth/VerifyOTP'));

const CustomersPage = lazy(() => import('../pages/Admin/Customers'));

const Home = lazy(() => import('../pages/Customer/Home'));

const ProductsPage = lazy(() => import('../pages/Customer/Products'));
const CarsPage = lazy(() => import('../pages/Customer/Cars'));
const CarDetailPage = lazy(() => import('../pages/Customer/CarDetail'));
const ServicesPage = lazy(() => import('../pages/Customer/Services'));
const PartsPage = lazy(() => import('../pages/Customer/Parts'));
const PartDetail = lazy(() => import('../pages/Customer/PartDetail'));
const PreorderPartPage = lazy(() => import('../pages/Customer/Parts/pages/PreorderPart'));
const ContactPage = lazy(() => import('../pages/Customer/Contact'));
const TestDriveBookingPage = lazy(() => import('../pages/Customer/TestDriveBooking'));
const WishlistPage = lazy(() => import('../pages/Customer/Wishlist'));
const CheckoutFlow = lazy(() => import('../pages/Customer/Checkout'));

const ProfilePage = lazy(() => import('../pages/Shared/Profile'));

const ErrorPage = lazy(() => import('../pages/ErrorPage'));

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [pathname]);

    return null;
};

const AppRoutes = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <ScrollToTop />
            <Routes>
                <Route element={<AuthRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-otp" element={<VerifyOTP />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Route>

                <Route element={<CustomerLayout />}>

                    <Route element={<ProtectedRoute allowedRoles={['customer', 'guest']} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/cars" element={<CarsPage />} />
                        <Route path="/cars/:id" element={<CarDetailPage />} />
                        <Route path="/brand/:brandName" element={<CarsPage />} />
                        <Route path="/test-drive/:id" element={<TestDriveBookingPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/parts" element={<PartsPage />} />
                        <Route path="/parts/:id" element={<PartDetail />} />
                        <Route path="/parts/pre-order/:id" element={<PreorderPartPage />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['customer']} requireLogin={true} />}>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/profile/orders" element={<ProfilePage />} />
                        <Route path="/profile/orders/:id" element={<ProfilePage />} />
                        <Route path="/profile/services" element={<ProfilePage />} />
                        <Route path="/profile/services/:id" element={<ProfilePage />} />
                        <Route path="/profile/test-drives" element={<ProfilePage />} />
                        <Route path="/cart" element={<CheckoutFlow />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} />
                        <Route path="/admin/profile" element={<ProfilePage />} />
                        <Route path="/admin/customers" element={<CustomersPage />} />
                        <Route path="/admin/orders" element={<div>Quản Lý Đơn Hàng</div>} />
                    </Route>
                </Route>

                <Route path="/401" element={<ErrorPage status="401" />} />
                <Route path="/403" element={<ErrorPage status="403" />} />
                <Route path="/500" element={<ErrorPage status="500" />} />
                <Route path="*" element={<ErrorPage status="404" />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
