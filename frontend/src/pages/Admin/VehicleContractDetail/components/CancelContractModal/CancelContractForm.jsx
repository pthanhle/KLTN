import React from 'react';
import { Select, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { CANCEL_REASONS } from '../../constants/contract.constants';
import { AlertCircle } from 'lucide-react';

const { TextArea } = Input;
const { Option } = Select;

export const CancelContractForm = ({ control, errors, t }) => {
    return (
        <div className="p-8 pt-0 space-y-6 relative z-10">
            <div className="p-4 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl flex gap-3">
                <div className="mt-0.5 text-orange-600 dark:text-orange-500">
                    <AlertCircle size={18} />
                </div>
                <p className="text-sm font-medium text-orange-800 dark:text-orange-400 leading-relaxed">
                    {t('Hành động này sẽ hủy bỏ vĩnh viễn Hợp đồng và đưa phương tiện trở lại kho. Không thể hoàn tác!')}
                </p>
            </div>

            <div className="space-y-3">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">
                    {t('Lý do hủy')} <span className="text-red-500">*</span>
                </label>
                <Controller
                    name="cancel_reason"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            placeholder={t('Vui lòng chọn lý do hủy')}
                            size="large"
                            className={`w-full ${errors.cancel_reason ? 'border-red-500' : ''}`}
                            popupClassName="dark:bg-[#1a1a1c]"
                            status={errors.cancel_reason ? 'error' : ''}
                        >
                            {CANCEL_REASONS.map(reason => (
                                <Option key={reason.value} value={reason.value}>
                                    {t(reason.label)}
                                </Option>
                            ))}
                        </Select>
                    )}
                />
                {errors.cancel_reason && (
                    <p className="text-xs text-red-500 mt-1">{errors.cancel_reason.message}</p>
                )}
            </div>

            <div className="space-y-3">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">
                    {t('Ghi chú thêm')}
                </label>
                <Controller
                    name="cancel_note"
                    control={control}
                    render={({ field }) => (
                        <TextArea
                            {...field}
                            rows={6}
                            className={`w-full bg-slate-50 dark:bg-[#1a1a1c] text-slate-900 dark:text-white text-sm font-medium rounded-xl p-4 outline-none border transition-all duration-200 placeholder:text-slate-400/50 min-h-[160px] resize-y hover:border-blue-500 focus:border-blue-500 dark:hover:border-blue-500 dark:focus:border-blue-500 border-slate-200 dark:border-white/10`}
                            placeholder={t('Nhập ghi chú chi tiết về việc hủy hợp đồng...')}
                            style={{ backgroundColor: 'transparent' }}
                        />
                    )}
                />
            </div>
        </div>
    );
};
