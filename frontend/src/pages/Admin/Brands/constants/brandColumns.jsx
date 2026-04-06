import { Image } from 'antd';
import { Image as ImageIcon } from 'lucide-react';
import { EditAction, DeleteAction, DeleteLockedAction } from '../../../../components/TableActions';

export const getBrandColumns = (t, handleEdit, handleDelete) => [
    {
        title: t('adminBrands:colBrand', 'Thương Hiệu'),
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
            <div className="flex items-center gap-4">
                <div className={`w-14 h-14 p-2 rounded-xl flex items-center justify-center shadow-md overflow-hidden relative ${record.image ? 'bg-slate-50 dark:bg-white' : 'bg-slate-100 dark:bg-white/5'}`}>
                    {record.image ? (
                        <Image 
                            src={record.image} 
                            alt={text} 
                            preview={true}
                            rootClassName="w-full h-full flex justify-center items-center"
                            className="object-contain w-full h-full"
                        />
                    ) : (
                        <ImageIcon className="text-slate-500" size={24} />
                    )}
                </div>
                <div>
                    <p className="font-bold text-slate-800 dark:text-white text-lg">{text}</p>
                </div>
            </div>
        )
    },
    {
        title: t('adminBrands:colId', 'Mã (ID)'),
        dataIndex: 'id',
        key: 'id',
        render: (text) => (
            <span className="font-mono text-xs bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-[#9b8f79]/10 text-slate-600 dark:text-slate-300">
                {text}
            </span>
        )
    },
    {
        title: t('adminBrands:colAssets', 'Tài Sản (Kho)'),
        dataIndex: 'count',
        key: 'count',
        align: 'right',
        render: (text) => (
            <div className={`font-medium ${text === 0 ? 'opacity-70' : ''}`}>
                <span className={text > 0 ? "text-[#ffd165] dark:text-yellow-500 text-xl font-black" : "text-slate-500 text-xl font-black"}>
                    {text}
                </span>
                <span className="text-[10px] uppercase text-slate-500 ml-1 tracking-widest font-bold">
                    {t('adminBrands:txtProducts', 'sản phẩm')}
                </span>
            </div>
        )
    },
    {
        title: t('adminBrands:colActions', 'Thao Tác'),
        key: 'actions',
        align: 'center',
        render: (_, record) => {
            const isLocked = record.count > 0;
            return (
                <div className="flex justify-center gap-3">
                    <EditAction 
                        onEdit={() => handleEdit(record)} 
                        tooltipText={t('adminBrands:btnEdit', 'Chỉnh sửa')} 
                    />
                    
                    {isLocked ? (
                        <DeleteLockedAction 
                            tooltipTitle={t('adminBrands:errDeleteLock', { count: record.count, defaultValue: `KHÔNG THỂ XÓA: Hãng này đang chứa ${record.count} tài sản!` })} 
                        />
                    ) : (
                        <DeleteAction
                            onDelete={() => handleDelete(record.id, record.count)}
                            confirmTitle={t('adminBrands:confirmDelete', 'Xác nhận xóa Hãng này?')}
                            confirmDesc={t('adminBrands:confirmDeleteDesc', 'Bạn có chắc chắn muốn xóa hãng xe này khỏi hệ thống?')}
                            okText={t('common:yes', 'Xóa')}
                            cancelText={t('common:no', 'Hủy')}
                            tooltipText={t('adminBrands:btnDelete', 'Xóa')}
                        />
                    )}
                </div>
            );
        }
    }
];
