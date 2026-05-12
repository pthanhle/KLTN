import React from 'react';
import { useTranslation } from 'react-i18next';
import { Package } from 'lucide-react';

const LogisticsInventory = ({ progressData }) => {
    const { t } = useTranslation('adminRODetail');

    if (!progressData || !progressData.parts_inventory) return null;

    const { parts_inventory = [] } = progressData;

    const required_items = parts_inventory.length;
    const items_ready = parts_inventory.filter(p => p.status_code === 'DONE').length;
    const items_pending = parts_inventory.filter(p => p.status_code === 'PENDING').length;
    const fulfillment_percentage = required_items > 0 ? Math.round((items_ready / required_items) * 100) : 0;

    // We don't have detailed item lists in the mock, so we'll construct a representative view based on the stats
    // In a real app, this would iterate over an array of parts with status.
    

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm">
            <h2 className="text-xs font-bold text-slate-500 dark:text-[#d3c5ac] mb-5 flex items-center gap-2 uppercase tracking-widest">
                <Package className="w-4 h-4" />
                {t('panel_logistics_title', 'Tình trạng xuất kho')}
            </h2>
            
            <div className="mb-3 flex justify-between items-end">
                <span className="text-3xl font-bold text-slate-800 dark:text-[#dce1fb] leading-none">{fulfillment_percentage}%</span>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-[#d3c5ac] uppercase tracking-wider mb-1">
                    {items_ready}/{required_items} {t('logistics_items', 'Items')}
                </span>
            </div>

            {/* Thin Progress Bar */}
            <div className="h-1.5 w-full bg-slate-100 dark:bg-[#23293c] rounded-full overflow-hidden mb-5">
                <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                    style={{ width: `${fulfillment_percentage}%` }}
                ></div>
            </div>

            <div className="flex flex-col gap-3">
                {parts_inventory.slice(0, 3).map((item, i) => (
                    <div key={i} className={`flex justify-between items-center group ${item.status_code === 'IN TST' ? 'opacity-60' : ''}`}>
                        <span className="text-xs text-slate-700 dark:text-[#dce1fb] font-mono truncate mr-2 group-hover:text-amber-500 transition-colors">
                            {item.name} {i+1}
                        </span>
                        <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded uppercase tracking-wider
                            ${item.status_code === 'DONE' ? 'text-emerald-600 border-emerald-300 dark:text-emerald-400 dark:border-emerald-500/30' : 'text-amber-600 border-amber-300 dark:text-amber-400 dark:border-amber-500/30'}
                        `}>
                            {t(`logistics_status_${item.status_code}`, item.status_code)}
                        </span>
                    </div>
                ))}
                {parts_inventory.length > 3 && (
                    <div className="text-center mt-2">
                        <span className="text-[10px] text-slate-500 dark:text-[#d3c5ac]">+ {parts_inventory.length - 3} more items</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogisticsInventory;
