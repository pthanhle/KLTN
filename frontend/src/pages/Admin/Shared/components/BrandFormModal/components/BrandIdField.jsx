import { Form, Input } from 'antd';
import { getBrandSchema } from '../../../schemas/brandSchema';

export const BrandIdField = ({ isEditing, t }) => {
    const rules = getBrandSchema(t);
    return (
        <Form.Item 
            name="id" 
            label={<span className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-1">{t('adminBrands:labelId', 'Mã Định Danh/Slug')}</span>}
            rules={rules.id}
            className="m-0"
            help={<p className="mt-2 text-xs text-slate-400 dark:text-slate-500 italic">{t('adminBrands:hintId', 'Mã định danh URL (Tự động tạo từ Tên)')}</p>}
        >
            <Input 
                disabled={isEditing}
                placeholder={t('adminBrands:phId', 'mercedes-benz')} 
                className="w-full h-14 px-5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 focus:bg-slate-100 dark:focus:bg-zinc-800 focus:ring-2 focus:ring-yellow-500/20 text-slate-600 dark:text-slate-300 font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:bg-white/5" 
            />
        </Form.Item>
    );
};
