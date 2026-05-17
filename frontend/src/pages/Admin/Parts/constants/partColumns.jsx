import { Badge, Switch, Image } from 'antd';
import { EditAction, DeleteAction, DeleteLockedAction } from '../../../../components/TableActions';

export const getPartColumns = (t, handleEdit, handleDelete) => [
    {
        title: t('adminParts:colProduct', 'Sản phẩm'),
        dataIndex: 'product',
        key: 'product',
        render: (_, record) => (
            <div className="flex items-center gap-4 group/item">
                <div
                    className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/5 flex-shrink-0 border border-slate-100 dark:border-white/5 flex items-center justify-center cursor-pointer"
                    onClick={() => handleEdit && handleEdit(record)}
                >
                    <Image
                        src={record.image}
                        alt={record.name}
                        fallback="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNlMmU4ZjAiLz48cGF0aCBkPSJNMzAgMjBhNiA2IDAgMSAwIDAgMTIgNiA2IDAgMCAwIDAtMTJ6bS0xMiAwaC00djE2aDRWMjB6bTIwIDIwaDRWMjBoLTR2MjB6IiBmaWxsPSIjOTRhaTNiIi8+PC9zdmc+"
                        preview={false}
                        className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                    />
                </div>
                <div>
                    <h4
                        className="text-sm font-bold text-slate-800 dark:text-white leading-tight max-w-[250px] truncate hover:text-yellow-600 dark:hover:text-yellow-500 cursor-pointer transition-colors"
                        title={record.name}
                        onClick={() => handleEdit && handleEdit(record)}
                    >
                        {record.name}
                    </h4>
                    <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 block flex items-center gap-2">
                        <span>{t('adminParts:skuPrefix')}: {record.sku}</span>
                        {record.status === 'draft' && (
                            <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400 rounded text-[9px] font-bold">
                                {t('adminParts:badgeDraft')}
                            </span>
                        )}
                    </span>
                    {record.description && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-[250px] truncate" title={record.description}>
                            {record.description}
                        </p>
                    )}
                </div>
            </div>
        )
    },
    {
        title: t('adminParts:colCategory', 'Danh mục'),
        dataIndex: 'category',
        key: 'category',
        render: (category) => (
            <span className="px-3 py-1 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-yellow-200/50 dark:border-yellow-500/20">
                {category}
            </span>
        )
    },
    {
        title: t('adminParts:colCompatible', 'Khả dụng'),
        dataIndex: 'compatible_brands',
        key: 'compatible_brands',
        render: (brands) => (
            <div className="flex flex-wrap gap-1.5 max-w-[150px]">
                {brands && brands.length > 0 ? (
                    brands.map(brand => (
                        <span key={brand} className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[9px] font-bold uppercase tracking-widest rounded">
                            {brand}
                        </span>
                    ))
                ) : (
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic opacity-50">
                        {t('adminParts:universal')}
                    </span>
                )}
            </div>
        )
    },
    {
        title: t('adminParts:colPriceStock', 'Giá & Kho'),
        dataIndex: 'price_stock',
        key: 'price_stock',
        render: (_, record) => {
            const { stock_on_hand = 0, allocated = 0, available_stock = 0 } = record.inventory || {};
            return (
                <div className="flex flex-col gap-1.5">
                    <span className="text-yellow-600 dark:text-yellow-500 font-bold">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price)}
                    </span>

                    <div className="flex flex-col gap-1 text-[11px]">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-500 dark:text-slate-400">{t('adminParts:lblActual', 'Thực tế:')}</span>
                            <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{stock_on_hand}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-500 dark:text-slate-400">{t('adminParts:lblAllocated', 'Tạm giữ:')}</span>
                            <span className="font-mono font-medium text-orange-600 dark:text-orange-500">{allocated}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-1 mt-0.5">
                            <span className="text-slate-600 dark:text-slate-300 font-bold">{t('adminParts:lblAvailable', 'Khả dụng:')}</span>
                            {available_stock > 0 ? (
                                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-1">
                                    <Badge status="success" /> {available_stock}
                                </span>
                            ) : (
                                <span className="font-mono font-bold text-red-500 flex items-center gap-1">
                                    <Badge status="error" /> 0
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
    },

    {
        title: t('adminParts:colAction', 'Thao tác'),
        key: 'action',
        align: 'right',
        render: (_, record) => {
            const { stock_on_hand = 0, allocated = 0 } = record.inventory || {};
            const isLocked = stock_on_hand > 0 || allocated > 0;
            return (
                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <EditAction
                        onEdit={() => handleEdit && handleEdit(record)}
                        tooltipText={t('adminParts:btnEdit')}
                    />

                    {isLocked ? (
                        <DeleteLockedAction
                            tooltipTitle={t('adminParts:errDeleteLock')}
                        />
                    ) : (
                        <DeleteAction
                            onDelete={() => handleDelete(record.id)}
                            confirmTitle={t('adminParts:confirmDelete')}
                            confirmDesc={t('adminParts:confirmDeleteDesc')}
                            okText={t('common:yes', 'Xóa')}
                            cancelText={t('common:no', 'Hủy')}
                            tooltipText={t('adminParts:btnDelete')}
                        />
                    )}
                </div>
            );
        }
    }
];
