import { Image } from 'antd';

const OrderItemList = ({ items, t, formatCurrency }) => {
    return (
        <div className="space-y-4 mb-6">
            {items.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                    <Image 
                        src={item.image} 
                        alt={item.name}
                        preview={true}
                        width={80}
                        height={64}
                        className="object-cover"
                        rootClassName="rounded-[12px] bg-slate-50 dark:bg-black/50 overflow-hidden border border-slate-100 dark:border-white/5"
                    />
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[15px] text-slate-900 dark:text-white truncate">{item.name}</h4>
                        {item.selected_options && Object.keys(item.selected_options).length > 0 && (
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 mb-1">
                                {Object.entries(item.selected_options).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                            </p>
                        )}
                        <p className="text-sm text-slate-500 font-medium">
                            {t('order_qty_lbl', 'Số lượng')}: {item.quantity}
                        </p>
                    </div>
                    <p className="font-black text-[15px] text-slate-900 dark:text-white">
                        {formatCurrency(item.unit_price)}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default OrderItemList;
