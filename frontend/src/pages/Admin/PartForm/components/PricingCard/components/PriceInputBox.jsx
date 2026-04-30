import React from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { numberToText } from '@/utils/numberToText';

const PriceInputBox = ({ name, label, isHighlight, badge }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language === 'en' ? 'en' : 'vi';

    return (
        <div className={`p-6 sm:p-8 rounded-[2rem] transition-all duration-300 ${
            isHighlight 
            ? 'bg-yellow-50/50 dark:bg-[#1c1c1e]/80 border-2 border-yellow-400/30' 
            : 'bg-slate-50 dark:bg-[#1c1c1e] border-2 border-transparent'
        }`}>
            <label className={`flex items-center justify-between text-[11px] uppercase tracking-widest mb-4 font-bold ${
                isHighlight ? 'text-yellow-600 dark:text-yellow-500' : 'text-slate-500 dark:text-slate-400'
            }`}>
                <span>{label}</span>
                {badge && badge}
            </label>
            <Controller
                name={name}
                render={({ field, fieldState }) => {
                    const val = field.value || 0;
                    const textOut = numberToText(val, currentLang);
                    return (
                        <>
                            <Form.Item 
                                validateStatus={fieldState.error ? 'error' : ''}
                                help={fieldState.error?.message}
                                className="mb-0"
                            >
                                <InputNumber 
                                    {...field}
                                    className={`!w-full !rounded-2xl !border-transparent !bg-white dark:!bg-[#141416] shadow-sm hover:shadow-md focus-within:!ring-2 focus-within:!ring-yellow-500/50 transition-all duration-300 [&_.ant-input-number-handler-wrap]:hidden
                                        [&_.ant-input-number-input]:text-3xl sm:[&_.ant-input-number-input]:text-4xl [&_.ant-input-number-input]:h-16 [&_.ant-input-number-input]:!px-6 [&_.ant-input-number-input]:font-black [&_.ant-input-number-input]:text-left
                                        ${isHighlight 
                                            ? '[&_.ant-input-number-input]:text-yellow-600 dark:[&_.ant-input-number-input]:text-yellow-500' 
                                            : '[&_.ant-input-number-input]:text-slate-800 dark:[&_.ant-input-number-input]:text-white'
                                        }
                                    `} 
                                    formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={v => v.replace(/\$\s?|(,*)/g, '')}
                                    min={0}
                                    placeholder="0"
                                    onChange={(val) => field.onChange(val || 0)}
                                />
                            </Form.Item>
                            <p className="mt-4 text-[13px] italic font-medium text-slate-500 dark:text-slate-400 leading-relaxed break-words">
                                {textOut}
                            </p>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default PriceInputBox;
