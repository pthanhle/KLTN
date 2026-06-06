import React from 'react';
import { useWatch } from 'react-hook-form';
import FormInput from '../../../ui/FormInput';
import FormSelect from '../../../ui/FormSelect';
import ImageUploadField from '../../../ui/ImageUploadField';
import { getAlignOptions } from '../../constants/index.jsx';

const HeroBlockEditor = ({ control, index, t }) => {
    const blockData = useWatch({ control, name: `landing_blocks.${index}` }) || {};

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* Editor Forms */}
            <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold select-none">
                            {t('adminPartForm:lblH2Title')}
                        </label>
                        <FormInput name={`landing_blocks.${index}.title`} control={control} placeholder={t('adminPartForm:phH2Title')} />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold select-none">
                            {t('adminPartForm:lblSubtitle')}
                        </label>
                        <FormInput name={`landing_blocks.${index}.subtitle`} control={control} type="textarea" rows={4} placeholder={t('adminPartForm:phSubtitle')} />
                    </div>
                </div>
                <div className="space-y-4">
                    <ImageUploadField
                        name={`landing_blocks.${index}.image_url`}
                        control={control}
                        label={t('adminPartForm:lblImgUrl')}
                    />
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold select-none">
                            {t('adminPartForm:lblAlign')}
                        </label>
                        <FormSelect
                            name={`landing_blocks.${index}.align`}
                            control={control}
                            options={getAlignOptions(t)}
                        />
                    </div>
                </div>
            </div>

            {/* Live Visual Preview */}
            <div className="xl:col-span-5 relative w-full h-[220px] rounded-2xl overflow-hidden group shadow-sm flex">
                {blockData.image_url && (
                    <div
                        className="absolute inset-0 bg-cover bg-center z-0"
                        style={{ backgroundImage: `url(${blockData.image_url})` }}
                    />
                )}
                <div className={`absolute inset-0 ${blockData.image_url ? 'bg-black/40' : 'bg-white dark:bg-[#141416]'} z-0`} />
                <div className={`w-full h-full flex flex-col justify-center px-8 relative z-10 ${blockData.image_url ? 'text-white' : 'text-slate-900 dark:text-white'} ${blockData.align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
                    <h4 className="font-bold text-xl leading-tight mb-2">
                        {blockData.title || t('adminPartForm:phH2Title')}
                    </h4>
                    <p className="text-sm opacity-80 line-clamp-3">
                        {blockData.subtitle || t('adminPartForm:phSubtitle')}
                    </p>
                </div>

                <div className="absolute top-3 left-3 bg-indigo-500 text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-md font-bold z-20 shadow-lg">
                    {t('adminPartForm:livePreview')}
                </div>
            </div>
        </div>
    );
};

export default HeroBlockEditor;
