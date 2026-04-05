import { Form, Input } from 'antd';
import { Info } from 'lucide-react';
import { getCategorySchema } from '../../../schemas/categorySchema';

export const CategoryIdField = ({ t, isEditing }) => {
    const rules = getCategorySchema(t);
    return (
        <Form.Item 
            name="id" 
            label={<span className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-1">{t('adminCategories:labelId')}</span>}
            rules={rules.id}
            className="m-0"
            help={
                <p className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 ml-2 mt-2">
                    <Info size={12} />
                    {t('adminCategories:hintId')}
                </p>
            }
        >
            <Input 
                disabled={isEditing}
                placeholder={t('adminCategories:phId')} 
                className="w-full !h-14 !text-base !bg-slate-50 dark:!bg-[#0c1324] disabled:!bg-slate-100 disabled:dark:!bg-white/5 !border-slate-200 dark:!border-white/10 !rounded-2xl px-6 text-slate-800 dark:text-white font-mono placeholder:text-slate-400 dark:placeholder:text-slate-600 hover:!border-yellow-500 focus:!border-yellow-500 focus:!shadow-[0_0_0_4px_rgba(234,179,8,0.1)] transition-all outline-none disabled:opacity-60 disabled:cursor-not-allowed" 
            />
        </Form.Item>
    );
};
