import { Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import LanguageMenuItem from './components/LanguageMenuItem';
import LanguageButton from './components/LanguageButton';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation('layout');

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const items = [
        {
            key: 'en',
            label: (
                <LanguageMenuItem
                    flagUrl="https://flagcdn.com/w20/us.png"
                    flagAlt="English (US)"
                    label="English (EN)"
                    labelClass={i18n.language === 'en'
                        ? "text-sm font-bold dark:text-premium-gold text-yellow-600"
                        : "text-sm font-medium dark:text-slate-400 text-slate-500"}
                />
            ),
            onClick: () => changeLanguage('en')
        },
        {
            key: 'vi',
            label: (
                <LanguageMenuItem
                    flagUrl="https://flagcdn.com/w20/vn.png"
                    flagAlt="Tiếng Việt (VN)"
                    label="Tiếng Việt (VI)"
                    labelClass={i18n.language === 'vi'
                        ? "text-sm font-bold dark:text-premium-gold text-yellow-600"
                        : "text-sm font-medium dark:text-slate-400 text-slate-500"}
                />
            ),
            onClick: () => changeLanguage('vi')
        }
    ];

    return (
        <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={['click']}
            overlayClassName="dark:[&_.ant-dropdown-menu]:bg-[#141416]/95 dark:[&_.ant-dropdown-menu]:backdrop-blur-xl dark:[&_.ant-dropdown-menu]:border dark:[&_.ant-dropdown-menu]:border-white/10 dark:[&_.ant-dropdown-menu]:shadow-2xl [&_.ant-dropdown-menu]:rounded-xl font-sans"
        >
            <div>
                <LanguageButton currentLang={i18n.language} />
            </div>
        </Dropdown>
    );
};

export default LanguageSwitcher;
