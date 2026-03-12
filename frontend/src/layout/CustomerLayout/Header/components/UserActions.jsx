import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Bell, Sun, Moon, Type, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../../store/slices/authSlice';
import { App as AntdApp } from 'antd';

const UserActions = () => {
    const { i18n } = useTranslation();
    const { isDarkMode, toggleTheme, toggleFontSize } = useTheme();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { message } = AntdApp.useApp();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'vi' ? 'en' : 'vi';
        i18n.changeLanguage(newLang);
    };

    const handleLogout = () => {
        dispatch(logout());
        message.success('Đăng xuất thành công');
    };

    return (
        <div className="flex items-center gap-6">
            {/* System Config - Language, Theme, Text */}
            <div className="hidden lg:flex items-center gap-5 text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 pr-6 h-8">
                <button onClick={toggleLanguage} className="flex items-center gap-1.5 text-[11px] font-bold hover:text-yellow-500 transition-colors uppercase">
                    {i18n.language === 'vi' ? 'VN' : 'EN'} <Globe size={14} className="opacity-70" />
                </button>
                <button onClick={toggleTheme} className="hover:text-yellow-500 transition-colors">
                    {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
                </button>
                <button onClick={toggleFontSize} className="hover:text-yellow-500 transition-colors">
                    <Type size={16} />
                </button>
            </div>

            {/* Quick Actions - Fav, Cart, Notifications */}
            <div className="flex items-center gap-5 text-slate-700 dark:text-slate-300">
                <button className="hover:text-yellow-500 transition-colors">
                    <Heart size={20} />
                </button>
                <Link to="/cart" className="relative hover:text-yellow-500 transition-colors group">
                    <ShoppingCart size={20} />
                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-slate-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0b0f19] group-hover:scale-110 transition-transform shadow-sm">
                        2
                    </span>
                </Link>
                <button className="relative hover:text-yellow-500 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white dark:border-[#0b0f19] rounded-full animate-pulse"></span>
                </button>
            </div>

            {/* Auth Area */}
            <div className="flex items-center gap-3 pl-2">
                {!isAuthenticated ? (
                    <>
                        <Link 
                            to="/login"
                            className="text-[13px] font-bold text-slate-900 dark:text-white px-3 py-2 hover:text-yellow-500 transition-colors tracking-wide"
                        >
                            Đăng nhập
                        </Link>
                        <Link 
                            to="/register"
                            className="text-[13px] font-bold bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-5 py-2.5 rounded-full shadow-lg shadow-yellow-500/20 transition-all hover:scale-105 active:scale-95 tracking-wide whitespace-nowrap"
                        >
                            Đăng ký
                        </Link>
                    </>
                ) : (
                    <div className="group relative">
                        <Link to="/profile" className="flex items-center gap-2 cursor-pointer transition-opacity group-hover:opacity-80">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-600 font-bold border-2 border-yellow-500/50 uppercase">
                                {user?.full_name?.charAt(0) || 'U'}
                            </div>
                        </Link>
                        {/* Simple Hover Menu for Authenticated User */}
                        <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="bg-white dark:bg-[#161a23] border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl py-2 w-48 overflow-hidden">
                                <Link to="/profile" className="block px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-yellow-500">
                                    Hồ sơ của tôi
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserActions;
