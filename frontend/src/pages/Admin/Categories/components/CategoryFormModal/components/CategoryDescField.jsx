import { Form, Input } from 'antd';
import { getCategorySchema } from '../../../schemas/categorySchema';

export const CategoryDescField = ({ t }) => {
    const rules = getCategorySchema(t);
    return (
        <Form.Item 
            name="description" 
            label={<span className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-1">{t('adminCategories:labelDesc')}</span>}
            rules={rules.description}
            className="m-0"
        >
            <Input.TextArea 
                placeholder={t('adminCategories:phDesc')} 
                className="w-full !h-36 !text-base !bg-slate-50 dark:!bg-[#1c1c1e] !border-slate-200 dark:!border-white/10 !rounded-2xl px-6 py-5 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 hover:!border-yellow-500 focus:!border-yellow-500 focus:!shadow-[0_0_0_4px_rgba(234,179,8,0.1)] transition-all outline-none resize-none" 
            />
        </Form.Item>
    );
};
