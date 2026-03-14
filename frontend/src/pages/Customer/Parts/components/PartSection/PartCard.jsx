import { ShoppingCart, Heart } from 'lucide-react';
import { Button, Image, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

export const PartCardSkeleton = () => (
    <div className="bg-white dark:bg-[#141416] rounded-[24px] p-4 flex flex-col h-full shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-50 dark:border-white/5">
        <div className="w-full h-[180px] bg-slate-100 dark:bg-white/10 rounded-xl mb-5 animate-pulse"></div>
        <div className="h-5 bg-slate-100 dark:bg-white/10 rounded w-[80%] mb-3 animate-pulse"></div>
        <div className="h-3 bg-slate-100 dark:bg-white/10 rounded w-[60%] mb-4 animate-pulse"></div>
        <div className="h-3 bg-slate-100 dark:bg-white/10 rounded w-full mb-1 animate-pulse"></div>
        <div className="h-3 bg-slate-100 dark:bg-white/10 rounded w-[90%] mb-6 animate-pulse"></div>
        <div className="mt-auto flex justify-between items-end pt-4 border-t border-slate-100/50 dark:border-white/10">
            <div className="h-6 bg-slate-100 dark:bg-white/10 rounded w-28 animate-pulse"></div>
            <div className="h-[42px] w-[42px] bg-slate-100 dark:bg-white/10 rounded-xl animate-pulse"></div>
        </div>
    </div>
);

const PartCard = ({ part }) => {
    const { t } = useTranslation('parts');
    const isOutOfStock = part.stock_quantity === 0;
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(part.price);

    const subInfo = `${t('sku', 'Mã SP:')} ${part._id.padStart(5, '0')} • ${part.compatible_brands?.length > 0 ? part.compatible_brands.join(', ') : t('universal_badge', 'Phổ thông')}`;

    return (
        <div className="group flex flex-col bg-white dark:bg-[#141416] rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-50 dark:border-white/5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full">

            <div className="relative w-full h-[180px] bg-[#f8fafc] dark:bg-[#0b0f19] rounded-xl flex items-center justify-center p-3 mb-5 overflow-hidden [&_.ant-image]:!w-full [&_.ant-image]:!h-full">
                {part.images?.length > 0 ? (
                    <Image
                        src={part.images[0]}
                        alt={part.product_name}
                        preview={{ mask: <span className="text-white text-xs">{t('view', 'Xem')}</span> }}
                        className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <span className="text-slate-300 dark:text-slate-600 text-sm font-medium">{t('no_image', 'No Image')}</span>
                )}

                <button className="absolute top-3 right-3 w-8 h-8 z-10 flex items-center justify-center rounded-full bg-white/95 dark:bg-[#141416]/90 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-white transition-colors cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-slate-100/50 dark:border-white/10">
                    <Heart size={14} className="" />
                </button>

                {part.category && part.category !== 'all' && (
                    <div className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-white/95 dark:bg-[#141416]/90 rounded-full text-[10px] font-bold text-slate-700 dark:text-slate-300 tracking-wide uppercase shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-slate-100/50 dark:border-white/10">
                        {t(`category_${part.category}`)}
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1 pl-1 pr-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-[1.3] mb-2 line-clamp-2 transition-colors hover:text-yellow-600 dark:hover:text-yellow-500">
                    {part.product_name}
                </h3>
                
                <p className="text-[12px] sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium mb-4">
                    {subInfo}
                </p>

                <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
                    {part.description}
                </p>

                <div className="mt-auto pt-4 flex items-end justify-between border-t border-slate-100/50 dark:border-white/10">
                    <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                            {t('retail_price', 'GIÁ BÁN LẺ')}
                        </span>
                        <div className="flex items-center gap-1">
                            <span className="text-[20px] sm:text-[22px] font-black text-slate-900 dark:text-white leading-none">{formattedPrice}</span>
                            <span className="text-[14px] font-bold text-yellow-500 underline decoration-yellow-500/30 underline-offset-2 leading-none">đ</span>
                        </div>
                    </div>

                    <Tooltip title={isOutOfStock ? t('add_to_cart_disabled', 'Hết hàng') : ''} color="#1e293b" placement="top">
                        <Button
                            type="primary"
                            onClick={(e) => isOutOfStock && e.preventDefault()}
                            className={`!w-[42px] !h-[42px] !rounded-[12px] !border-none !flex !items-center !justify-center flex-shrink-0 transition-all duration-300 ${isOutOfStock
                                    ? '!bg-slate-100 dark:!bg-white/5 !shadow-none !cursor-default border !border-slate-200 dark:!border-white/10'
                                    : '!bg-yellow-500 hover:!bg-yellow-400 !shadow-[0_4px_12px_rgba(234,179,8,0.25)]'
                                }`}
                            icon={<ShoppingCart size={18} strokeWidth={2.5} className={isOutOfStock ? "!text-slate-900 dark:!text-white" : "text-slate-900"} />}
                        />
                    </Tooltip>
                </div>
            </div>

        </div>
    );
};
export default PartCard;
