import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
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

const ErrorPage = lazy(() => import('../pages/ErrorPage'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<PageLoader />}>
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
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/cars" element={<CarsPage />} />
                        <Route path="/cars/:id" element={<CarDetailPage />} />
                        <Route path="/brand/:brandName" element={<CarsPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['customer']} requireLogin={true} />}>
                        <Route path="/profile" element={<div>Trang Cá Nhân (Bắt buộc Login)</div>} />
                        <Route path="/cart" element={<div>Giỏ Hàng của tôi</div>} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} />
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
