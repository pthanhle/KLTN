import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Switch } from 'antd';
import { Layers } from 'lucide-react';

const PackageToggle = ({ t }) => {
    const { control } = useFormContext();

    return (
        <div className="flex items-center justify-between bg-slate-50 dark:bg-zinc-800/30 px-5 py-4 rounded-[20px] border border-slate-200 dark:border-white/10 w-full min-h-[64px] mt-0 md:mt-[22px]">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-white dark:bg-[#141416] flex items-center justify-center border border-slate-200 dark:border-white/5 shadow-sm">
                    <Layers className="text-slate-500 dark:text-slate-400" size={20} />
                </div>
                <div>
                    <span className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.1em] block mb-0.5">
                        {t('adminServiceItems:form_is_package')}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {t('adminServiceItems:form_is_package_desc')}
                    </span>
                </div>
            </div>
            <Controller
                name="isPackage"
                control={control}
                render={({ field }) => (
                    <Switch
                        checked={field.value}
                        onChange={field.onChange}
                        className="bg-slate-300 dark:bg-slate-600 [&.ant-switch-checked]:bg-yellow-500 dark:[&.ant-switch-checked]:bg-yellow-500"
                    />
                )}
            />
        </div>
    );
};

export default PackageToggle;
