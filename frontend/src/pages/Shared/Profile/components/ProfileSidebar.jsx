import { Camera, Shield, User, Clock, ShoppingBag, Wrench } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfileSidebar = ({ profile, t, setIsPasswordModalOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    if (!profile) return null;
    const isAdminRole = profile.role.role_name === 'Admin' || profile.role.role_name === 'Manager';

    return (
        <div className="flex flex-col items-center">
            {/* Avatar Section */}
            <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 dark:border-[#1a1c23] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-1 right-1 bg-yellow-500 text-slate-900 w-9 h-9 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors shadow">
                    <Camera size={16} strokeWidth={2.5} />
                </button>
            </div>

            {/* Name and Role */}
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 text-center">{profile.full_name}</h2>
            <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${isAdminRole
                    ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-500'
                    : 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400'
                }`}>
                {profile.role.role_name}
            </span>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-4 text-center">
                {isAdminRole ? t('roles_adminDesc', 'Quản lý hệ thống TT AUTO. Chuyên gia tư vấn dòng xe hạng sang.') : t('roles_customerDesc', 'Khách hàng thân thiết của TT AUTO. Cảm ơn bạn đã tin tưởng dịch vụ chúng tôi.')}
            </p>

            <div className="w-full h-[1px] bg-slate-100 dark:bg-white/5 my-8"></div>

            {/* Navigation Menu */}
            <div className="w-full flex flex-col gap-2">
                <button 
                    onClick={() => navigate('/profile')}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl group transition-all ${
                        currentPath === '/profile' 
                            ? 'bg-white dark:bg-[#141416] border border-yellow-500 shadow-[0_4px_12px_rgba(234,179,8,0.15)]' 
                            : 'bg-transparent border border-transparent hover:border-slate-200 dark:hover:border-white/10'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <User size={18} className={currentPath === '/profile' ? 'text-yellow-500' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors'} strokeWidth={2.5} />
                        <span className={`text-[14px] font-bold transition-colors ${currentPath === '/profile' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                            {t('sidebar_accountInfo', 'Thông tin tài khoản')}
                        </span>
                    </div>
                </button>

                <button 
                    onClick={() => navigate('/profile/orders')}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl group transition-all ${
                        currentPath === '/profile/orders' 
                            ? 'bg-white dark:bg-[#141416] border border-yellow-500 shadow-[0_4px_12px_rgba(234,179,8,0.15)]' 
                            : 'bg-transparent border border-transparent hover:border-slate-200 dark:hover:border-white/10'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <ShoppingBag size={18} className={currentPath === '/profile/orders' ? 'text-yellow-500' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors'} strokeWidth={2.5} />
                        <span className={`text-[14px] font-bold transition-colors ${currentPath === '/profile/orders' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                            {t('order_history_title', 'Lịch sử giao dịch')}
                        </span>
                    </div>
                </button>

                <button 
                    onClick={() => navigate('/profile/services')}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl group transition-all ${
                        currentPath === '/profile/services' 
                            ? 'bg-white dark:bg-[#141416] border border-yellow-500 shadow-[0_4px_12px_rgba(234,179,8,0.15)]' 
                            : 'bg-transparent border border-transparent hover:border-slate-200 dark:hover:border-white/10'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <Wrench size={18} className={currentPath === '/profile/services' ? 'text-yellow-500' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors'} strokeWidth={2.5} />
                        <span className={`text-[14px] font-bold transition-colors ${currentPath === '/profile/services' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                            {t('service_history_title', 'Lịch sử bảo dưỡng')}
                        </span>
                    </div>
                </button>

                {profile.authProvider === 'local' && (
                    <button
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="w-full flex items-center justify-between px-5 py-4 bg-transparent border border-transparent hover:border-slate-200 dark:hover:border-white/10 rounded-2xl group transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <Shield size={18} className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors" />
                            <span className="text-[14px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{t('sidebar_security', 'Đổi mật khẩu')}</span>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProfileSidebar;
