import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Loader2, Trash2 } from 'lucide-react';
import { Button, Image } from 'antd';
import ConfirmModal from '@/components/ui/ConfirmModal';

const WishlistCard = ({ item, isRemoving, isAddingToCart, isBuyingNow, onRemove, onAddToCart, onBuyNow, t, formatCurrency }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const getBadgeStyle = (type) => {
        switch (type) {
            case 'best_seller': return 'bg-black dark:bg-yellow-500 text-white dark:text-black';
            case 'sale': return 'bg-red-600 text-white';
            case 'new_arrival': return 'bg-emerald-500 text-white';
            default: return 'bg-slate-800 text-white';
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'in_stock': return 'bg-emerald-500 text-emerald-600';
            case 'pre_order': return 'bg-yellow-500 text-yellow-600';
            case 'out_of_stock': return 'bg-red-500 text-red-600';
            default: return 'bg-slate-500 text-slate-600';
        }
    };

    return (
        <article className="group bg-white dark:bg-[#0b0f19] rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_30px_-5px_rgba(234,179,8,0.05)] border border-slate-100 dark:border-white/5 flex flex-col md:flex-row gap-8 items-center p-6 md:p-10 relative overflow-hidden">
            {/* Action Top Right */}
            <button
                disabled={isRemoving}
                onClick={() => setIsConfirmOpen(true)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2.5 md:p-3 text-red-500 bg-white/80 hover:bg-red-50 dark:bg-[#141416]/80 dark:hover:bg-red-500/10 rounded-full transition-all flex items-center justify-center border border-slate-100 dark:border-white/5 shadow hover:shadow-md active:scale-95 backdrop-blur-sm group/remove"
                title={t('wishlist:remove_item')}
            >
                {isRemoving ? <Loader2 size={22} className="animate-spin text-red-500" /> : <Trash2 size={22} className="group-hover/remove:scale-110 transition-transform" strokeWidth={2} />}
            </button>

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => {
                    setIsConfirmOpen(false);
                    onRemove(item.id);
                }}
                title={t('wishlist:confirm_remove_title', 'Xóa sản phẩm này?')}
                description={t('wishlist:confirm_remove_desc', 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích? Hành động này không thể hoàn tác.')}
                confirmText={t('wishlist:btn_remove', 'Xác nhận xóa')}
                cancelText={t('wishlist:btn_cancel', 'Hủy')}
                iconType="trash"
            />

            {/* Left: Image */}
            <div className="relative w-full flex-shrink-0 rounded-2xl bg-[#fcfcfc] dark:bg-[#141416] overflow-hidden md:w-[260px] h-[260px] flex items-center justify-center border border-slate-50 dark:border-white/5">
                {item.badge_type && (
                    <span className={`absolute top-3 left-3 z-10 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${getBadgeStyle(item.badge_type)}`}>
                        {t(`wishlist:${item.badge_type}`, item.badge_type.replace('_', ' '))}
                    </span>
                )}
                <div className="w-[80%] h-[80%] flex items-center justify-center">
                    <Image
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </div>

            {/* Center: Details */}
            <div className="flex-grow space-y-3 text-center md:text-left w-full">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">{item.brand}</p>
                        <Link to={item.type === 'car' ? `/cars/${item.product_id}` : `/parts/${item.product_id}`} className="hover:text-yellow-500 transition-colors block">
                            <h3 className="font-extrabold text-xl md:text-2xl leading-tight text-slate-900 dark:text-white line-clamp-2 md:line-clamp-none">{item.name}</h3>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-1.5 pt-2">
                    <div className="flex text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={14}
                                className={star <= Math.round(item.rating) ? "fill-current" : "fill-transparent text-slate-300 dark:text-slate-700"}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">({item.reviews_count} {t('wishlist:reviews')})</span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
                    <span className={`w-2 h-2 rounded-full ${getStatusStyle(item.stock_status).split(' ')[0]}`}></span>
                    <span className={`text-xs font-bold uppercase tracking-wide ${getStatusStyle(item.stock_status).split(' ')[1]}`}>
                        {t(`wishlist:${item.stock_status}`)}
                    </span>
                </div>
            </div>

            {/* Right: Price & CTA */}
            <div className="w-full md:w-64 flex flex-col items-center md:items-end justify-center gap-5 md:border-l border-slate-100 dark:border-white/5 md:pl-8 flex-shrink-0">
                <div className="text-center md:text-right">
                    <p className={`text-2xl lg:text-[28px] font-black ${item.original_price ? 'text-red-600 dark:text-red-500' : 'text-slate-900 dark:text-white'}`}>
                        {formatCurrency(item.price)}
                    </p>
                    {item.original_price && (
                        <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 line-through mt-1">
                            {formatCurrency(item.original_price)}
                        </p>
                    )}
                </div>

                <div className="w-full space-y-3 mt-2">
                    {item.type === 'car' ? (
                        <Link to={`/cars/${item.product_id}`} className="block w-full">
                            <Button
                                type="primary"
                                className="w-full !h-auto !py-3.5 !rounded-2xl !font-bold !text-[14px] transition-all duration-300 flex items-center justify-center active:scale-95 !bg-yellow-500 hover:!bg-yellow-400 !text-slate-900 !border-0 shadow-lg shadow-yellow-500/20"
                            >
                                {t('wishlist:view_car_details', 'Xem chi tiết xe')}
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Button
                                loading={isBuyingNow}
                                type="primary"
                                onClick={() => {
                                    if (item.stock_status !== 'out_of_stock' && item.stock_status !== 'pre_order') {
                                        onBuyNow(item);
                                    }
                                }}
                                disabled={item.stock_status === 'out_of_stock'}
                                className={`w-full !h-auto !py-3.5 !rounded-2xl !font-bold !text-[14px] transition-all duration-300 flex items-center justify-center active:scale-95 ${item.stock_status === 'out_of_stock'
                                        ? '!bg-slate-200 dark:!bg-slate-800 !text-slate-400 !shadow-none !border-0'
                                        : '!bg-yellow-500 hover:!bg-yellow-400 !text-slate-900 !border-0 shadow-lg shadow-yellow-500/20'
                                    }`}
                            >
                                {item.stock_status === 'out_of_stock'
                                    ? t('wishlist:out_of_stock', 'Hết hàng')
                                    : item.stock_status === 'pre_order'
                                        ? t('wishlist:contact_order', 'Liên hệ đặt hàng')
                                        : t('wishlist:buy_now', 'Mua ngay')
                                }
                            </Button>
                            <Button
                                loading={isAddingToCart}
                                onClick={() => onAddToCart(item)}
                                disabled={item.stock_status === 'out_of_stock'}
                                className={`w-full !h-auto !py-3.5 !rounded-2xl !font-bold !text-[14px] transition-all duration-300 flex items-center justify-center active:scale-95 ${item.stock_status === 'out_of_stock'
                                        ? '!bg-slate-100 dark:!bg-white/5 !text-slate-500 dark:!text-slate-500 !border-slate-200 dark:!border-white/5 opacity-50'
                                        : '!bg-white dark:!bg-transparent hover:!bg-slate-50 dark:hover:!bg-white/5 !text-slate-700 dark:!text-slate-300 !border-slate-200 dark:!border-white/10'
                                    }`}
                            >
                                {t('wishlist:add_to_cart', 'Thêm vào giỏ hàng')}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </article>
    );
};

export default WishlistCard;
