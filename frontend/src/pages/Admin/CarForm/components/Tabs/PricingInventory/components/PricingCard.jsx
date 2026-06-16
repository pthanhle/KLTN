import { Form, InputNumber, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { Wallet, TrendingDown } from 'lucide-react';
import { getPricingRules } from '../../../../schemas/carPricingSchema';
import { usePricingState } from '../hooks/usePricingState';
import { numberToText } from '../../../../../../../utils/numberToText';
import { parseNumericInput, preventNonNumericInput } from '../../../../utils/carFormUtils';

const PricingCard = ({ form, isLoading }) => {
    const { t, i18n } = useTranslation('adminCarForm');
    const rules = getPricingRules(t);
    const { discountPercent, price, salePrice } = usePricingState(form);

    const lang = i18n?.language?.startsWith('en') ? 'en' : 'vi';

    return (
        <section className="animate-fade-in">
            <div className="bg-white dark:bg-[#141416] rounded-xl p-8 shadow-sm dark:shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 dark:bg-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-500">
                        <Wallet size={20} className="fill-yellow-600/20 dark:fill-yellow-500/20" />
                    </div>
                    <h2 className="text-xl font-bold uppercase tracking-widest text-yellow-600 dark:text-yellow-500">{t('pricingTabTitle', 'GIÁ TIỀN')}</h2>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Skeleton.Input active block style={{ height: '96px', borderRadius: '12px' }} />
                        <Skeleton.Input active block style={{ height: '96px', borderRadius: '12px' }} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-3 ml-4">
                                {t('basePriceLbl', 'Giá Niêm Yết')}
                            </label>
                            <div className="relative block">
                                <Form.Item 
                                    name="price" 
                                    rules={rules.price} 
                                    className="mb-0 w-full [&_.ant-form-item-explain-error]:!text-right [&_.ant-form-item-explain-error]:!mt-2 [&_.ant-form-item-explain-error]:!text-[12px] [&_.ant-form-item-explain-error]:!font-medium"
                                    extra={
                                        price > 0 ? (
                                            <div className="text-right text-[12px] italic font-medium text-slate-500/80 mt-1 truncate">
                                                {numberToText(price, lang)}
                                            </div>
                                        ) : null
                                    }
                                >
                                    <InputNumber 
                                        style={{ width: '100%' }}
                                        className="!bg-slate-50 dark:!bg-[#0a0a0b] !border-none !rounded-xl focus-within:!ring-2 focus-within:!ring-yellow-500/50 transition-all dark:border dark:border-white/5 [&_.ant-input-number-input-wrap]:!w-full [&_.ant-input-number-input]:!w-full [&_.ant-input-number-input]:!h-[90px] [&_.ant-input-number-input]:!px-8 [&_.ant-input-number-input]:!pr-24 [&_.ant-input-number-input]:!text-4xl [&_.ant-input-number-input]:!font-extrabold [&_.ant-input-number-input]:!text-slate-900 dark:[&_.ant-input-number-input]:!text-white [&_.ant-input-number-input]:!text-left"
                                        placeholder="0"
                                        min={0}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={parseNumericInput}
                                        controls={false}
                                        onKeyPress={preventNonNumericInput}
                                    />
                                </Form.Item>
                                <span className="absolute top-[31px] right-8 text-xl font-bold text-slate-400 tracking-tighter pointer-events-none z-10">{t('currencyVND', 'VNĐ')}</span>
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-3 ml-4">
                                {t('salePriceLbl', 'Giá Khuyến Mãi')}
                            </label>
                            <div className="relative block">
                                <Form.Item 
                                    name="salePrice" 
                                    rules={rules.salePrice} 
                                    className="mb-0 w-full [&_.ant-form-item-explain-error]:!text-right [&_.ant-form-item-explain-error]:!mt-2 [&_.ant-form-item-explain-error]:!text-[12px] [&_.ant-form-item-explain-error]:!font-medium"
                                    extra={
                                        salePrice > 0 ? (
                                            <div className="text-right text-[12px] italic font-bold text-yellow-600 dark:text-yellow-500 mt-1 truncate">
                                                {numberToText(salePrice, lang)}
                                            </div>
                                        ) : null
                                    }
                                >
                                    <InputNumber 
                                        style={{ width: '100%' }}
                                        className="!bg-slate-50 dark:!bg-[#0a0a0b] !border-none !rounded-xl shadow-[0_0_40px_rgba(234,179,8,0.05)] focus-within:!ring-2 focus-within:!ring-yellow-500 transition-all dark:border dark:border-white/5 [&_.ant-input-number-input-wrap]:!w-full [&_.ant-input-number-input]:!w-full [&_.ant-input-number-input]:!h-[90px] [&_.ant-input-number-input]:!px-8 [&_.ant-input-number-input]:!pr-24 [&_.ant-input-number-input]:!text-4xl [&_.ant-input-number-input]:!font-extrabold [&_.ant-input-number-input]:!text-yellow-600 dark:[&_.ant-input-number-input]:!text-yellow-500 [&_.ant-input-number-input]:!text-left"
                                        placeholder="0"
                                        min={0}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={parseNumericInput}
                                        controls={false}
                                        onKeyPress={preventNonNumericInput}
                                    />
                                </Form.Item>
                                <span className="absolute top-[31px] right-8 text-xl font-bold text-yellow-600/60 dark:text-yellow-500/60 tracking-tighter pointer-events-none z-10">{t('currencyVND', 'VNĐ')}</span>
                            </div>

                            {discountPercent > 0 && (
                                <div className="absolute -bottom-6 right-4 flex items-center gap-1">
                                    <TrendingDown className="text-red-500" size={14} />
                                    <span className="text-red-500 font-bold text-xs uppercase tracking-tight">-{discountPercent}% {t('discountText', 'Giảm')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PricingCard;
