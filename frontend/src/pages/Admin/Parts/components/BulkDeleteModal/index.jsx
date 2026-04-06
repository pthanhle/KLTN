import React from 'react';
import { Modal } from 'antd';
import { AlertOctagon } from 'lucide-react';

const BulkDeleteModal = ({ isOpen, onClose, onConfirm, count, t }) => {
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            closeIcon={false}
            centered
            className="rounded-3xl overflow-hidden"
            maskClassName="backdrop-blur-sm bg-slate-900/40"
            width={400}
        >
            <div className="flex flex-col items-center text-center p-6 pt-8 pb-4">
                <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-6">
                    <AlertOctagon className="text-red-500" size={32} strokeWidth={2.5} />
                </div>
                
                <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-3">
                    {t('adminParts:bulkDeleteConfirm', { count })}
                </h3>
                
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-[280px]">
                    {t('adminParts:bulkDeleteDesc')}
                </p>

                <div className="flex w-full gap-3 mt-10">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3.5 rounded-2xl bg-slate-100 dark:bg-[#151b2d] text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        {t('adminParts:btnCancel') || t('common:cancel') || 'Cancel'}
                    </button>
                    <button 
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 py-3.5 rounded-2xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/20 hover:bg-red-600 hover:scale-105 transition-all"
                    >
                        {t('adminParts:btnDeleteNow')}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default BulkDeleteModal;
