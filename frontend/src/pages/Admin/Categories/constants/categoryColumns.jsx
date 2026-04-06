import { Layers } from 'lucide-react';
import { EditAction, DeleteAction, DeleteLockedAction } from '../../../../components/TableActions';

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
        align: 'center',
        render: (_, record) => {
            const isLocked = record.count > 0;
            return (
                <div className="flex justify-center gap-3">
                    <EditAction 
                        onEdit={() => handleEdit && handleEdit(record)} 
                        tooltipText={t('adminCategories:btnEdit', 'Chỉnh sửa')} 
                    />
                    
                    {isLocked ? (
                        <DeleteLockedAction 
                            tooltipTitle={t('adminCategories:errDeleteLock', { count: record.count, defaultValue: `KHÔNG THỂ XÓA: Đang chứa ${record.count} xe!` })} 
                        />
                    ) : (
                        <DeleteAction
                            onDelete={() => handleDelete(record)}
                            confirmTitle={t('adminCategories:confirmDelete', 'Xác nhận xóa Danh Mục này?')}
                            confirmDesc={t('adminCategories:confirmDeleteDesc', 'Bạn có chắc chắn muốn xóa danh mục này khỏi hệ thống?')}
                            okText={t('common:yes', 'Xóa')}
                            cancelText={t('common:no', 'Hủy')}
                            tooltipText={t('adminCategories:btnDelete', 'Xóa')}
                        />
                    )}
                </div>
            );
        }
    }
];
