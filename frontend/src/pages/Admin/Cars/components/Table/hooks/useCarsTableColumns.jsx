import { Switch, Tag, Image } from 'antd';
import { Edit2, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { STATUS_COLOR_MAP } from '../../../constants/carsConstants';

export const useCarsTableColumns = (handleToggleDemo) => {
    const { t } = useTranslation('adminCars');
    const navigate = useNavigate();

    const columns = [
        {
            title: t('product', 'Sản phẩm'),
            key: 'product',
            align: 'left',
            fixed: 'left',
            width: 380,
            render: (_, record) => (
                <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => navigate(`/admin/cars/edit/${record.id}`)}>
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shrink-0 shadow-sm group-hover:shadow-md transition-all">
                        <img src={record.image} alt={record.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white line-clamp-1 text-left group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{record.name}</p>
                        <p className="text-[10px] font-medium text-slate-500 uppercase mt-1 text-left">SKU: {record.sku}</p>
                    </div>
                </div>
            )
        },
        {
            title: t('category', 'Phân loại'),
            key: 'category',
            align: 'left',
            width: 180,
            render: (_, record) => (
                <div className="text-left">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{record.brandName}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">{record.bodyStyle}</p>
                </div>
            )
        },
        {
            title: t('specs', 'Thông số'),
            key: 'specs',
            align: 'left',
            width: 200,
            render: (_, record) => (
                <div className="flex flex-col items-start gap-1 text-left">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{record.year} <span className="mx-1 text-slate-300">•</span> {(record.odo).toLocaleString()} km</p>
                    {record.isNew ? (
                        <Tag color="success" className="m-0 uppercase font-bold text-[9px] border-none px-2 py-0.5">{t('brandNew', 'Mới (Brand New)')}</Tag>
                    ) : (
                        <Tag color="warning" className="m-0 uppercase font-bold text-[9px] border-none px-2 py-0.5">{t('used', 'Lướt / Cũ')}</Tag>
                    )}
                </div>
            )
        },
        {
            title: t('inventoryAndPrice', 'Tồn kho & Giá'),
            key: 'inventory',
            align: 'right',
            width: 200,
            render: (_, record) => (
                <div className="text-right">
                    <p className="text-sm font-extrabold text-slate-900 dark:text-[#ffd165]">{record.price.toLocaleString('vi-VN')} đ</p>
                    <p className={`text-[10px] font-bold uppercase mt-1 ${record.stock <= 2 ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}>
                        {t('stock', 'Tồn kho')}: {record.stock} {record.stock <= 2 && t('lowStock', '(Sắp hết)')}
                    </p>
                </div>
            )
        },
        {
            title: t('testDrive', 'Lái thử'),
            key: 'demo',
            align: 'center',
            width: 140,
            render: (_, record) => (
                <Switch
                    checked={record.isDemoAvailable}
                    onChange={() => handleToggleDemo(record.id)}
                    className="shadow-inner cursor-pointer hover:scale-105 transition-transform"
                />
            )
        },
        {
            title: t('status', 'Trạng thái'),
            key: 'status',
            align: 'center',
            width: 140,
            render: (_, record) => {
                return (
                    <Tag
                        color={STATUS_COLOR_MAP[record.status] || 'default'}
                        className="uppercase font-bold m-0 border-none px-3 py-1 rounded-full text-[10px] shadow-sm"
                    >
                        {record.status}
                    </Tag>
                );
            }
        },
        {
            title: t('action', 'Thao tác'),
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 120,
            render: (_, record) => (
                <div className="flex items-center justify-center space-x-1">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/cars/edit/${record.id}`);
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:text-[#ffd165] dark:hover:bg-yellow-500/10 transition-colors opacity-70 hover:opacity-100 cursor-pointer outline-none"
                    >
                        <Edit2 size={16} strokeWidth={1.75} />
                    </button>
                    <button 
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:text-[#ffb4ab] dark:hover:bg-red-500/10 transition-colors opacity-70 hover:opacity-100 cursor-pointer outline-none"
                    >
                        <Trash2 size={16} strokeWidth={1.75} />
                    </button>
                </div>
            )
        }
    ];

    return { columns };
};
