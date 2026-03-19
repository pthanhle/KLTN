import { Headset } from 'lucide-react';
import { Button } from 'antd';

const SupportBanner = ({ t }) => {
    return (
        <div className="bg-slate-900 dark:bg-[#141416] p-8 md:p-10 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl mt-12 mb-10 border border-transparent dark:border-white/5">
            <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold mb-2 tracking-tight">
                    {t('success_support_title')}
                </h3>
                <p className="text-sm text-slate-400 font-medium">
                    {t('success_support_desc')}
                </p>
            </div>
            <Button 
                type="primary"
                icon={<Headset size={18} strokeWidth={2.5} />}
                className="h-14 px-8 bg-yellow-500 hover:!bg-yellow-600 border-none text-slate-900 font-black tracking-widest uppercase rounded-full w-full md:w-auto text-sm shrink-0 transition-transform active:scale-95"
            >
                {t('success_support_hotline')}
            </Button>
        </div>
    );
};

export default SupportBanner;
