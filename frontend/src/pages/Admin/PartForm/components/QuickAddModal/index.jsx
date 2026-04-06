import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';

const QuickAddModal = ({ title, placeholder, visible, onCancel, onAdd, t }) => {
    const [value, setValue] = useState('');

    const handleOk = () => {
        if (!value.trim()) {
            message.error(t('adminPartForm:reqName') || 'Vui lòng nhập tên');
            return;
        }
        onAdd(value.trim());
        setValue('');
    };

    return (
        <Modal
            title={<span className="text-slate-800 dark:text-white uppercase font-black tracking-widest text-lg">{title}</span>}
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText={t('adminPartForm:btnAddQuick')}
            cancelText={t('adminPartForm:btnCancel')}
            okButtonProps={{ className: 'h-12 px-8 rounded-xl bg-yellow-500 text-black hover:!bg-yellow-600 hover:!text-black border-none font-bold text-[13px] uppercase tracking-wider' }}
            cancelButtonProps={{ className: 'h-12 px-8 rounded-xl dark:text-white dark:bg-[#23293c] dark:border-white/20 dark:hover:!border-white/40 hover:!text-slate-800 dark:hover:!text-white font-bold text-[13px] uppercase tracking-wider' }}
            className="[&_.ant-modal-content]:bg-white dark:[&_.ant-modal-content]:bg-[#191f31] [&_.ant-modal-content]:rounded-3xl [&_.ant-modal-content]:p-8 [&_.ant-modal-header]:bg-transparent [&_.ant-modal-title]:bg-transparent [&_.ant-modal-footer]:mt-8 [&_.ant-modal-footer]:border-none"
            centered
        >
            <div className="py-6">
                <label className="block text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 font-bold">
                    {t('adminPartForm:quickAddName')}
                </label>
                <Input 
                    value={value} 
                    onChange={e => setValue(e.target.value)} 
                    placeholder={placeholder}
                    className="w-full h-14 bg-slate-50 dark:bg-[#151b2d] border-2 border-transparent hover:border-yellow-500/30 focus:border-yellow-500/50 focus:bg-white dark:focus:bg-[#1a2235] rounded-[1.25rem] px-6 text-slate-800 dark:text-white transition-all text-base font-bold shadow-sm"
                    onPressEnter={handleOk}
                />
            </div>
        </Modal>
    );
};

export default QuickAddModal;
