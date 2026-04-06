import React from 'react';
import { Form, Select, ConfigProvider } from 'antd';
import { Controller } from 'react-hook-form';

const FormSelect = ({ name, control, placeholder, options, mode, allowClear, extraClassName = '' }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Form.Item validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message} className="mb-0 w-full">
                    <ConfigProvider
                        theme={{
                            token: {
                                controlHeight: 56, // This guarantees EXACTLY 56px height while keeping everything perfectly aligned natively
                                borderRadius: 20, // 1.25rem
                                colorBgContainer: 'transparent',
                                colorBorder: 'transparent',
                                colorTextPlaceholder: '#94a3b8',
                            },
                            components: {
                                Select: {
                                    multipleItemBg: '#eab308', // yellow-500
                                    multipleItemColor: '#0f172a', // slate-900
                                    multipleItemHeight: 32, // larger tag height
                                    multipleItemBorderColor: 'transparent',
                                    selectorBg: 'transparent',
                                }
                            }
                        }}
                    >
                        <div className={`relative group w-full bg-slate-50 dark:bg-[#151b2d] border-2 border-transparent hover:border-yellow-500/30 focus-within:border-yellow-500/50 rounded-[1.25rem] transition-all shadow-sm ${extraClassName}`}>
                            <Select
                                {...field}
                                mode={mode}
                                allowClear={allowClear}
                                placeholder={placeholder}
                                className="w-full text-base font-bold [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!font-black [&_.ant-select-selection-item]:!tracking-tight [&_.ant-select-selection-item-remove]:!text-slate-800 hover:[&_.ant-select-selection-item-remove]:!text-black"
                                options={options}
                                classNames={{ popup: "rounded-[1rem] p-2" }}
                            />
                        </div>
                    </ConfigProvider>
                </Form.Item>
            )}
        />
    );
};

export default FormSelect;
