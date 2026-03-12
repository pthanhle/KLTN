import { ChevronDown } from 'lucide-react';

const LanguageButton = ({ currentLang }) => {
    return (
        <button className="flex items-center space-x-1 px-3 py-2 hover:bg-white dark:hover:bg-white/10 rounded-full transition-colors group/lang cursor-pointer" title="Đổi ngôn ngữ">
            {currentLang === 'vi' ? (
                <img src="https://flagcdn.com/w20/vn.png" alt="VNM" className="w-[18px] h-auto rounded-[2px] mr-1" />
            ) : (
                <img src="https://flagcdn.com/w20/us.png" alt="USA" className="w-[18px] h-auto rounded-[2px] mr-1" />
            )}
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{(currentLang || 'EN').toUpperCase()}</span>
            <ChevronDown className="w-3 h-3 text-slate-500 dark:text-slate-500" />
        </button>
    );
};

export default LanguageButton;
