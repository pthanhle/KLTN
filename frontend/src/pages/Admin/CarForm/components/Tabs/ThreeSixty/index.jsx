import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import ThreeSixtyUploader from './components/UploaderSection';
import ThreeSixtyPreview from './components/PreviewSection';
import { useThreeSixtyForm } from './hooks/useThreeSixtyForm';

const HiddenStore = () => null;

const ThreeSixtyTab = ({ form }) => {
    const { t } = useTranslation('adminCarForm');
    const manager = useThreeSixtyForm(form);

    return (
        <div className="w-full">
            <header className="mb-12 flex flex-wrap gap-4 items-end justify-between">
                <div>
                    <span className="text-yellow-500 text-[10px] uppercase tracking-[0.3em] font-black">
                        {t('tab360SubTitle', 'Studio Module')}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter mt-2 text-slate-900 dark:text-white uppercase">
                        {t('tab360Title', '360° Studio Configurator')}
                    </h1>
                </div>
                
                <div className="flex items-center gap-4 pb-1">
                    <div className="px-4 py-2 bg-slate-100 dark:bg-[#1c1c1e] rounded-full flex items-center gap-2 border border-slate-200 dark:border-white/10">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600 dark:text-emerald-400">
                            {t('tab360StatusReady', 'System Ready')}
                        </span>
                    </div>
                </div>
            </header>

            {/* Hidden field bound to form */}
            <Form.Item name="threeSixty" hidden><HiddenStore /></Form.Item>

            <div className="grid grid-cols-12 gap-8 relative z-10">
                <div className="col-span-12 lg:col-span-4">
                    <ThreeSixtyUploader manager={manager} />
                </div>
                <div className="col-span-12 lg:col-span-8">
                    <ThreeSixtyPreview manager={manager} />
                </div>
            </div>
        </div>
    );
};

export default ThreeSixtyTab;
