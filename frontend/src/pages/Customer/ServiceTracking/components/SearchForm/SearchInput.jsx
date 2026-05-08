import React from 'react';
import { Form, Input } from 'antd';

const SearchInput = ({ name, label, placeholder, icon: Icon, rules }) => {
    return (
        <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 ml-2">
                {label}
            </label>
            <Form.Item name={name} rules={rules} className="!mb-0 group">
                <Input 
                    size="large"
                    placeholder={placeholder}
                    prefix={<Icon className="text-yellow-600 dark:text-yellow-500 w-5 h-5 mr-3 transition-transform group-focus-within:scale-110 group-focus-within:-rotate-6" />}
                    className="h-14 w-full bg-slate-50 dark:bg-[#0A0A0B]/50 border border-slate-200 dark:border-white/5 rounded-2xl px-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 hover:bg-white dark:hover:bg-white/5 focus-within:bg-white dark:focus-within:bg-[#1c1c1e] transition-all duration-300 uppercase font-semibold tracking-wider !shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                />
            </Form.Item>
        </div>
    );
};

export default SearchInput;
