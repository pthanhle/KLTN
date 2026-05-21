import { Layers } from 'lucide-react';
import { EditAction, DeleteAction, DeleteLockedAction } from '../../../../components/TableActions';

export const getCategoryColumns = (t, handleEdit, handleDelete) => [
    {
        title: t('adminCategories:colCategory', 'KIỂU DÁNG'),
        dataIndex: 'category_name',
        key: 'category_name',
        render: (text, record) => (
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#2e3447] flex items-center justify-center text-yellow-500 shadow-sm border border-white/5">
                    <Layers size={22} strokeWidth={2} />
                </div>
                <div>
                    <p className="font-bold text-slate-800 dark:text-white text-lg">{text || record.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[280px] truncate">{record.description}</p>
                </div>
            </div>
        )
    },
    {
        title: t('adminCategories:colStatus', 'Trạng Thái'),
        dataIndex: 'count',
        key: 'status',
        align: 'center',
        render: (count) => {
            const isActive = count > 0;
            return (
                <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider border ${isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-slate-50 text-slate-500 border-slate-200 dark:bg-white/5 dark:text-slate-400 dark:border-white/10'}`}>
                    {isActive ? 'ĐANG SỬ DỤNG' : 'CHƯA SỬ DỤNG'}
                </span>
            );
        }
    },
    {
        title: t('adminCategories:colAssets', 'Tài Sản (Kho)'),
        dataIndex: 'count',
        key: 'count',
        align: 'right',
        render: (text) => (
            <div className={`font-medium ${text === 0 ? 'opacity-70' : ''}`}>
                <span className={text > 0 ? "text-[#ffd165] dark:text-yellow-500 text-xl font-black" : "text-slate-500 text-xl font-black"}>
                    {text}
                </span>
                <span className="text-[10px] uppercase text-slate-500 ml-1 tracking-widest font-bold">
                    {t('adminCategories:txtCar', 'xe')}
                </span>
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
