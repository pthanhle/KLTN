import React from 'react';
import { Form, Input, Select, message } from 'antd';
import { PenLine, Save, X } from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';
import { ACQUISITION_SOURCES } from '../constants/contactConstants';
import { getContactSchemas } from '../schemas/contactSchemas';

export const ContactInfoCard = ({ customer, t }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { 
        form, 
        isEditing, 
        startEditing, 
        cancelEditing, 
        saveChanges 
    } = useContactForm(customer, t, messageApi);

    const schemas = getContactSchemas(t);

    return (
        <div className={`bg-white dark:bg-[#141416] border rounded-2xl p-8 sticky top-28 shadow-sm transition-all duration-300 ${isEditing ? 'border-yellow-500 shadow-yellow-500/10' : 'border-slate-200 dark:border-white/5'}`}>
            {contextHolder}
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-[11px] tracking-[0.2em] font-black text-yellow-600 dark:text-premium-gold uppercase">
                    {t('adminCustomers:sectionContactInfo', 'Contact Information')}
                </h3>
                
                {!isEditing ? (
                    <button 
                        onClick={startEditing}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-yellow-600 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-400 dark:hover:text-premium-gold transition-colors group"
                        title={t('adminCustomers:btnEditInline', 'Sửa nhanh')}
                    >
                        <PenLine size={14} className="group-hover:scale-110 transition-transform" />
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={cancelEditing}
                            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-colors"
                        >
                            <X size={14} strokeWidth={3} />
                        </button>
                        <button 
                            onClick={saveChanges}
                            className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
                        >
                            <Save size={14} strokeWidth={2.5} />
                        </button>
                    </div>
                )}
            </div>
            
            <Form form={form} layout="vertical" className="space-y-1">
                <Form.Item name="email" rules={schemas.email} className="!mb-4" label={<span className="text-[10px] tracking-widest text-slate-500 dark:text-slate-400 uppercase font-bold">{t('adminCustomers:labelEmail', 'Email Address')}</span>}>
                    {!isEditing ? (
                        <p className="text-slate-800 dark:text-slate-200 font-black">{customer.email}</p>
                    ) : (
                        <Input className="!bg-slate-50 dark:!bg-white/5 !border-slate-200 dark:!border-white/10 !rounded-lg !px-3 !py-2 !text-sm !text-slate-800 dark:!text-white hover:!border-yellow-500 focus:!border-yellow-500 !font-black" />
                    )}
                </Form.Item>
                
                <Form.Item name="phone" rules={schemas.phone} className="!mb-4" label={<span className="text-[10px] tracking-widest text-slate-500 dark:text-slate-400 uppercase font-bold">{t('adminCustomers:labelPhone', 'Phone Number')}</span>}>
                    {!isEditing ? (
                        <p className="text-slate-800 dark:text-slate-200 font-black">{customer.phone}</p>
                    ) : (
                        <Input className="!bg-slate-50 dark:!bg-white/5 !border-slate-200 dark:!border-white/10 !rounded-lg !px-3 !py-2 !text-sm !text-slate-800 dark:!text-white hover:!border-yellow-500 focus:!border-yellow-500 !font-black" />
                    )}
                </Form.Item>

                <Form.Item name="tax_id" rules={schemas.tax_id} className="!mb-4" label={<span className="text-[10px] tracking-widest text-slate-500 dark:text-slate-400 uppercase font-bold">{t('adminCustomers:labelTaxID', 'Tax ID / CCCD')}</span>}>
                    {!isEditing ? (
                        <p className="text-slate-800 dark:text-slate-200 font-medium">
                            {customer.tax_id ? <span className="font-mono text-sm tracking-widest">{customer.tax_id}</span> : t('adminCustomers:emptyNotUpdated', 'Chưa cập nhật')}
                        </p>
                    ) : (
                        <Input placeholder="CCCD/Tax..." className="!bg-slate-50 dark:!bg-white/5 !border-slate-200 dark:!border-white/10 !rounded-lg !px-3 !py-2 !text-sm !text-slate-800 dark:!text-white hover:!border-yellow-500 focus:!border-yellow-500 !font-mono !tracking-widest" />
                    )}
                </Form.Item>

                <Form.Item name="address" rules={schemas.address} className="!mb-4" label={<span className="text-[10px] tracking-widest text-slate-500 dark:text-slate-400 uppercase font-bold">{t('adminCustomers:labelAddress', 'Residential Address')}</span>}>
                    {!isEditing ? (
                        <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                            {customer.address || t('adminCustomers:emptyNotUpdated', 'Chưa cập nhật')}
                        </p>
                    ) : (
                        <Input.TextArea rows={3} className="!bg-slate-50 dark:!bg-white/5 !border-slate-200 dark:!border-white/10 !rounded-lg !px-3 !py-2 !text-xs !text-slate-800 dark:!text-white hover:!border-yellow-500 focus:!border-yellow-500 !resize-none !leading-relaxed" />
                    )}
                </Form.Item>

                <div className="pt-4 border-t border-slate-100 dark:border-white/10">
                    <Form.Item name="source" className="!mb-0" label={<span className="text-[10px] tracking-widest text-slate-500 dark:text-slate-400 uppercase font-bold">{t('adminCustomers:labelSource', 'Acquisition Source')}</span>}>
                        {!isEditing ? (
                            <span className="inline-flex items-center px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-[10px] font-black text-yellow-600 dark:text-premium-gold tracking-widest uppercase">
                                {t(`adminCustomers:${ACQUISITION_SOURCES.find(s => s.value === customer.source)?.labelKey}`, customer.source || 'OFFLINE (SHOWROOM)')}
                            </span>
                        ) : (
                            <Select 
                                className="styled-custom-select w-full"
                                classNames={{ popup: 'dark:bg-[#141416] dark:text-white' }}
                            >
                                {ACQUISITION_SOURCES.map(origin => (
                                    <Select.Option key={origin.value} value={origin.value}>
                                        <span className="text-xs font-black tracking-widest uppercase text-yellow-600 dark:text-premium-gold">{t(origin.labelKey, origin.value)}</span>
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};
