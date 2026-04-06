import React from 'react';
import { Popconfirm } from 'antd';
import { Trash2, AlertCircle } from 'lucide-react';

export const DeleteAction = ({ onDelete, confirmTitle, confirmDesc, okText, cancelText, tooltipText = 'Xóa' }) => {
    return (
        <Popconfirm
            icon={<AlertCircle size={22} className="text-red-500 mr-3 mt-1" strokeWidth={2} />}
            title={
                <span className="font-extrabold text-slate-800 dark:text-white text-[15px] block mb-1">
                    {confirmTitle}
                </span>
            }
            description={
                <span className="text-slate-500 dark:text-slate-400 text-xs max-w-[220px] block leading-relaxed mb-2">
                    {confirmDesc}
                </span>
            }
            onConfirm={onDelete}
            okText={okText || 'Xóa'}
            cancelText={cancelText || 'Hủy'}
            okButtonProps={{ 
                className: "!bg-red-500 hover:!bg-red-600 !border-none !rounded-xl !text-white !font-bold shadow-lg shadow-red-500/20 !px-6 !h-9 transition-all" 
            }}
            cancelButtonProps={{
                className: "!bg-slate-100 dark:!bg-white/5 hover:!bg-slate-200 dark:hover:!bg-white/10 !border-none !rounded-xl !text-slate-600 dark:!text-slate-300 hover:!text-slate-900 dark:hover:!text-white !font-bold transition-all !px-6 !h-9"
            }}
            placement="topRight"
            overlayClassName="[&_.ant-popover-inner]:!rounded-xl [&_.ant-popover-inner]:!p-5 [&_.ant-popover-arrow]:!hidden dark:[&_.ant-popover-inner]:!bg-[#191f31] dark:[&_.ant-popover-inner]:!border dark:[&_.ant-popover-inner]:!border-white/5 shadow-2xl"
        >
            <button 
                type="button"
                title={tooltipText}
                className="group w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-xl bg-red-50/50 dark:bg-red-500/10 border border-red-200/50 dark:border-red-500/20 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-all shadow-sm outline-none"
            >
                <Trash2 size={16} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            </button>
        </Popconfirm>
    );
};
