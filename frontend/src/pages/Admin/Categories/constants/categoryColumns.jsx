import { Tooltip } from 'antd';
import { Edit3, Trash2, Layers } from 'lucide-react';

export const getCategoryColumns = (t, handleEdit, handleDelete) => [
    {
        title: t('adminCategories:colCategory', 'KIỂU DÁNG'),
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#2e3447] flex items-center justify-center text-yellow-500 shadow-sm border border-white/5">
                    <Layers size={22} strokeWidth={2} />
                </div>
                <div>
                    <p className="font-bold text-slate-800 dark:text-white text-lg">{text}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[280px] truncate">{record.description}</p>
                </div>
            </div>
        )
    },
    {
        title: t('adminCategories:colId', 'MÃ HỆ THỐNG'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render: (text) => (
            <span className="font-mono text-xs bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-[#9b8f79]/10 text-slate-600 dark:text-slate-300">
                {text}
            </span>
        )
    },
    {
        title: t('adminCategories:colAssets', 'TÀI SẢN (KHO)'),
        dataIndex: 'count',
        key: 'count',
        align: 'right',
        render: (text) => (
            <div className={`flex flex-col items-end ${text === 0 ? 'opacity-70' : ''}`}>
                <div>
                    <span className="font-bold text-slate-800 dark:text-[#ffd165] text-lg">
                        {text} <span className="text-sm font-medium text-slate-500 dark:text-[#9b8f79]">{t('adminCategories:txtCar', 'xe')}</span>
                    </span>
                </div>
            </div>
        )
    },
    {
        title: t('adminCategories:colActions', 'THAO TÁC'),
        key: 'actions',
        align: 'right',
        render: (_, record) => {
            const isLocked = record.count > 0;
            return (
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={() => handleEdit && handleEdit(record)}
                        className="w-10 h-10 rounded-full border border-slate-200 dark:border-[#4f4633]/50 bg-white dark:bg-transparent flex items-center justify-center text-slate-400 hover:bg-yellow-50 dark:hover:bg-[#ffd165] hover:text-yellow-600 dark:hover:text-[#251a00] hover:border-transparent transition-all shadow-sm"
                    >
                        <Edit3 size={16} strokeWidth={2.5} />
                    </button>
                    
                    {isLocked ? (
                        <Tooltip title={t('adminCategories:errDeleteLock', { count: record.count, defaultValue: `KHÔNG THỂ XÓA: Đang chứa ${record.count} xe!` })} color="#ef4444">
                            <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-[#4f4633]/50 bg-white dark:bg-transparent flex items-center justify-center text-slate-400 opacity-50 shadow-sm">
                                <Trash2 size={16} strokeWidth={2.5} />
                            </button>
                        </Tooltip>
                    ) : (
                        <button 
                            onClick={() => handleDelete(record)}
                            className="w-10 h-10 rounded-full border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-transparent flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                            <Trash2 size={16} strokeWidth={2.5} />
                        </button>
                    )}
                </div>
            );
        }
    }
];
