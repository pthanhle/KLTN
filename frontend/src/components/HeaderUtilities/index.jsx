import FontSizeToggle from './FontSizeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const HeaderUtilities = () => {
    return (
        <div className="flex items-center bg-slate-100/70 dark:bg-white/5 rounded-full p-1 border border-slate-200/50 dark:border-white/10 transition-colors">
            <FontSizeToggle />
            <LanguageSwitcher />
            <ThemeToggle />
        </div>
    );
};

export default HeaderUtilities;
