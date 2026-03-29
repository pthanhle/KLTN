import { Form, Select, Radio, Switch, Input } from 'antd';
import { Database, Diamond, Award } from 'lucide-react';
import { SOURCE_OPTIONS } from '../../constants/formConfig';
import { SectionHeader } from '../UI/SectionHeader';

export const CategorizationSection = ({ t, tiersList, schemas }) => {
    return (
        <section className="py-8 border-b border-slate-100 dark:border-white/5">
            <SectionHeader icon={Database} title={t('adminCustomers:sectionCRM', 'Cài Đặt CRM')} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Form.Item 
                    name="source" 
                    label={<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t('adminCustomers:labelSource', 'Nguồn khách')}</span>}
                    className="mb-0"
                >
                    <Select 
                        className="w-full h-[54px] bg-slate-50 dark:bg-white/5 rounded-xl border border-transparent hover:bg-slate-100 dark:hover:bg-white/10 transition-colors" 
                        variant="borderless"
                        classNames={{ popup: '!dark:bg-[#151b2d] !bg-white' }}
                        options={SOURCE_OPTIONS.map(opt => ({
                            value: opt.value,
                            label: <span className="font-bold text-slate-900 dark:text-white text-[14px] leading-[36px] px-2">{t(opt.labelKey, opt.fallbackLabel)}</span>
                        }))}
                    />
                </Form.Item>

                <Form.Item 
                    name="status" 
                    label={<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t('adminCustomers:labelStatus', 'Trạng thái')}</span>}
                    className="mb-0"
                >
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 px-5 h-[54px] rounded-xl border border-transparent hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <Form.Item name="status" valuePropName="checked" noStyle>
                            <Switch className="bg-slate-300 dark:bg-slate-600 [&.ant-switch-checked]:bg-emerald-500 scale-110" />
                        </Form.Item>
                        <span className="text-[12px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-0.5">HOẠT ĐỘNG</span>
                    </div>
                </Form.Item>

                <Form.Item 
                    name="tier" 
                    label={<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t('adminCustomers:labelTier', 'Hạng VIP')}</span>}
                    rules={schemas?.tier}
                    className="mb-0 col-span-1 md:col-span-2 lg:col-span-3 custom-radio-tier"
                >
                    <Radio.Group className="!grid grid-cols-2 md:grid-cols-5 gap-3 !w-full">
                        {tiersList?.map((tier, idx) => (
                            <Radio.Button 
                                key={tier.id} 
                                value={tier.id}
                            >
                                <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full py-2">
                                    {idx > 1 ? <Diamond size={16} /> : <Award size={16} />}
                                    <span className="text-[10px] font-bold uppercase leading-none">{tier.name}</span>
                                </div>
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <Form.Item 
                    name="notes" 
                    className="mb-0 col-span-1 md:col-span-2 lg:col-span-3 mt-4"
                >
                    <Input.TextArea 
                        rows={4} 
                        className="w-full bg-yellow-50/50 dark:bg-[#ffd165]/5 border border-yellow-200/50 dark:border-[#ffd165]/10 rounded-2xl px-6 py-5 text-slate-900 dark:text-white focus:ring-2 focus:ring-yellow-500 transition-all outline-none resize-none font-medium placeholder:font-normal placeholder:opacity-60 !h-auto shadow-inner" 
                        placeholder={t('adminCustomers:placeholderNotes', 'Ghi chú quan trọng: Yêu cầu đặc biệt, thói quen VIP...')}
                    />
                </Form.Item>
            </div>
        </section>
    );
};
