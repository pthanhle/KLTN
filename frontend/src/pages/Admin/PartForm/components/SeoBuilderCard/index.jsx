import React from 'react';
import { Globe, Wand2 } from 'lucide-react';
import FormInput from '../ui/FormInput';
import { useSeoBuilder } from './hooks/useSeoBuilder';

const SeoBuilderCard = ({ t }) => {
    const { control, seoTitle, seoDesc, generateSlug } = useSeoBuilder();


    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-200 dark:border-white/5">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Globe className="text-blue-500" size={24} />
                    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                        {t('adminPartForm:seoConfig')}
                    </h3>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="h-[28px] flex justify-between items-center mb-3">
                        <label className="block text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                            {t('adminPartForm:seoUrlSlug')}
                        </label>
                        <button 
                            type="button" 
                            onClick={generateSlug}
                            className="text-[10px] uppercase font-bold text-blue-500 flex items-center gap-1 hover:text-blue-600 transition-colors"
                        >
                            <Wand2 size={12} /> {t('adminPartForm:seoAuto')}
                        </button>
                    </div>
                    <FormInput 
                        name="slug" 
                        control={control} 
                        placeholder="giam-xoc-yss"
                        prefix={<span className="text-slate-400 pr-2 border-r border-slate-300 dark:border-slate-600 mr-2">/parts/</span>}
                        isMono={true}
                    />
                </div>

                <div>
                    <label className="h-[28px] flex justify-between items-center text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 font-bold">
                        <span>{t('adminPartForm:seoMetaTitle')}</span>
                        <span className={`px-2 py-0.5 rounded-md ${seoTitle.length > 60 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                            {seoTitle.length}/60
                        </span>
                    </label>
                    <FormInput 
                        name="seo_title" 
                        control={control} 
                        placeholder={t('adminPartForm:seoTitlePh')} 
                    />
                </div>

                <div>
                    <label className="h-[28px] flex justify-between items-center text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 font-bold">
                        <span>{t('adminPartForm:seoMetaDesc')}</span>
                        <span className={`px-2 py-0.5 rounded-md ${seoDesc.length > 160 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                            {seoDesc.length}/160
                        </span>
                    </label>
                    <FormInput 
                        name="seo_description" 
                        control={control} 
                        type="textarea"
                        rows={4}
                        placeholder={t('adminPartForm:seoDescPh')} 
                    />
                </div>
            </div>
        </section>
    );
};

export default SeoBuilderCard;
