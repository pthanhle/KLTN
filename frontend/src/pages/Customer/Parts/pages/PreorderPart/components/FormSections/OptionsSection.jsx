import { Settings2 } from 'lucide-react';
import { Select } from 'antd';
import { Controller } from 'react-hook-form';
import SectionWrapper from '../FormElements/SectionWrapper';

const OptionsSection = ({ part, control, errors, t }) => {
    if (!part?.options || part.options.length === 0) return null;

    return (
        <SectionWrapper icon={Settings2} title={t('preorder_options', 'Tùy chọn cấu hình phụ tùng')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {part.options.map((opt, index) => {
                    const optionName = opt.name;
                    return (
                        <div key={index}>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                {optionName}
                            </label>
                            <Controller
                                name={`selectedOptions.${optionName}`}
                                control={control}
                                render={({ field }) => (
                                    <Select 
                                        {...field}
                                        placeholder={`Vui lòng chọn ${optionName}`}
                                        status={errors?.selectedOptions?.[optionName] ? 'error' : ''}
                                        className="w-full custom-antd-select [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 hover:[&_.ant-select-selector]:!border-yellow-500 focus:[&_.ant-select-selector]:!border-yellow-500 [&_.ant-select-selector]:!min-h-[56px] [&_.ant-select-selector]:!rounded-2xl [&_.ant-select-selector]:!px-5 [&_.ant-select-selection-item]:!leading-[54px] [&_.ant-select-selection-search-input]:!h-[56px] [&_.ant-select-selection-item]:font-bold transition-all"
                                        options={opt.choices.map(choice => {
                                            const label = typeof choice === 'object' ? choice.label : choice;
                                            return { label, value: label };
                                        })}
                                        popupClassName="dark:bg-[#141416] p-2 rounded-2xl border border-slate-100 dark:border-white/5 shadow-xl"
                                    />
                                )}
                            />
                            {errors?.selectedOptions?.[optionName] && (
                                <p className="text-red-500 text-[11px] font-bold mt-2 ml-2">
                                    {errors.selectedOptions[optionName].message}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
};

export default OptionsSection;
