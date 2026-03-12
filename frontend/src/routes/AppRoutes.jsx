import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';
import ErrorPage from '../pages/ErrorPage'; // Trang Lỗi (Micro Component)
import CustomerLayout from '../layout/CustomerLayout';
import AdminLayout from '../layout/AdminLayout';

// Authen Pages
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import VerifyOTP from '../pages/Auth/VerifyOTP';

// Admin Pages
import CustomersPage from '../pages/Admin/Customers';

const AppRoutes = () => {
    return (
        <Routes>
            {/* NHÓM 1: AUTHENTICATION (Không dùng header/footer chung) */}
            <Route element={<AuthRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            
            {/* NHÓM 2: CUSTOMER (Dùng Shadcn UI Layout) */}
            <Route element={<CustomerLayout />}>
                
                {/* 
                  Khu vực Public (Cho khách vãng lai và Customer). 
                  Nhưng nếu là Admin thì đá ra khỏi đây! 
                */}
                <Route element={<ProtectedRoute allowedRoles={['customer', 'guest']} />}>
                    <Route path="/" element={<div>Trang Chủ (Customer)</div>} />
                    <Route path="/products" element={<div>Sản Phẩm</div>} />
                </Route>

                {/* Các trang dành riêng cho Customer (Bắt buộc phải Login) */}
                <Route element={<ProtectedRoute allowedRoles={['customer']} requireLogin={true} />}>
                    <Route path="/profile" element={<div>Trang Cá Nhân (Bắt buộc Login)</div>} />
                    <Route path="/cart" element={<div>Giỏ Hàng của tôi</div>} />
                </Route>
            </Route>

            {/* NHÓM 3: ADMIN (Dùng Ant Design Layout) */}
            {/* Bắt buộc là Admin và bọc bằng AdminLayout */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} />
                    <Route path="/admin/customers" element={<CustomersPage />} />
                    <Route path="/admin/orders" element={<div>Quản Lý Đơn Hàng</div>} />
                </Route>
            </Route>

            {/* NHÓM 4: ERROR PAGES */}
            <Route path="/401" element={<ErrorPage status="401" />} />
            <Route path="/403" element={<ErrorPage status="403" />} />
            <Route path="/500" element={<ErrorPage status="500" />} />
            <Route path="*" element={<ErrorPage status="404" />} />
        </Routes>
    );
};

export default AppRoutes;
