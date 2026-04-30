import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Select, Button } from 'antd';
import { Plus } from 'lucide-react';
import QuickAddCategoryModal from './QuickAddCategoryModal';

const CategoryField = ({ t, categoryOptions }) => {
    const { control, setValue, formState: { errors } } = useFormContext();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleCloseModal = (createdCategoryId) => {
        setIsAddModalOpen(false);
        if (createdCategoryId) {
            setValue('category', createdCategoryId, { shouldValidate: true, shouldDirty: true });
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1">
                    {t('adminServiceItems:form_category')} <span className="text-red-500">*</span>
                </label>
                <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-200 dark:hover:bg-yellow-500/10 dark:hover:text-yellow-500 dark:hover:border-yellow-500/20 transition-all duration-300 cursor-pointer shadow-sm hover:shadow group"
                >
                    <Plus size={12} className="transition-transform group-hover:rotate-90 duration-300" />
                    <span>{t('adminServiceItems:form_category_add_btn', 'Thêm')}</span>
                </button>
            </div>
            
            <Controller
                name="category"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        size="large"
                        showSearch
                        placeholder={t('adminServiceItems:form_category_placeholder')}
                        options={categoryOptions}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        className={`w-full text-[15px] font-medium [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-zinc-800/50 [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 ${errors.category ? '[&_.ant-select-selector]:!border-red-500' : ''}`}
                    />
                )}
            />
            {errors.category && <span className="text-[11px] font-bold text-red-500">{errors.category.message}</span>}

            <QuickAddCategoryModal 
                isOpen={isAddModalOpen} 
                onClose={handleCloseModal} 
                t={t}
            />
        </div>
    );
};

export default CategoryField;