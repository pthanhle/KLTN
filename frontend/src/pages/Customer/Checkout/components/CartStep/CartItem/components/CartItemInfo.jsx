import { formatVND } from '@/pages/Customer/Cars/utils/formatters';

const CartItemInfo = ({ item }) => {
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">SKU: {item.sku}</p>
                </div>
                <span className="text-xl font-black text-slate-900 dark:text-yellow-500 shrink-0">
                    {formatVND(item.price)}
                </span>
            </div>

            {item.selected_options && Object.keys(item.selected_options).length > 0 && (
                <div className="flex flex-wrap items-center gap-2.5 mb-3.5 mt-1">
                    {Object.entries(item.selected_options).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-md bg-slate-50/50 hover:bg-slate-50 dark:bg-[#1a1d24]/50 dark:hover:bg-[#1a1d24] border border-slate-200/50 dark:border-white/5 transition-colors">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{key}</span>
                            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                            <span className="text-[13px] font-black tracking-tight text-slate-800 dark:text-slate-200">{value}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default CartItemInfo;
