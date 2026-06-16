import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { Box } from 'lucide-react';
const HiddenStore = () => null;

const StockDisplay = () => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="w-full">
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-3 ml-2">
                {t('stockLbl', 'Số lượng kho')}
            </label>
            <div className="relative p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <Box size={20} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('autoCalculated', 'Tự động tính toán')}</span>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.stock !== currentValues.stock}
                        >
                            {({ getFieldValue }) => {
                                const stock = getFieldValue('stock') || 0;
                                return (
                                    <span className="text-xl font-black text-slate-900 dark:text-white">
                                        {stock} <span className="text-sm font-medium text-slate-500">{t('unitPiece', 'Chiếc')}</span>
                                    </span>
                                );
                            }}
                        </Form.Item>
                    </div>
                </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 italic ml-2">
                * {t('stockReadOnlyNotice', 'Số lượng tồn kho được tính tự động từ Tab Kho Xe (Vehicle Units).')}
            </p>
            <Form.Item name="stock" hidden>
                <HiddenStore />
            </Form.Item>
        </div>
    );
};

export default StockDisplay;
