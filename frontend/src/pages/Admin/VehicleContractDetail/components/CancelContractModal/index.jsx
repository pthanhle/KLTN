import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCancelContract } from '../../hooks/useCancelContract';
import { getCancelContractSchema } from '../../schemas/cancelContract.schema';
import { CancelContractForm } from './CancelContractForm';
import { AlertCircle, X } from 'lucide-react';

export const CancelContractModal = ({ visible, onClose, contractId, currentNote }) => {
    const { t } = useTranslation('adminVehicleContractDetail');
    const { handleCancel, isCancelling } = useCancelContract(contractId, currentNote);

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(getCancelContractSchema(t)),
        defaultValues: {
            cancel_reason: undefined,
            cancel_note: ''
        }
    });

    useEffect(() => {
        if (visible) {
            reset({
                cancel_reason: undefined,
                cancel_note: ''
            });
        }
    }, [visible, reset]);

    const onSubmit = async (values) => {
        try {
            await handleCancel(values, onClose);
        } catch (error) { }
    };

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            closeIcon={null}
            closable={false}
            width={512}
            destroyOnHidden
            classNames={{ content: 'bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-2xl p-0 overflow-hidden shadow-2xl' }}
            wrapClassName="backdrop-blur-sm"
        >
            <div className="w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-50"
                >
                    <X size={24} />
                </button>

                <div className="p-8 pb-6 relative z-10">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 flex items-center justify-center shrink-0">
                            <AlertCircle className="text-red-600 dark:text-red-500" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-red-600 dark:text-red-500">
                                {t('Xác nhận Hủy Hợp Đồng')}
                            </h2>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                                {t('Hợp đồng này sẽ bị vô hiệu hóa')}
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CancelContractForm
                        control={control}
                        errors={errors}
                        t={t}
                    />

                    <div className="bg-slate-50 dark:bg-transparent p-6 px-8 flex justify-end gap-3 relative z-10 border-t border-slate-200 dark:border-white/5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl bg-white dark:bg-transparent text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-200"
                        >
                            {t('Quay lại')}
                        </button>
                        <button
                            type="submit"
                            disabled={isCancelling}
                            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-colors duration-200 shadow-lg shadow-red-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {t('Hủy Hợp Đồng')}
                        </button>
                    </div>
                </form>

                <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none z-0"></div>
            </div>
        </Modal>
    );
};

