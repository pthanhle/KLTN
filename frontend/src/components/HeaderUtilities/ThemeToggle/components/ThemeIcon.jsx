import { Sun, Moon } from 'lucide-react';

const ThemeIcon = ({ isDarkMode }) => {
    return isDarkMode ? (
        <Moon className="w-5 h-5 text-slate-400 group-hover:text-premium-gold transition-colors" />
    ) : (
        <Sun className="w-5 h-5 text-slate-500 group-hover:text-orange-500 transition-colors" />
    );
};

export default ThemeIcon;
