import { Form, Input } from 'antd';
import { getBrandSchema } from '../../../schemas/brandSchema';

export const BrandNameField = ({ t }) => {
    const rules = getBrandSchema(t);
    return (
        <Form.Item 
            name="name" 
            label={<span className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-1">{t('adminBrands:labelName', 'Tên Thương Hiệu')}</span>}
            rules={rules.name}
            className="m-0"
        >
            <Input 
                placeholder={t('adminBrands:phName', 'Ví dụ: Mercedes-Benz')} 
                className="w-full h-14 px-5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-white/10 hover:border-yellow-500 dark:hover:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 text-[#0c1324] dark:text-white placeholder-slate-400 font-medium transition-all" 
            />
        </Form.Item>
    );
};
