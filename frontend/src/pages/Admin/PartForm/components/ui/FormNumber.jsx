import React from 'react';
import { Form, InputNumber } from 'antd';
import { Controller } from 'react-hook-form';

const FormNumber = ({ name, control, min = 0, placeholder = "0", extraClassName = '' }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Form.Item validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message} className="mb-0 w-full">
                    <InputNumber 
                        {...field}
                        className={`!w-full h-14 !rounded-xl !bg-slate-50 dark:!bg-[#111727] !border-none !shadow-inner focus-within:!ring-2 focus-within:!ring-yellow-500/50 [&_.ant-input-number-input]:text-3xl [&_.ant-input-number-input]:h-14 [&_.ant-input-number-input]:!px-5 [&_.ant-input-number-input]:font-black text-left [&_.ant-input-number-handler-wrap]:hidden transition-all text-slate-800 dark:text-white ${extraClassName}`} 
                        min={min}
                        onChange={(val) => field.onChange(val || 0)}
                        placeholder={placeholder}
                    />
                </Form.Item>
            )}
        />
    );
};

export default FormNumber;
