import { Dropdown } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLogoutMutation } from '../../../services/queries/auth.queries';
import HeaderUtilities from '../../../components/HeaderUtilities';
import {
    Bell,
    LogOut,
    Settings,
    User,
    Menu
} from 'lucide-react';
import { getAvatarUrl } from '../../../utils/imageUtils';

const Header = ({ collapsed, onToggle, hideToggle }) => {
    const navigate = useNavigate();
    const { t } = useTranslation('layout');
    const { user } = useSelector((state) => state.auth);
    const { mutate: logoutUser } = useLogoutMutation();

    const handleLogout = () => {
        logoutUser(undefined, {
            onSuccess: () => navigate('/login'),
            onError: () => navigate('/login'),
        });
    };

    const userInitials = user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'A';

    return (
        <header className="sticky top-0 z-50 w-full h-20 flex items-center justify-between px-6 lg:px-10 bg-white/80 dark:bg-[#0a0a0b]/80 backdrop-blur-md dark:backdrop-blur-xl border-b border-slate-200/80 dark:border-white/5 transition-all shadow-sm dark:shadow-none">

            <div className="flex-1 flex items-center">
                {!hideToggle && (
                    <button
                        onClick={onToggle}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <Menu size={20} className="text-slate-600 dark:text-slate-300" />
                    </button>
                )}
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'header',
                                label: (
                                    <div className="px-4 py-2 flex justify-between items-center w-[300px]">
                                        <span className="font-bold text-sm text-slate-800 dark:text-white">Notifications</span>
                                        <span className="text-[10px] bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-bold">2 NEW</span>
                                    </div>
                                )
                            },
                            { type: 'divider' },
                            {
                                key: '1',
                                label: (
                                    <div className="flex flex-col py-2 px-2">
                                        <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">New booking received</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mercedes G63 - Engine tuning</p>
                                        <p className="text-[10px] text-yellow-600 dark:text-premium-gold mt-2 uppercase font-bold tracking-wider">2 mins ago</p>
                                    </div>
                                )
                            },
                            {
                                key: '2',
                                label: (
                                    <div className="flex flex-col py-2 px-2">
                                        <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">Service complete</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Rolls Royce Ghost - Exterior detailing</p>
                                        <p className="text-[10px] text-yellow-600 dark:text-premium-gold mt-2 uppercase font-bold tracking-wider">1 hour ago</p>
                                    </div>
                                )
                            },
                            { type: 'divider' },
                            {
                                key: 'view_all',
                                label: <div className="text-center text-xs font-bold text-blue-600 dark:text-premium-gold hover:underline py-1">View all updates</div>
                            }
                        ]
                    }}
                    placement="bottomRight"
                    trigger={['click']}
                    classNames={{ root: "dark:bg-[#141416]/95 dark:backdrop-blur-xl dark:border dark:border-white/10 dark:shadow-2xl rounded-2xl overflow-hidden" }}
                >
                    <button className="relative p-2.5 bg-slate-100/70 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/50 dark:border-white/10 rounded-xl transition-all">
                        <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                        <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                    </button>
                </Dropdown>

                {/* USER PROFILE */}
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'profile',
                                label: (
                                    <div className="flex items-center space-x-3 px-2 py-1 text-sm text-slate-600 dark:text-slate-400 group/item">
                                        <User className="w-4 h-4 group-hover/item:text-yellow-600 dark:group-hover/item:text-premium-gold" />
                                        <span>{t('admin.actions.profile')}</span>
                                    </div>
                                )
                            },
                            {
                                key: 'settings',
                                label: (
                                    <div className="flex items-center space-x-3 px-2 py-1 text-sm text-slate-600 dark:text-slate-400 group/item">
                                        <Settings className="w-4 h-4 group-hover/item:text-yellow-600 dark:group-hover/item:text-premium-gold" />
                                        <span>{t('admin.actions.settings')}</span>
                                    </div>
                                )
                            },
                            { type: 'divider' },
                            {
                                key: 'logout',
                                label: (
                                    <div className="flex items-center space-x-3 px-2 py-1 text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors">
                                        <LogOut className="w-4 h-4" />
                                        <span className="font-bold">{t('admin.actions.logout')}</span>
                                    </div>
                                ),
                                onClick: handleLogout
                            }
                        ]
                    }}
                    placement="bottomRight"
                    trigger={['click']}
                    classNames={{ root: "dark:bg-[#141416]/95 dark:backdrop-blur-xl dark:border dark:border-white/10 dark:shadow-2xl rounded-2xl w-56" }}
                >
                    <button className="flex items-center space-x-3 pl-2 pr-1 py-1 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/50 dark:border-white/10 rounded-full transition-all duration-300">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{user?.full_name || 'Nguyễn Văn A'}</p>
                            <p className="text-[10px] font-bold text-yellow-600 dark:text-premium-gold uppercase tracking-tighter mt-0.5">{user?.role || 'Administrator'}</p>
                        </div>
                        <div className="relative">
                            {user?.avatar ? (
                                <img src={getAvatarUrl(user.avatar)} alt="Admin Avatar" className="w-10 h-10 rounded-full border-2 border-yellow-200 dark:border-premium-gold/50 object-cover bg-white" />
                            ) : (
                                <div className="w-10 h-10 rounded-full border-2 border-yellow-200 dark:border-premium-gold/50 flex flex-col items-center justify-center bg-yellow-100 dark:bg-slate-800 text-yellow-600 dark:text-premium-gold font-bold text-lg">
                                    {userInitials}
                                </div>
                            )}
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#1a1c20] rounded-full"></div>
                        </div>
                    </button>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;
