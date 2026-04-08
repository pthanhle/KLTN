import React from 'react';
import { Modal, Input } from 'antd';
import { X, Check } from 'lucide-react';
import { useQuickAddLogic } from './hooks/useQuickAddLogic';

const QuickAddModal = ({ title, placeholder, visible, onCancel, onAdd, t }) => {
    const { 
        value, 
        handleChange, 
        handleOk, 
        handleCancel 
    } = useQuickAddLogic({ onAdd, onCancel, t });

    const modalFooter = (
        <div className="flex justify-end gap-3 items-center">
            <button 
                type="button"
                onClick={handleCancel}
                className="h-12 px-6 rounded-xl flex items-center justify-center gap-2 font-bold text-[13px] uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 transition-all active:scale-95"
            >
                <X size={16} strokeWidth={2.5} />
                {t('adminPartForm:btnCancel', 'Hủy')}
            </button>
            <button 
                type="button"
                onClick={handleOk}
                className="h-12 px-8 rounded-xl flex items-center justify-center gap-2 font-bold text-[13px] uppercase tracking-wider bg-yellow-500 hover:bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-500/20 transition-all active:scale-95"
            >
                <Check size={16} strokeWidth={2.5} />
                {t('adminPartForm:btnAddQuick', 'Thêm mới')}
            </button>
        </div>
    );

    return (
        <Modal
            title={<span className="text-slate-800 dark:text-white uppercase font-black tracking-widest text-lg">{title}</span>}
            open={visible}
            onCancel={handleCancel}
            footer={modalFooter}
            className="[&_.ant-modal-content]:bg-white dark:[&_.ant-modal-content]:bg-[#191f31] [&_.ant-modal-content]:rounded-3xl [&_.ant-modal-content]:p-8 [&_.ant-modal-header]:bg-transparent [&_.ant-modal-title]:bg-transparent [&_.ant-modal-footer]:mt-8 [&_.ant-modal-footer]:border-none"
            centered
        >
            <div className="py-6">
                <label className="block text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 font-bold">
                    {t('adminPartForm:quickAddName', 'Tên Thêm Nhanh (Hiển thị)')}
                </label>
                <Input 
                    value={value} 
                    onChange={handleChange} 
                    placeholder={placeholder}
                    className="w-full h-14 bg-slate-50 dark:bg-[#151b2d] border-2 border-transparent hover:border-yellow-500/30 focus:border-yellow-500/50 focus:bg-white dark:focus:bg-[#1a2235] rounded-[1.25rem] px-6 text-slate-800 dark:text-white transition-all text-base font-bold shadow-sm"
                    onPressEnter={handleOk}
                />
            </div>
        </Modal>
    );
};

export default QuickAddModal;
