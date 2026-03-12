import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';
import ErrorPage from '../pages/ErrorPage';
import CustomerLayout from '../layout/CustomerLayout';
import AdminLayout from '../layout/AdminLayout';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import VerifyOTP from '../pages/Auth/VerifyOTP';
import CustomersPage from '../pages/Admin/Customers';
import Home from '../pages/Customer/Home';

const AppRoutes = () => {
    return (
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
                    <Route path="/products" element={<div>Sản Phẩm</div>} />
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
    );
};

export default AppRoutes;
