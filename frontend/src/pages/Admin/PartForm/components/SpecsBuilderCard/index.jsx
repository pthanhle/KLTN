import React from 'react';
import { SlidersHorizontal, Plus, X } from 'lucide-react';
import FormInput from '../ui/FormInput';
import { useSpecsBuilder } from './hooks/useSpecsBuilder';

const SpecsBuilderCard = ({ t }) => {
    const { control, fields, remove, handleAddSpec } = useSpecsBuilder();

    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <SlidersHorizontal className="text-emerald-500" size={24} />
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                    {t('adminPartForm:specs')}
                </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-6 pt-10 bg-slate-50 dark:bg-[#1c1c1e] rounded-3xl border-2 border-transparent hover:border-yellow-500/20 transition-all group">
                        <button 
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-3 right-3 text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-all p-2 rounded-xl opacity-0 xl:opacity-0 group-hover:opacity-100 opacity-100"
                        >
                            <X size={18} strokeWidth={3} />
                        </button>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 font-bold select-none">
                                    {t('adminPartForm:specLabel') || 'Tên Thông Số'}
                                </label>
                                <FormInput 
                                    name={`specs.${index}.label`} 
                                    control={control} 
                                    placeholder={t('adminPartForm:phSpecLabel')}
                                    extraClassName="text-slate-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 font-bold select-none">
                                    {t('adminPartForm:specValue') || 'Giá Trị Chi Tiết'}
                                </label>
                                <FormInput 
                                    name={`specs.${index}.value`} 
                                    control={control} 
                                    type="textarea"
                                    rows={2}
                                    placeholder={t('adminPartForm:phSpecValue')} 
                                    extraClassName="text-slate-600 dark:text-slate-300 font-normal"
                                />
                            </div>
                        </div>
                    </div>
                ))}
                
                <button 
                    type="button"
                    onClick={handleAddSpec}
                    className="col-span-1 md:col-span-2 py-4 rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/5 text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                >
                    <Plus size={18} strokeWidth={3} />
                    {t('adminPartForm:addSpec')}
                </button>
            </div>
        </section>
    );
};

export default SpecsBuilderCard;
