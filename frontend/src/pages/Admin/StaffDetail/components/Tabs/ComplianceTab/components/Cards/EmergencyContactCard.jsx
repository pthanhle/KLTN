import React from 'react';
import { Phone, Edit2, Check, X } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Button, Input, Form } from 'antd';
import { useEmergencyForm } from '../../hooks/useEmergencyForm';
import { InfoRow, FieldWrapper } from '../Shared/FormHelpers';

const EmergencyContactCard = ({ staffId, data, t, onUpdateSuccess }) => {
    const {
        methods: { control, formState: { errors } },
        isEditing,
        isSubmitting,
        handleEditClick,
        handleCancel,
        handleEditSubmit
    } = useEmergencyForm(staffId, data, t, onUpdateSuccess);

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl border border-slate-200 dark:border-white/5 shadow-sm p-6 relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-red-500/10 rounded-lg text-red-500">
                        <Phone size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                        {t('adminStaffCompliance:section_emergency', 'Liên hệ khẩn cấp')}
                    </h3>
                </div>
                {!isEditing && (
                    <Button
                        type="text"
                        onClick={handleEditClick}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center justify-center p-2 rounded-lg transition-colors"
                        title={t('adminStaffCompliance:btn_edit_profile', 'Cập nhật hồ sơ')}
                    >
                        <Edit2 size={16} />
                    </Button>
                )}
            </div>

            {isEditing ? (
                <Form component="form" onSubmit={handleEditSubmit} className="animate-fade-in flex flex-col">
                    <Controller name="contactName" control={control} render={({ field }) => (
                        <FieldWrapper label={t('adminStaffCompliance:label_contact_name', 'Họ và tên')} error={errors.contactName}>
                            <Input {...field} className="h-11 rounded-lg border-slate-200 dark:border-white/10 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all dark:bg-[#141416] dark:text-white" />
                        </FieldWrapper>
                    )} />
                    <Controller name="relation" control={control} render={({ field }) => (
                        <FieldWrapper label={t('adminStaffCompliance:label_contact_relation', 'Mối quan hệ')} error={errors.relation}>
                            <Input {...field} className="h-11 rounded-lg border-slate-200 dark:border-white/10 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all dark:bg-[#141416] dark:text-white" />
                        </FieldWrapper>
                    )} />
                    <Controller name="phone" control={control} render={({ field: { onChange, ...field } }) => (
                        <FieldWrapper label={t('adminStaffCompliance:label_contact_phone', 'Số điện thoại')} error={errors.phone}>
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
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-white/5">
                        <Controller name="address" control={control} render={({ field }) => (
                            <FieldWrapper label={t('adminStaffCompliance:label_contact_address', 'Địa chỉ')} error={errors.address}>
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
                </Form>
            ) : (
                <div className="flex flex-col animate-fade-in">
                    <InfoRow label={t('adminStaffCompliance:label_contact_name', 'Họ và tên')}>
                        {data?.contactName || '-'}
                    </InfoRow>
                    <InfoRow label={t('adminStaffCompliance:label_contact_relation', 'Mối quan hệ')}>
                        {data?.relation || '-'}
                    </InfoRow>
                    <InfoRow label={t('adminStaffCompliance:label_contact_phone', 'Số điện thoại')}>
                        {data?.phone || '-'}
                    </InfoRow>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                        <InfoRow label={t('adminStaffCompliance:label_contact_address', 'Địa chỉ')}>
                            {data?.address || '-'}
                        </InfoRow>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmergencyContactCard;
