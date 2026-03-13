import { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    const [fontSizeMultiplier, setFontSizeMultiplier] = useState(() => {
        return parseFloat(localStorage.getItem('fontSizeMultiplier')) || 1;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSizeMultiplier * 100}%`;
        localStorage.setItem('fontSizeMultiplier', fontSizeMultiplier.toString());
    }, [fontSizeMultiplier]);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    const toggleFontSize = () => {
        // Vòng lặp: Bình thường (1) -> To (1.1) -> Nhỏ (0.9) -> Bình thường (1)
        setFontSizeMultiplier(prev => {
            if (prev === 1) return 1.1; // Chữ to
            if (prev === 1.1) return 0.9; // Chữ nhỏ
            return 1; // Chữ bình thường
        });
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, fontSizeMultiplier, setFontSizeMultiplier, toggleFontSize }}>
            <ConfigProvider
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        colorPrimary: '#eab308',
                        fontFamily: '"Inter", sans-serif',
                        colorBgElevated: isDarkMode ? '#141416' : '#ffffff',
                        colorText: isDarkMode ? '#f8fafc' : '#0f172a',
                        borderRadius: 12,
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
