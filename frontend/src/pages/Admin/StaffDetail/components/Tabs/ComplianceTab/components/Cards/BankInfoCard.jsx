import React from 'react';
import { Landmark, Edit2, Check, X } from 'lucide-react';
import MaskedField from '../Shared/MaskedField';
import BankSelect from '../Shared/BankSelect';
import { Controller } from 'react-hook-form';
import { Button, Input, Form } from 'antd';
import { useFinancialForm } from '../../hooks/useFinancialForm';

const InfoRow = ({ label, children }) => (
    <div className="flex flex-col mb-4 last:mb-0">
        <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">{label}</span>
        <div className="text-sm text-slate-800 dark:text-slate-200">{children}</div>
    </div>
);

const FieldWrapper = ({ label, error, children }) => (
    <div className="flex flex-col mb-4 last:mb-0">
        <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">{label}</label>
        {children}
        {error && <span className="text-red-500 text-xs mt-0.5">{error.message}</span>}
    </div>
);

const BankInfoCard = ({ staffId, data, t, onUnmask, onUpdateSuccess }) => {
    const {
        methods: { control, formState: { errors } },
        isEditing,
        isSubmitting,
        handleEditClick,
        handleCancel,
        handleEditSubmit
    } = useFinancialForm(staffId, data, t, onUpdateSuccess);

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl border border-slate-200 dark:border-white/5 shadow-sm p-6 relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-500">
                        <Landmark size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                        {t('adminStaffCompliance:card_bank', 'Ngân hàng & Thuế')}
                    </h3>
                </div>
                {!isEditing && (
                    <Button
                        type="text"
                        onClick={handleEditClick}
                        className="text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 flex items-center justify-center p-2 rounded-lg transition-colors"
                        title={t('adminStaffCompliance:btn_edit_profile', 'Cập nhật hồ sơ')}
                    >
                        <Edit2 size={16} />
                    </Button>
                )}
            </div>

            {isEditing ? (
                <Form component="form" onSubmit={handleEditSubmit} className="animate-fade-in flex flex-col">
                    <Controller name="bankAccount" control={control} render={({ field }) => (
                        <FieldWrapper label={t('adminStaffCompliance:label_bank_account', 'Số tài khoản')} error={errors.bankAccount}>
                            <Input {...field} className="h-11 rounded-lg border-slate-200 dark:border-white/10 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all dark:bg-[#141416] dark:text-white" />
                        </FieldWrapper>
                    )} />
                    <Controller name="bankName" control={control} render={({ field }) => (
                        <FieldWrapper label={t('adminStaffCompliance:label_bank_name', 'Ngân hàng')} error={errors.bankName}>
                            <BankSelect {...field} className="h-11 [&>.ant-select-selector]:h-11 [&>.ant-select-selector]:rounded-lg [&>.ant-select-selector]:border-slate-200 dark:[&>.ant-select-selector]:border-white/10 hover:[&>.ant-select-selector]:border-yellow-500 [&.ant-select-focused>.ant-select-selector]:border-yellow-500 [&.ant-select-focused>.ant-select-selector]:ring-4 [&.ant-select-focused>.ant-select-selector]:ring-yellow-500/10 transition-all dark:[&>.ant-select-selector]:bg-[#141416] dark:text-white [&>.ant-select-selector]:flex [&>.ant-select-selector]:items-center" />
                        </FieldWrapper>
                    )} />
                    <Controller name="bankBranch" control={control} render={({ field }) => (
                        <FieldWrapper label={t('adminStaffCompliance:label_bank_branch', 'Chi nhánh')} error={errors.bankBranch}>
                            <Input {...field} className="h-11 rounded-lg border-slate-200 dark:border-white/10 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all dark:bg-[#141416] dark:text-white" />
                        </FieldWrapper>
                    )} />

                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                        <Controller name="taxCode" control={control} render={({ field }) => (
                            <FieldWrapper label={t('adminStaffCompliance:label_tax_code', 'Mã số thuế (PIT)')} error={errors.taxCode}>
                                <Input {...field} className="h-11 rounded-lg border-slate-200 dark:border-white/10 hover:border-yellow-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all dark:bg-[#141416] dark:text-white" />
                            </FieldWrapper>
                        )} />
                        <Controller name="insuranceCode" control={control} render={({ field }) => (
                            <FieldWrapper label={t('adminStaffCompliance:label_insurance_code', 'Mã số BHXH')} error={errors.insuranceCode}>
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
                    <InfoRow label={t('adminStaffCompliance:label_bank_account', 'Số tài khoản')}>
                        <MaskedField
                            value={data?.bankAccount}
                            type="bank"
                            onUnmask={() => onUnmask('Bank Account')}
                        />
                    </InfoRow>
                    <InfoRow label={t('adminStaffCompliance:label_bank_name', 'Ngân hàng')}>
                        {data?.bankName || '-'}
                    </InfoRow>
                    <InfoRow label={t('adminStaffCompliance:label_bank_branch', 'Chi nhánh')}>
                        {data?.bankBranch || '-'}
                    </InfoRow>

                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                        <InfoRow label={t('adminStaffCompliance:label_tax_code', 'Mã số thuế (PIT)')}>
                            <MaskedField
                                value={data?.taxCode}
                                type="tax"
                                onUnmask={() => onUnmask('Tax Code')}
                            />
                        </InfoRow>
                        <InfoRow label={t('adminStaffCompliance:label_insurance_code', 'Mã số BHXH')}>
                            <MaskedField
                                value={data?.insuranceCode}
                                type="insurance"
                                onUnmask={() => onUnmask('Insurance Code')}
                            />
                        </InfoRow>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BankInfoCard;
