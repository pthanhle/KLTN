import { Layout, Menu as AntMenu, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLogoutMutation } from '../../../services/queries/auth.queries';
import { CarFront, LogOut } from 'lucide-react';
import { useSiderMenu } from './hooks/useSiderMenu';
import BrandLogo from '@/assets/images/brand/logo.png';


const { Sider: AntSider } = Layout;

const Sider = ({ collapsed }) => {
    const { t } = useTranslation('layout');
    const { isDarkMode } = useTheme();
    const { menuItems, handleMenuClick, selectedKey } = useSiderMenu(collapsed);
    const navigate = useNavigate();
    const { mutate: logoutUser } = useLogoutMutation();

    const handleLogout = () => {
        logoutUser(undefined, {
            onSuccess: () => navigate('/login'),
            onError: () => navigate('/login'),
        });
    };

    return (
        <AntSider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={260}
            collapsedWidth={80}
            style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
            className={`shadow-[10px_0_20px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)] transition-all duration-300 z-[100] ${isDarkMode ? 'bg-[#141416] border-white/5' : 'bg-white border-slate-200'} border-r`}
        >
            <div className={`h-full flex flex-col justify-between overflow-hidden`}>

                <div className={`h-20 flex items-center transition-all border-b ${collapsed ? 'justify-center px-0' : 'px-6'} ${isDarkMode ? 'border-white/5 bg-[#141416]' : 'border-slate-100 bg-white'}`}>
                    <div className="w-10 h-10 flex items-center justify-center shrink-0 transition-all duration-300 scale-110">
                        <img src={BrandLogo} alt="TT AUTO" className="w-full h-full object-contain [filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.6))_drop-shadow(0_0_12px_rgba(255,255,255,0.15))] transition-all duration-300" />
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col ml-3 overflow-hidden transition-opacity duration-300 whitespace-nowrap">
                            <span className={`text-xl font-black tracking-tighter uppercase italic leading-none ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>TT AUTO</span>
                            <span className="text-[9px] tracking-[0.2em] text-yellow-600 dark:text-premium-gold font-bold uppercase mt-1 leading-none">Premium Workshop</span>
                        </div>
                    )}
                </div>

                {/* Sider Menu Container */}
                <div className={`flex-1 overflow-y-auto py-4 custom-scrollbar ${isDarkMode ? 'bg-[#141416]' : 'bg-white'}`}>
                    <AntMenu
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        items={menuItems}
                        onClick={handleMenuClick}
                        className={`border-r-0 ${isDarkMode
                            ? 'bg-transparent text-slate-400 [&_.ant-menu-item-selected]:!bg-premium-gold/10 [&_.ant-menu-item-selected]:!text-premium-gold [&_.ant-menu-item]:hover:!text-premium-gold'
                            : 'bg-transparent text-slate-700 [&_.ant-menu-item-selected]:!bg-yellow-50 [&_.ant-menu-item-selected]:!text-yellow-600 [&_.ant-menu-item]:hover:!bg-slate-50 [&_.ant-menu-item]:hover:!text-yellow-600'} 
                            font-semibold tracking-wide text-[15px] [&_.ant-menu-item]:mb-2`}
                        style={{ padding: '0 8px' }}
                    />
                </div>

                <div className={`p-4 mt-auto border-t transition-all ${isDarkMode ? 'border-white/5 bg-[#141416]' : 'border-slate-100 bg-white'}`}>
                    <button
                        onClick={handleLogout}
                        className={`flex items-center ${collapsed ? 'justify-center px-0' : 'space-x-3 px-4'} w-full py-2.5 bg-red-50 text-red-600 text-[15px] dark:bg-red-500/10 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition-all font-bold group`}
                    >
                        <LogOut size={22} className="shrink-0 transition-transform group-hover:scale-110" />
                        {!collapsed && <span className="truncate">{t('admin.actions.logout')}</span>}
                    </button>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
                    border-radius: 20px;
                }
            `}</style>
        </AntSider>
    );
};

export default Sider;
