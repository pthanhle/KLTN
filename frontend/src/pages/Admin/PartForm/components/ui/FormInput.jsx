import React from 'react';
import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

const FormInput = ({ name, control, placeholder, extraClassName = '', isMono = false, type = 'text', prefix = null, rows = 3 }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Form.Item validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message} className="mb-0 w-full">
                    {type === 'textarea' ? (
                        <Input.TextArea 
                            {...field}
                            rows={rows}
                            className={`w-full bg-slate-50 dark:bg-[#151b2d] border-2 border-transparent hover:border-yellow-500/30 focus:border-yellow-500/50 focus:bg-white dark:focus:bg-[#1a2235] focus:ring-4 focus:ring-yellow-500/10 rounded-[1.25rem] p-5 text-slate-800 dark:text-white transition-all text-base shadow-sm resize-none ${isMono ? 'font-mono font-bold placeholder:font-sans' : 'font-bold'} ${extraClassName}`} 
                            placeholder={placeholder} 
                        />
                    ) : (
                        <Input 
                            {...field}
                            prefix={prefix}
                            className={`w-full h-14 bg-slate-50 dark:bg-[#151b2d] border-2 border-transparent hover:border-yellow-500/30 focus:border-yellow-500/50 focus:bg-white dark:focus:bg-[#1a2235] focus:ring-4 focus:ring-yellow-500/10 rounded-[1.25rem] px-6 text-slate-800 dark:text-white transition-all text-base shadow-sm ${isMono ? 'font-mono font-bold placeholder:font-sans' : 'font-bold'} ${extraClassName}`} 
                            placeholder={placeholder} 
                        />
                    )}
                </Form.Item>
            )}
        />
    );
};

export default FormInput;
