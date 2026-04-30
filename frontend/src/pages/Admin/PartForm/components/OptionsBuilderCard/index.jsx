import React from 'react';
import { Settings2, X, Plus } from 'lucide-react';
import FormInput from '../ui/FormInput';
import FormSelect from '../ui/FormSelect';
import { useOptionsBuilder } from './hooks/useOptionsBuilder';

const OptionsBuilderCard = ({ t }) => {
    const { control, fields, remove, handleAddOption } = useOptionsBuilder();

    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <Settings2 className="text-yellow-500" size={24} />
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                    {t('adminPartForm:options')}
                </h3>
            </div>

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-6 pt-10 bg-slate-50 dark:bg-[#1c1c1e] rounded-3xl border-2 border-transparent hover:border-yellow-500/20 transition-all group">
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-3 right-3 text-red-500 hover:text-red-700 hover:bg-red-500/10 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all object-cover"
                        >
                            <X size={18} strokeWidth={3} />
                        </button>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 font-bold select-none">
                                    {t('adminPartForm:phOptionType') || 'Loại Tùy Chọn'}
                                </label>
                                <FormInput
                                    name={`options.${index}.type`}
                                    control={control}
                                    placeholder={t('adminPartForm:phOptionType')}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 font-bold select-none">
                                    {t('adminPartForm:phOptionChoices') || 'Các Lựa Chọn'}
                                </label>
                                <FormSelect
                                    name={`options.${index}.choices`}
                                    control={control}
                                    mode="tags"
                                    placeholder={t('adminPartForm:phOptionChoices')}
                                    options={[]}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddOption}
                    className="w-full py-4 rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/5 text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                >
                    <Plus size={18} strokeWidth={3} />
                    {t('adminPartForm:setupOption')}
                </button>
            </div>
        </section>
    );
};

export default OptionsBuilderCard;
