import { Mail, Globe } from 'lucide-react';
import { Skeleton } from 'antd';

const ContactInfoBlock = ({ contactData, isLoading, t }) => {
    if (isLoading) {
        return (
            <div className="lg:col-span-5 space-y-12 animate-pulse">
                <div className="space-y-6">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4"></div>
                    <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-lg w-full"></div>
                </div>
                <div className="space-y-8">
                    <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                        <div className="space-y-2 w-full">
                            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-sm w-1/4"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-1/2"></div>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                        <div className="space-y-2 w-full">
                            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-sm w-1/4"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-1/2"></div>
                        </div>
                    </div>
                </div>
                <div className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 border-l-4 border-slate-300 dark:border-slate-700"></div>
            </div>
        );
    }

    return (
        <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase text-slate-900 dark:text-white leading-tight">
                    {t('formSection_title')}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                    {contactData?.introText}
                </p>
            </div>
            <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-default">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 group-hover:border-yellow-500/50 group-hover:bg-yellow-500/10 transition-all">
                        <Mail className="text-yellow-600 dark:text-yellow-500 w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 tracking-[0.2em] uppercase font-bold mb-1">
                            {t('formSection_email')}
                        </p>
                        <p className="font-bold text-slate-900 dark:text-white text-base">
                            {contactData?.email}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-6 group cursor-default">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 group-hover:border-yellow-500/50 group-hover:bg-yellow-500/10 transition-all">
                        <Globe className="text-yellow-600 dark:text-yellow-500 w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 tracking-[0.2em] uppercase font-bold mb-1">
                            {t('formSection_social')}
                        </p>
                        <p className="font-bold text-slate-900 dark:text-white text-base">
                            {contactData?.socialMedia}
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-8 rounded-3xl bg-slate-100 dark:bg-white/5 border-l-4 border-yellow-500 backdrop-blur-sm">
                <p className="italic text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    "{contactData?.quoteText}"
                </p>
            </div>
        </div>
    );
};

export default ContactInfoBlock;
