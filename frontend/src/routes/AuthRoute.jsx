import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (isAuthenticated) {
        if (user?.isAdmin) {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AuthRoute;
