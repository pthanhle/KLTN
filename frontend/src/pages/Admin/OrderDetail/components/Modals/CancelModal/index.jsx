import { Modal, Form, Input } from 'antd';
import { AlertCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { useCancelModalLogic } from '../../../hooks/useCancelModalLogic';
import { QUICK_REASONS } from '../../../constants/cancelReasons';

export const CancelModal = ({ isOpen, onCancel, onSubmit, order }) => {
    const { t } = useTranslation('adminOrderDetail');
    const { control, handleSubmit, errors, handleCancel, handleQuickReason } = useCancelModalLogic({
        onSubmit,
        onCancel
    });

    return (
        <Modal
            open={isOpen}
            onCancel={handleCancel}
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
                    onClick={handleCancel}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-50"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="p-8 pb-6 relative z-10">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 flex items-center justify-center shrink-0">
                            <AlertCircle className="text-red-600 dark:text-red-500" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-red-600 dark:text-red-500">
                                {t('cancel_modal_title')}
                            </h2>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                                {t('order_label')} {order?.order_code}
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-8 pt-0 space-y-6 relative z-10">
                        {/* Alert Warning */}
                        <div className="p-4 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl flex gap-3">
                            <div className="mt-0.5 text-orange-600 dark:text-orange-500">
                                <AlertCircle size={18} />
                            </div>
                            <p className="text-sm font-medium text-orange-800 dark:text-orange-400 leading-relaxed">
                                {t('cancel_modal_alert')}
                            </p>
                        </div>

                        {/* Input: Lý do hủy */}
                        <div className="space-y-3">
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">
                                {t('cancel_reason_label')}
                            </label>

                            {/* Quick Tags */}
                            <div className="flex flex-wrap gap-2">
                                {QUICK_REASONS.map(reason => (
                                    <button
                                        key={reason.id}
                                        type="button"
                                        onClick={() => handleQuickReason(t(reason.key))}
                                        className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        {t(reason.key)}
                                    </button>
                                ))}
                            </div>

                            <Controller
                                name="cancel_reason"
                                control={control}
                                render={({ field }) => (
                                    <Input.TextArea
                                        {...field}
                                        className={`w-full bg-slate-50 dark:bg-[#1a1a1c] text-slate-900 dark:text-white text-sm font-medium rounded-xl p-4 outline-none border transition-all duration-200 placeholder:text-slate-400/50 min-h-[120px] resize-y hover:border-red-500 focus:border-red-500 dark:hover:border-red-500 dark:focus:border-red-500 ${errors.cancel_reason ? 'border-red-500' : 'border-slate-200 dark:border-white/10'}`}
                                        placeholder={t('cancel_reason_placeholder')}
                                        style={{ backgroundColor: 'transparent' }} // Let Tailwind handle bg
                                    />
                                )}
                            />
                            {errors.cancel_reason && <p className="text-xs text-red-500 mt-1">{t(errors.cancel_reason.message)}</p>}
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-transparent p-6 px-8 flex justify-end gap-3 relative z-10 border-t border-slate-200 dark:border-white/5">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2.5 rounded-xl bg-white dark:bg-transparent text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-200"
                        >
                            {t('close_btn')}
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-colors duration-200 shadow-lg shadow-red-500/20"
                        >
                            {t('confirm_cancel_btn')}
                        </button>
                    </div>
                </form>

                <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none z-0"></div>
            </div>
        </Modal>
    );
};
