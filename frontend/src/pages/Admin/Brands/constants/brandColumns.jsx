import { Popconfirm, Tooltip, Image } from 'antd';
import { Edit3, Trash2, AlertCircle } from 'lucide-react';
import { Image as ImageIcon } from 'lucide-react';

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
                    <button 
                        onClick={() => handleEdit(record)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 hover:bg-yellow-50 dark:hover:bg-[#ffd165]/20 hover:text-yellow-600 dark:hover:text-yellow-500 transition-all text-slate-400"
                    >
                        <Edit3 size={16} />
                    </button>
                    
                    {isLocked ? (
                        <Tooltip title={t('adminBrands:errDeleteLock', { count: record.count, defaultValue: `KHÔNG THỂ XÓA: Hãng này đang chứa ${record.count} tài sản!` })} color="#ef4444">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500 hover:text-red-500 dark:hover:text-white transition-all text-slate-400 opacity-50">
                                <Trash2 size={16} />
                            </button>
                        </Tooltip>
                    ) : (
                        <Popconfirm
                            icon={<AlertCircle size={22} className="text-red-500 mr-3 mt-1" strokeWidth={2} />}
                            title={
                                <span className="font-extrabold text-slate-800 dark:text-white text-[15px] block mb-1">
                                    {t('adminBrands:confirmDelete', 'Xác nhận xóa Hãng này?')}
                                </span>
                            }
                            description={
                                <span className="text-slate-500 dark:text-slate-400 text-xs max-w-[220px] block leading-relaxed mb-2">
                                    {t('adminBrands:confirmDeleteDesc', 'Bạn có chắc chắn muốn xóa hãng xe này khỏi hệ thống?')}
                                </span>
                            }
                            onConfirm={() => handleDelete(record.id, record.count)}
                            okText={t('common:yes', 'Xóa')}
                            cancelText={t('common:no', 'Hủy')}
                            okButtonProps={{ 
                                className: "!bg-red-500 hover:!bg-red-600 !border-none font-bold text-[11px] uppercase tracking-widest shadow-md shadow-red-500/20 px-4" 
                            }}
                            cancelButtonProps={{
                                className: "!bg-slate-100 dark:!bg-white/5 !text-slate-600 dark:!text-white hover:!bg-slate-200 dark:hover:!bg-white/10 !border-none font-bold text-[11px] uppercase tracking-widest px-4"
                            }}
                            placement="topRight"
                            overlayClassName="[&_.ant-popover-inner]:!rounded-xl [&_.ant-popover-inner]:!p-5 [&_.ant-popover-arrow]:!hidden dark:[&_.ant-popover-inner]:!bg-[#191f31] dark:[&_.ant-popover-inner]:!border dark:[&_.ant-popover-inner]:!border-white/5 shadow-2xl"
                        >
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500 hover:text-red-500 dark:hover:text-white transition-all text-slate-400 shadow-error/10">
                                <Trash2 size={16} />
                            </button>
                        </Popconfirm>
                    )}
                </div>
            );
        }
    }
];
