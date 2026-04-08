import { Star, MessageSquare } from 'lucide-react';
import { Image, Button } from 'antd';

export const OrderItemsList = ({ items, isCompleted, handleReview, formatCurrency, t }) => {
    return (
        <section className="bg-white dark:bg-[#141416] rounded-3xl shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden" data-purpose="product-list-card">
            <div className="p-6 border-b border-slate-50 dark:border-white/5 bg-slate-50/30 dark:bg-slate-800/30">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {t('order_dtl_items', 'Chi tiết đơn hàng')} ({items.length})
                </h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-white/5">
                {items.map((item) => (
                    <div key={item._id} className="p-6 flex flex-col sm:flex-row items-center gap-6 group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                        <div className="w-32 h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden flex-shrink-0">
                            <Image 
                                alt={item.name} 
                                rootClassName="w-full h-full" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                                src={item.image} 
                            />
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.name}</h4>
                            <p className="text-slate-400 text-xs font-medium mt-1">{t('order_lbl_sku', 'Mã SKU')}: {item.sku}</p>
                            {(item.properties || (item.selected_options && Object.keys(item.selected_options).length > 0)) && (
                                <p className="text-slate-500 text-xs mt-1 bg-slate-100 dark:bg-slate-800 inline-block px-2 py-1 rounded">
                                    {item.properties || Object.entries(item.selected_options).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                                </p>
                            )}
                            <div className="mt-2 flex items-center justify-center sm:justify-start gap-4">
                                <span className="text-slate-500 dark:text-slate-400 text-sm">
                                    {t('order_qty_lbl', 'Số lượng')}: <span className="text-slate-900 dark:text-white font-semibold">{item.quantity}</span>
                                </span>
                            </div>
                        </div>
                        <div className="text-center sm:text-right mt-4 sm:mt-0">
                            {item.original_price && (
                                <p className="text-sm text-slate-400 line-through font-medium mb-1">
                                    {formatCurrency(item.original_price)}
                                </p>
                            )}
                            <p className="text-xl font-extrabold text-slate-900 dark:text-white">
                                {formatCurrency(item.unit_price)}
                            </p>
                            
                            {isCompleted && (
                                <div className="mt-3">
                                    {item.is_reviewed ? (
                                        <Button type="text" className="!h-auto !p-0 !text-xs !font-bold !text-slate-400 flex items-center justify-center sm:justify-end gap-1 w-full" disabled>
                                            <Star size={14} className="fill-yellow-500 text-yellow-500" /> {t('order_btn_reviewed', 'Đã đánh giá')}
                                        </Button>
                                    ) : (
                                        <Button 
                                            type="text"
                                            onClick={() => handleReview(item.id)}
                                            className="!h-auto !p-0 !text-xs !font-bold !text-yellow-600 dark:!text-yellow-500 hover:!text-yellow-700 flex items-center justify-center sm:justify-end gap-1 w-full transition-colors"
                                        >
                                            <MessageSquare size={14} /> {t('order_btn_review', 'Viết đánh giá')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OrderItemsList;
