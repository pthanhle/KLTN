import React from 'react';
import { IdCard, Edit2, Check, X } from 'lucide-react';
import MaskedField from '../Shared/MaskedField';
import { Controller } from 'react-hook-form';
import { Button, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import { useIdentityForm } from '../../hooks/useIdentityForm';
import { InfoRow, FieldWrapper } from '../Shared/FormHelpers';

const IdentityCard = ({ staffId, data, t, onUnmask, onUpdateSuccess }) => {
    const {
        methods: { control, formState: { errors } },
        isEditing,
        isSubmitting,
        handleEditClick,
        handleCancel,
        handleEditSubmit
    } = useIdentityForm(staffId, data, t, onUpdateSuccess);

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl border border-slate-200 dark:border-white/5 shadow-sm p-6 relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-500">
                        <IdCard size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                        {t('adminStaffCompliance:section_identity', 'Định danh cá nhân')}
                    </h3>
                </div>
                {!isEditing && (
                    <Button
                        type="text"
                        onClick={handleEditClick}
                        className="text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 flex items-center justify-center p-2 rounded-lg transition-colors"
                        title={t('adminStaffCompliance:btn_edit_profile', 'Cập nhật hồ sơ')}
                    >
                        <Edit2 size={16} />
                    </Button>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleEditSubmit} className="animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Controller name="idNumber" control={control} render={({ field: { onChange, ...field } }) => (
                                <FieldWrapper label={t('adminStaffCompliance:label_id_number', 'Số CCCD')} error={errors.idNumber}>
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            onChange(value);
                                        }}
                                        className="h-11 rounded-lg border-slate-200 dark:border-white/10 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all dark:bg-[#141416] dark:text-white"
                                    />
                                </FieldWrapper>
                            )} />
                            <Controller name="issueDate" control={control} render={({ field }) => (
                                <FieldWrapper label={t('adminStaffCompliance:label_issue_date', 'Ngày cấp')} error={errors.issueDate}>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        placeholder={t('adminStaffCompliance:placeholder_date', 'Chọn ngày')}
                                        value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
                                        onChange={(date, dateString) => field.onChange(dateString)}
                                        className="h-11 w-full rounded-lg border-slate-200 dark:border-white/10 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all dark:bg-[#141416] dark:text-white [&_input]:dark:text-white"
                                    />
                                </FieldWrapper>
                            )} />
                            <Controller name="dob" control={control} render={({ field }) => (
                                <FieldWrapper label={t('adminStaffCompliance:label_dob', 'Ngày sinh')} error={errors.dob}>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        placeholder={t('adminStaffCompliance:placeholder_date', 'Chọn ngày')}
                                        value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
                                        onChange={(date, dateString) => field.onChange(dateString)}
                                        className="h-11 w-full rounded-lg border-slate-200 dark:border-white/10 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all dark:bg-[#141416] dark:text-white [&_input]:dark:text-white"
                                    />
                                </FieldWrapper>
                            )} />
                        </div>
                        <div>
                            <Controller name="issuePlace" control={control} render={({ field }) => (
                                <FieldWrapper label={t('adminStaffCompliance:label_issue_place', 'Nơi cấp')} error={errors.issuePlace}>
                                    <Input {...field} className="h-11 rounded-lg border-slate-200 dark:border-white/10 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all dark:bg-[#141416] dark:text-white" />
                                </FieldWrapper>
                            )} />
                            <Controller name="pob" control={control} render={({ field }) => (
                                <FieldWrapper label={t('adminStaffCompliance:label_pob', 'Nơi sinh')} error={errors.pob}>
                                    <Input {...field} className="h-11 rounded-lg border-slate-200 dark:border-white/10 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all dark:bg-[#141416] dark:text-white" />
                                </FieldWrapper>
                            )} />
                        </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-white/5">
                        <Controller name="permanentAddress" control={control} render={({ field }) => (
                            <FieldWrapper label={t('adminStaffCompliance:label_permanent_address', 'Thường trú')} error={errors.permanentAddress}>
                                <Input {...field} className="h-11 rounded-lg border-slate-200 dark:border-white/10 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all dark:bg-[#141416] dark:text-white" />
                            </FieldWrapper>
                        )} />
                        <Controller name="currentAddress" control={control} render={({ field }) => (
                            <FieldWrapper label={t('adminStaffCompliance:label_current_address', 'Tạm trú')} error={errors.currentAddress}>
                                <Input {...field} className="h-11 rounded-lg border-slate-200 dark:border-white/10 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all dark:bg-[#141416] dark:text-white" />
                            </FieldWrapper>
                        )} />
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-white/5">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="h-10 px-5 rounded-lg font-medium border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {t('adminStaffCompliance:btn_cancel', 'Hủy bỏ')}
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-10 px-6 rounded-lg font-bold bg-yellow-500 hover:bg-yellow-400 text-slate-900 shadow-md shadow-yellow-500/20 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {!isSubmitting && <Check size={16} />}
                            {isSubmitting ? t('adminStaffCompliance:btn_saving', 'Đang lưu...') : t('adminStaffCompliance:btn_save', 'Lưu thay đổi')}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InfoRow label={t('adminStaffCompliance:label_id_number', 'Số CCCD')}>
                                <MaskedField
                                    value={data?.idNumber}
                                    type="cccd"
                                    onUnmask={() => onUnmask('Identity Number')}
                                />
                            </InfoRow>
                            <InfoRow label={t('adminStaffCompliance:label_issue_date', 'Ngày cấp')}>
                                {data?.issueDate || '-'}
                            </InfoRow>
                            <InfoRow label={t('adminStaffCompliance:label_dob', 'Ngày sinh')}>
                                {data?.dob || '-'}
                            </InfoRow>
                        </div>
                        <div>
                            <InfoRow label={t('adminStaffCompliance:label_issue_place', 'Nơi cấp')}>
                                {data?.issuePlace || '-'}
                            </InfoRow>
                            <InfoRow label={t('adminStaffCompliance:label_pob', 'Nơi sinh')}>
                                {data?.pob || '-'}
                            </InfoRow>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
                        <InfoRow label={t('adminStaffCompliance:label_permanent_address', 'Thường trú')}>
                            {data?.permanentAddress || '-'}
                        </InfoRow>
                        <InfoRow label={t('adminStaffCompliance:label_current_address', 'Tạm trú')}>
                            {data?.currentAddress || '-'}
                        </InfoRow>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IdentityCard;
