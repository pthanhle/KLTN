import { useTranslation } from 'react-i18next';
import { useColorPreview } from '../hooks/useColorPreview';
import { DEFAULT_PREVIEW_NAME } from '../../../../constants/carColors';

const ColorSwatchPreview = ({ name }) => {
    const { t } = useTranslation('adminCarForm');
    const { hexColor, colorName } = useColorPreview(name);

    return (
        <div className="shrink-0 flex flex-col items-center gap-4">
            <div
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full shadow-[inset_0_4px_12px_rgba(255,255,255,0.2),0_15px_30px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_4px_12px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-center relative overflow-hidden ring-4 ring-slate-50 dark:ring-[#222225] transition-colors duration-500 border border-slate-200 dark:border-white/5"
                style={{ backgroundColor: hexColor }}
            >
                {/* Glassmorphism gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                <span className="text-xs font-mono font-bold tracking-widest text-white mix-blend-difference drop-shadow-md z-10 px-2 py-1 bg-black/20 rounded-lg">
                    {hexColor.toUpperCase()}
                </span>
            </div>
            <div className="flex flex-col items-center text-center">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
                    {t('colorPreviewLabel', 'Xem trước')}
                </span>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate w-32">
                    {colorName === DEFAULT_PREVIEW_NAME ? t('colorBasePreview', 'Màu giả lập') : colorName}
                </p>
            </div>
        </div>
    );
};

export default ColorSwatchPreview;
