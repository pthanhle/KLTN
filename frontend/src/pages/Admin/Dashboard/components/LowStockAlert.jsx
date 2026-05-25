import React from 'react';
import { PackageX, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LowStockAlert = ({ parts }) => {
    return (
        <div className="bg-white dark:bg-[#141416] rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Tồn kho thấp</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Sản phẩm cần nhập thêm</p>
                </div>
                <div className="p-2.5 bg-rose-50 dark:bg-rose-500/10 rounded-2xl">
                    <PackageX size={20} className="text-rose-500" />
                </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-2">
                {parts && parts.length > 0 ? parts.map((part, idx) => (
                    <div key={part._id || idx} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {part.images?.[0] ? (
                                <img src={part.images[0]} alt={part.name} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                                <PackageX size={18} className="text-slate-400" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-700 dark:text-white truncate">{part.name}</p>
                            <p className="text-xs text-slate-400">{part.sku}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                part.inventory?.available_stock === 0 
                                    ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' 
                                    : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                            }`}>
                                <AlertTriangle size={11} />
                                {part.inventory?.available_stock || 0} sp
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2 min-h-[120px]">
                        <PackageX size={28} className="opacity-20" />
                        <span className="text-sm">Tất cả đều đủ hàng 👍</span>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-white/5 text-center">
                <Link to="/admin/parts" className="inline-flex items-center gap-1 text-sm font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 transition-colors">
                    Quản lý kho hàng <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
};
