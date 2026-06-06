import React, { useState } from 'react';
import { Settings2, X, Plus, Trash2, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import { Upload, Spin, Image } from 'antd';
import { useFieldArray, useController } from 'react-hook-form';
import FormInput from '../ui/FormInput';
import { uploadSingleImage } from '@/services/api/upload.api';
import { useOptionsBuilder } from './hooks/useOptionsBuilder';

// Compact inline text input bound to RHF
const CompactInput = ({ name, control, placeholder = '', type = 'text' }) => {
    const { field } = useController({ name, control });
    return (
        <input
            {...field}
            type={type}
            placeholder={placeholder}
            onChange={e => field.onChange(type === 'number' ? Number(e.target.value) || 0 : e.target.value)}
            className="w-full text-[12px] px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#0a0a0b] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 placeholder-slate-400 outline-none focus:border-yellow-500 transition-colors font-bold"
        />
    );
};

// Self-contained image picker bound directly to RHF via useController
const ChoiceImagePicker = ({ name, control }) => {
    const [uploading, setUploading] = useState(false);
    const { field } = useController({ name, control });

    const handleChange = async (info) => {
        const { file } = info;
        if (file.status !== 'done' || !file.originFileObj) return;
        try {
            setUploading(true);
            const url = await uploadSingleImage(file.originFileObj);
            field.onChange(url);
        } catch {
            // fallback to manual URL
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex items-center gap-1.5">
            <Spin spinning={uploading} size="small">
                <Upload
                    multiple={false}
                    showUploadList={false}
                    accept="image/*"
                    customRequest={({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0)}
                    onChange={handleChange}
                >
                    <button
                        type="button"
                        className="w-9 h-9 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-yellow-500 flex items-center justify-center transition-colors overflow-hidden bg-slate-50 dark:bg-[#1c1c1e] flex-shrink-0"
                    >
                        {field.value ? (
                            <Image src={field.value} preview={false} className="w-full h-full object-cover" />
                        ) : (
                            <ImageIcon size={12} className="text-slate-400" />
                        )}
                    </button>
                </Upload>
            </Spin>
            <input
                type="text"
                value={field.value || ''}
                onChange={e => field.onChange(e.target.value)}
                placeholder="URL ảnh..."
                className="flex-1 min-w-0 text-[11px] px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-[#0a0a0b] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 placeholder-slate-400 outline-none focus:border-yellow-500 transition-colors"
            />
            {field.value && (
                <button type="button" onClick={() => field.onChange('')} className="text-red-400 hover:text-red-500 p-0.5 flex-shrink-0">
                    <X size={11} />
                </button>
            )}
        </div>
    );
};

// Single option item with nested choices fieldArray
const OptionItem = ({ optionIndex, control, removeOption, t }) => {
    const [expanded, setExpanded] = useState(true);
    const { fields: choiceFields, append: appendChoice, remove: removeChoice } = useFieldArray({
        control,
        name: `options.${optionIndex}.choices`
    });

    return (
        <div className="relative bg-slate-50 dark:bg-[#1c1c1e] rounded-3xl border-2 border-transparent hover:border-yellow-500/20 transition-all group">
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-0">
                <div className="flex items-center gap-3 flex-1">
                    <FormInput
                        name={`options.${optionIndex}.type`}
                        control={control}
                        placeholder={t('adminPartForm:phOptionType')}
                        extraClassName="!mb-0 flex-1"
                    />
                </div>
                <div className="flex items-center gap-1 ml-3">
                    <button
                        type="button"
                        onClick={() => setExpanded(v => !v)}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-colors"
                    >
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <button
                        type="button"
                        onClick={() => removeOption(optionIndex)}
                        className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                    >
                        <X size={16} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {expanded && (
                <div className="p-5 pt-4 space-y-3">
                    <div className="grid grid-cols-12 gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold px-1">
                        <span className="col-span-4">{t('adminPartForm:phOptionChoices') || 'Tên lựa chọn'}</span>
                        <span className="col-span-3">+/- Giá (VND)</span>
                        <span className="col-span-4">Ảnh biến thể</span>
                        <span className="col-span-1"></span>
                    </div>

                    {choiceFields.map((choiceField, cIndex) => (
                        <div key={choiceField.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-4">
                                <CompactInput
                                    name={`options.${optionIndex}.choices.${cIndex}.label`}
                                    control={control}
                                    placeholder="Vd: Đen, Size L..."
                                />
                            </div>
                            <div className="col-span-3">
                                <CompactInput
                                    name={`options.${optionIndex}.choices.${cIndex}.price_modifier`}
                                    control={control}
                                    placeholder="0"
                                    type="number"
                                />
                            </div>
                            <div className="col-span-4">
                                <ChoiceImagePicker
                                    name={`options.${optionIndex}.choices.${cIndex}.image_url`}
                                    control={control}
                                />
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => removeChoice(cIndex)}
                                    className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => appendChoice({ label: '', price_modifier: 0, image_url: '' })}
                        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl text-slate-500 hover:text-yellow-600 hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all text-xs font-bold uppercase tracking-widest"
                    >
                        <Plus size={14} strokeWidth={3} />
                        Thêm lựa chọn
                    </button>
                </div>
            )}
        </div>
    );
};

const OptionsBuilderCard = ({ t }) => {
    const { control, fields, remove, handleAddOption } = useOptionsBuilder();

    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <Settings2 className="text-yellow-500" size={24} />
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                    {t('adminPartForm:options')}
                </h3>
            </div>

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <OptionItem
                        key={field.id}
                        optionIndex={index}
                        control={control}
                        removeOption={remove}
                        t={t}
                    />
                ))}

                <button
                    type="button"
                    onClick={handleAddOption}
                    className="w-full py-4 rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/5 text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                >
                    <Plus size={18} strokeWidth={3} />
                    {t('adminPartForm:setupOption')}
                </button>
            </div>
        </section>
    );
};

export default OptionsBuilderCard;
