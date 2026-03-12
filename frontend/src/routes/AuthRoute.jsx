import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    // Nếu đã đăng nhập, chặn vào các trang Login/Register và điều hướng về trang tương ứng
    if (isAuthenticated) {
        if (user?.isAdmin) {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/" replace />; // Customer về Home
    }

    // Nếu chưa đăng nhập thì cho phép render trang Login/Register
    return <Outlet />;
};

export default AuthRoute;
