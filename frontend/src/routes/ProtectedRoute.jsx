import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles, requireLogin = false }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const isAdmin = user?.isAdmin === true;

    if (!isAuthenticated) {
        // Nếu bắt buộc đăng nhập, hoặc route có yêu cầu Role nhưng lại KHÔNG PHẢI là 'guest' -> bắt login
        if (requireLogin || (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes('guest'))) {
            return <Navigate to="/login" replace />;
        }
    }

    if (isAuthenticated && allowedRoles && allowedRoles.length > 0) {
        if (allowedRoles.includes('admin') && !isAdmin) {
            return <Navigate to="/403" replace />;
        }

        if (allowedRoles.includes('customer') && isAdmin) {
            return <Navigate to="/403" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
