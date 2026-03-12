import { useTheme } from '../../../contexts/ThemeContext';
import ThemeIcon from './components/ThemeIcon';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-full transition-colors group cursor-pointer" 
            title="Đổi giao diện"
        >
            <ThemeIcon isDarkMode={isDarkMode} />
        </button>
    );
};

export default ThemeToggle;
