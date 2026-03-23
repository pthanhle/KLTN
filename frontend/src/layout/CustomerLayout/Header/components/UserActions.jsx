import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Bell, LogOut, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../../../services/queries/auth.queries';
import { App as AntdApp } from 'antd';
import HeaderUtilities from '../../../../components/HeaderUtilities';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';


const UserActions = () => {
    const { t } = useTranslation('layout');
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const cartItems = useSelector((state) => state.cart.items);
    const { mutate: logoutUser } = useLogoutMutation();
    const { message } = AntdApp.useApp();

    const handleLogout = () => {
        logoutUser(undefined, {
            onSuccess: () => message.success(t('messages.logoutSuccess')),
            onError: () => message.success(t('messages.logoutSuccess')),
        });
    };

    return (
        <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center border-r border-slate-200 dark:border-slate-800 pr-6 mr-1 h-8">
                <HeaderUtilities />
            </div>

            <div className="flex items-center gap-5 text-slate-700 dark:text-slate-300">
                <Link to="/wishlist" className="relative hover:!text-yellow-500 !text-slate-700 dark:!text-slate-300 transition-colors group">
                    <Heart size={20} />
                    {wishlistItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-yellow-500 text-slate-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0b0f19] group-hover:scale-110 transition-transform shadow-sm">
                            {wishlistItems.length}
                        </span>
                    )}
                </Link>
                <Link to="/cart" className="relative hover:!text-yellow-500 !text-slate-700 dark:!text-white transition-colors group">
                    <ShoppingCart size={20} />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-yellow-500 text-slate-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0b0f19] group-hover:scale-110 transition-transform shadow-sm">
                            {cartItems.length}
                        </span>
                    )}
                </Link>
                <button className="relative hover:text-yellow-500 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white dark:border-[#0b0f19] rounded-full animate-pulse"></span>
                </button>
            </div>

            <div className="flex items-center gap-3 pl-2">
                {!isAuthenticated ? (
                    <>
                        <Link
                            to="/login"
                            className="text-[13px] font-bold !text-slate-900 dark:!text-white px-3 py-2 hover:!text-yellow-500 transition-colors tracking-wide"
                        >
                            {t('customer.header.login')}
                        </Link>
                        <Link
                            to="/register"
                            className="flex items-center justify-center text-[13px] font-bold !bg-yellow-500 hover:!bg-yellow-400 !text-slate-900 px-5 py-2.5 rounded-full shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.03] active:scale-95 tracking-wide whitespace-nowrap"
                        >
                            {t('customer.header.register')}
                        </Link>
                    </>
                ) : (
                    <div className="group relative">
                        <div className="flex items-center gap-2 cursor-pointer transition-opacity group-hover:opacity-80">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-600 font-bold border-2 border-yellow-500/50 uppercase">
                                {user?.full_name?.charAt(0) || 'U'}
                            </div>
                        </div>
                        <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="bg-white dark:bg-[#161a23] border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl py-2 w-48 overflow-hidden">
                                <div className="px-2 mb-1">
                                    <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm font-bold !text-slate-700 dark:!text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:!text-yellow-500 rounded-lg transition-colors group">
                                        <User size={16} className="transition-colors" />
                                        {t('customer.header.profile')}
                                    </Link>
                                </div>
                                <div className="px-2 mt-1">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-bold text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition-colors"
                                    >
                                        <LogOut size={16} />
                                        {t('customer.header.logout')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserActions;
