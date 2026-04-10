import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { getPricingRules } from '../../../../../schemas/carPricingSchema';

const StockDisplay = () => {
    const { t } = useTranslation('adminCarForm');
    const rules = getPricingRules(t);

    return (
        <div className="w-full">
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-3 ml-2">
                {t('stockLbl', 'Số lượng kho')}
            </label>
            <div className="relative">
                <Form.Item name="stock" rules={rules.stock} className="mb-0" initialValue={0}>
                    <InputNumber
                        style={{ width: '100%' }}
                        className="w-full !bg-slate-50 dark:!bg-[#0a0a0b]/40 shadow-inner !border-none !rounded-xl [&_.ant-input-number-input]:!text-right [&_.ant-input-number-input]:!h-12 [&_.ant-input-number-input]:!text-lg [&_.ant-input-number-input]:!font-bold [&_.ant-input-number-input]:!pr-16 [&_.ant-input-number-input]:!cursor-default !cursor-default !text-slate-500 dark:!text-slate-400 pointer-events-none"
                        placeholder="0"
                        readOnly
                        min={0}
                        controls={false}
                    />
                </Form.Item>
                <div className="absolute right-4 top-0 bottom-0 flex items-center pointer-events-none">
                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">{t('unitPiece', 'Chiếc')}</span>
                </div>
            </div>
        </div>
    );
};

export default StockDisplay;
