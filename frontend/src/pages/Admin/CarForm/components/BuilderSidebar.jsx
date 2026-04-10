import { BUILDER_TABS } from '../constants/builderTabs';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../contexts/ThemeContext';

const BuilderSidebar = ({ activeTab, setActiveTab }) => {
    const { t } = useTranslation('adminCarForm');
    const { isDarkMode } = useTheme();

    return (
        <aside className={`w-[260px] h-full flex-shrink-0 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)] transition-all duration-300 z-10 ${isDarkMode ? 'bg-[#141416] border-white/5' : 'bg-white border-slate-200'} border-r`}>
            
            <nav className={`flex-1 py-8 overflow-y-auto custom-scrollbar px-4 space-y-1.5 ${isDarkMode ? 'bg-[#141416]' : 'bg-white'}`}>
                {BUILDER_TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer outline-none font-semibold tracking-wide text-[14px] border-none ${
                                isActive 
                                    ? (isDarkMode ? 'bg-premium-gold/10 text-premium-gold font-bold' : 'bg-yellow-50 text-yellow-600 font-bold') 
                                    : (isDarkMode ? 'bg-transparent text-slate-400 hover:text-premium-gold hover:bg-white/10' : 'bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900')
                            }`}
                        >
                            <tab.icon size={20} className={isActive ? (isDarkMode ? 'text-premium-gold' : 'text-yellow-600') : 'text-slate-400 group-hover:text-slate-600'} />
                            <span className="truncate">{t(tab.labelKey, tab.labelKey)}</span>
                        </button>
                    );
                })}
            </nav>

        </aside>
    );
};

export default BuilderSidebar;
