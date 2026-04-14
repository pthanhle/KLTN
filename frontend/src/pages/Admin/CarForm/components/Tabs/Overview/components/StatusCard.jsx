import { Form, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

const StatusCard = () => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-8 shadow-sm dark:shadow-[0_15px_30px_rgba(0,0,0,0.2)] space-y-6 border border-slate-200 dark:border-white/5">
            <label className="block text-[11px] uppercase tracking-widest text-slate-500 font-black mb-6">{t('statusHeading', 'Trạng thái phân phối')}</label>
            
            <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 p-4 -mx-4 rounded-xl transition-colors">
                <div className="flex flex-col">
                    <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">{t('isNewLabel', 'Mô hình xe lướt')}</span>
                    <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400 mt-1">{t('isNewDesc', 'Sản phẩm đã qua sử dụng (Pre-owned)')}</span>
                </div>
                <Form.Item 
                    name="isNew" 
                    valuePropName="checked" 
                    getValueProps={(value) => ({ checked: !value })}
                    getValueFromEvent={(checked) => !checked}
                    className="mb-0"
                >
                    <Switch className="bg-slate-300 dark:bg-[#2e3447] scale-110" />
                </Form.Item>
            </div>
            
            <div className="h-px bg-slate-100 dark:bg-white/5"></div>
            
            <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 p-4 -mx-4 rounded-xl transition-colors">
                <div className="flex flex-col">
                    <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">{t('isDemoLabel', 'Cho phép Lái Thử')}</span>
                    <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400 mt-1">{t('isDemoDesc', 'Kích hoạt đăng ký Test Drive trực tuyến')}</span>
                </div>
                <Form.Item name="isDemoAvailable" valuePropName="checked" className="mb-0">
                    <Switch className="bg-slate-300 dark:bg-[#2e3447] scale-110" />
                </Form.Item>
            </div>
        </div>
    );
};

export default StatusCard;
