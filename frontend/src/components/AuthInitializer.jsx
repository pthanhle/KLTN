import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { authApi } from '@/services/api/auth';

const AuthInitializer = () => {
    const dispatch = useDispatch();
    const { user, accessToken } = useSelector((state) => state.auth);
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        if (user && !accessToken) {
            authApi.getMe()
                .catch(() => {
                    dispatch(logout());
                });
        }
    }, []);

    return null;
};

export default AuthInitializer;
