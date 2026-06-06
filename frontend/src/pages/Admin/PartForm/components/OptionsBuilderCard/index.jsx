import React, { useState } from 'react';
import { Settings2, X, Plus, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, CloudUpload } from 'lucide-react';
import { Upload, Spin, Image, Tooltip } from 'antd';
import { useFieldArray, useController } from 'react-hook-form';
import FormInput from '../ui/FormInput';
import { uploadSingleImage } from '@/services/api/upload.api';
import { useOptionsBuilder } from './hooks/useOptionsBuilder';

// Compact inline input bound to RHF
const CompactInput = ({ name, control, placeholder = '', type = 'text' }) => {
    const { field } = useController({ name, control });
    return (
        <input
            {...field}
            type={type}
            placeholder={placeholder}
            onChange={e => field.onChange(type === 'number' ? Number(e.target.value) || 0 : e.target.value)}
            className="w-full text-[12px] px-3 py-2 rounded-xl bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 placeholder-slate-400 outline-none focus:border-yellow-500 transition-colors font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
    );
};

// Price modifier input: shows thousands-formatted value when blurred, raw digits when focused
const PriceModifierInput = ({ name, control }) => {
    const { field } = useController({ name, control });
    const [editing, setEditing] = useState(false);
    const [rawText, setRawText] = useState('');

    const handleFocus = () => {
        setEditing(true);
        // Show raw number without formatting so user can edit cleanly
        setRawText(field.value !== 0 && field.value != null ? String(field.value) : '');
    };

    const handleChange = (e) => {
        const val = e.target.value;
        // Allow only digits and a leading minus sign
        if (val === '' || val === '-' || /^-?\d+$/.test(val)) {
            setRawText(val);
            field.onChange(val === '' || val === '-' ? 0 : Number(val));
        }
    };

    const handleBlur = () => {
        setEditing(false);
        field.onBlur();
    };

    // When not editing, show formatted value; when 0 show empty (let placeholder show)
    const numVal = Number(field.value) || 0;
    const displayValue = editing
        ? rawText
        : (numVal !== 0 ? numVal.toLocaleString('vi-VN') : '');

    return (
        <input
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="0"
            className="w-full text-[12px] px-3 py-2 rounded-xl bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 placeholder-slate-400 outline-none focus:border-yellow-500 transition-colors font-bold text-right tabular-nums"
        />
    );
};

// Upload-only image button (no URL text input) bound to RHF
const ChoiceImageButton = ({ name, control }) => {
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
            // silent
        } finally {
            setUploading(false);
        }
    };

    return (
        <Tooltip title={field.value ? 'Click để đổi ảnh' : 'Tải ảnh biến thể'} placement="top">
            <Spin spinning={uploading} size="small">
                <Upload
                    multiple={false}
                    showUploadList={false}
                    accept="image/*"
                    customRequest={({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0)}
                    onChange={handleChange}
                >
                    <div className="relative w-10 h-10 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-yellow-500 flex items-center justify-center transition-all overflow-hidden bg-slate-50 dark:bg-[#0a0a0b] cursor-pointer group/img">
                        {field.value ? (
                            <>
                                <Image src={field.value} preview={false} className="w-full h-full object-cover" />
                                {/* Clear on hover */}
                                <div
                                    onClick={e => { e.stopPropagation(); field.onChange(''); }}
                                    className="absolute inset-0 bg-red-500/80 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-10"
                                >
                                    <X size={12} className="text-white" />
                                </div>
                            </>
                        ) : (
                            <CloudUpload size={14} className="text-slate-400 group-hover/img:text-yellow-500 transition-colors" />
                        )}
                    </div>
                </Upload>
            </Spin>
        </Tooltip>
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
            {/* Header — option type name */}
            <div className="flex items-center justify-between px-5 pt-5 pb-0">
                <div className="flex-1 mr-3">
                    <FormInput
                        name={`options.${optionIndex}.type`}
                        control={control}
                        placeholder={t('adminPartForm:phOptionType')}
                        extraClassName="!mb-0"
                    />
                </div>
                <div className="flex items-center gap-1 shrink-0">
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
                <div className="px-5 pb-5 pt-4 space-y-2">
                    {/* Column headers */}
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold pb-1 border-b border-slate-200 dark:border-white/5">
                        <span className="flex-1 min-w-0">Tên lựa chọn</span>
                        <span className="w-28 shrink-0 text-center">+/- Giá (VND)</span>
                        <span className="w-10 shrink-0 text-center">Ảnh</span>
                        <span className="w-7 shrink-0"></span>
                    </div>

                    {/* Choice rows */}
                    {choiceFields.map((choiceField, cIndex) => (
                        <div key={choiceField.id} className="flex items-center gap-2 py-1">
                            <div className="flex-1 min-w-0">
                                <CompactInput
                                    name={`options.${optionIndex}.choices.${cIndex}.label`}
                                    control={control}
                                    placeholder="Vd: Đen, Size L..."
                                />
                            </div>
                            <div className="w-28 shrink-0">
                                <PriceModifierInput
                                    name={`options.${optionIndex}.choices.${cIndex}.price_modifier`}
                                    control={control}
                                />
                            </div>
                            <div className="w-10 shrink-0 flex justify-center">
                                <ChoiceImageButton
                                    name={`options.${optionIndex}.choices.${cIndex}.image_url`}
                                    control={control}
                                />
                            </div>
                            <div className="w-7 shrink-0 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => removeChoice(cIndex)}
                                    className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => appendChoice({ label: '', price_modifier: 0, image_url: '' })}
                        className="w-full flex items-center justify-center gap-2 py-2 mt-1 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl text-slate-500 hover:text-yellow-600 hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all text-xs font-bold uppercase tracking-widest"
                    >
                        <Plus size={13} strokeWidth={3} />
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
