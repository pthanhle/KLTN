import { Input } from 'antd';
import { Controller } from 'react-hook-form';

const InputField = ({ label, control, name, type = "text", errors, required = false, wrapperClass = "", className = "", placeholder = "" }) => {
    return (
        <div className={wrapperClass}>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input 
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        status={errors?.[name] ? 'error' : ''}
                        className={`w-full bg-slate-50 dark:bg-[#0a0a0b] dark:text-white dark:border-white/10 dark:placeholder-white/30 rounded-2xl px-5 py-4 min-h-[56px] hover:border-yellow-500 focus:border-yellow-500 focus:shadow-[0_0_0_2px_rgba(234,179,8,0.2)] transition-all ${className}`}
                        style={{ height: 'auto', outline: 'none', boxShadow: 'none' }}
                    />
                )}
            />
            {errors?.[name] && <p className="text-red-500 text-[11px] font-bold mt-2 ml-2">{errors[name].message}</p>}
        </div>
    );
};

export default InputField;
