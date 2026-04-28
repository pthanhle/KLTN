import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Image, App } from 'antd';
import { Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useToggleWishlist, useGetWishlist } from '@/services/queries/clientWishlist.queries';
import { formatVND } from '../utils/formatters';

export const CarCardSkeleton = () => {
    return (
        <div className="flex flex-col bg-white dark:bg-[#141416] border border-slate-100 dark:border-white/5 rounded-[32px] overflow-hidden">
            <Skeleton className="w-full h-[220px]" />
            <div className="p-6">
                <Skeleton className="w-3/4 h-6 mb-3" />
                <Skeleton className="w-1/2 h-4 mb-6" />
                <div className="flex gap-4 mb-6">
                    <Skeleton className="flex-1 h-12 rounded-xl" />
                    <Skeleton className="flex-1 h-12 rounded-xl" />
                    <Skeleton className="flex-1 h-12 rounded-xl" />
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton className="w-1/3 h-8" />
                    <Skeleton className="w-28 h-10 rounded-full" />
                </div>
            </div>
        </div>
    );
};

const CarCard = ({ car, t }) => {
    const { message } = App.useApp();
    const { data: wishlistData } = useGetWishlist();
    const isWishlisted = (wishlistData?.data?.items || []).some(item => String(item.part_id) === String(car.id));

    const { mutate: toggleWishlistApi } = useToggleWishlist();

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        toggleWishlistApi(car.id, {
            onSuccess: () => {
                if (isWishlisted) {
                    message.info(t('wishlist_removed', { name: car.name, defaultValue: 'Đã xóa khỏi danh sách yêu thích' }));
                } else {
                    message.success(t('wishlist_added', { name: car.name, defaultValue: 'Đã thêm vào yêu thích' }));
                }
            },
            onError: (err) => {
                message.error(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật Yêu thích');
            }
        });
    };

    return (
        <div className="flex flex-col bg-white dark:bg-[#141416] border border-slate-100 dark:border-white/5 rounded-[32px] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.02)] transition-all duration-300 group hover:-translate-y-1 relative">
            {/* Image Container with scale effect */}
            <div className="relative w-full h-[220px] bg-slate-50 dark:bg-[#0b0f19] overflow-hidden flex items-center justify-center p-4">
                <button 
                    onClick={handleToggleWishlist}
                    className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-[#141416]/90 hover:bg-white transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-100/50 dark:border-white/10 group/btn"
                >
                    <Heart 
                        size={16} 
                        fill={isWishlisted ? "currentColor" : "none"} 
                        className={`transition-colors ${isWishlisted ? 'text-pink-500' : 'text-slate-400 dark:text-slate-500 group-hover/btn:text-pink-500'}`} 
                    />
                </button>
                <Image 
                    src={car.image} 
                    alt={car.name} 
                    rootClassName="w-full h-full"
                    className="!w-full !h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
            </div>

            {/* Info Container */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1.5 line-clamp-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                    {car.name}
                </h3>
                <p className="text-[13px] text-slate-500 font-medium mb-6">
                    {car.isNew ? t('card_newCar', 'Xe mới') : `${t('card_year', 'Sản xuất')} ${car.year} • ${t('card_odo', 'Odo')} ${car.odo.toLocaleString()} km`}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="flex flex-col items-center justify-center p-2.5 bg-slate-50 dark:bg-[#0a0a0b] border border-slate-100 dark:border-white/5 rounded-2xl text-center">
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 mb-0.5">{t('card_engine', 'ĐỘNG CƠ')}</span>
                        <span className="text-[12px] sm:text-[13px] font-bold text-slate-700 dark:text-slate-300">{car.engine}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2.5 bg-slate-50 dark:bg-[#0a0a0b] border border-slate-100 dark:border-white/5 rounded-2xl text-center">
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 mb-0.5">{t('card_fuel', 'NHIÊN LIỆU')}</span>
                        <span className="text-[12px] sm:text-[13px] font-bold text-slate-700 dark:text-slate-300">{car.fuel}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2.5 bg-slate-50 dark:bg-[#0a0a0b] border border-slate-100 dark:border-white/5 rounded-2xl text-center">
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 mb-0.5">{t('card_seats', 'CHỖ NGỒI')}</span>
                        <span className="text-[12px] sm:text-[13px] font-bold text-slate-700 dark:text-slate-300">{car.seats} Chỗ</span>
                    </div>
                </div>

                {/* Footer: Price & Button */}
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
                    <div>
                        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{t('card_priceLabel', 'GIÁ NIÊM YẾT')}</p>
                        <p className="text-xl font-black text-yellow-500">{formatVND(car.price)}</p>
                    </div>
                    <Link
                        to={`/cars/${car.id}`}
                        className="!px-5 !py-2.5 !bg-slate-100 hover:!bg-yellow-500 !text-slate-700 hover:!text-white dark:!bg-[#0b0f19] dark:hover:!bg-yellow-500 dark:!text-slate-300 !text-[13px] !font-bold !rounded-full transition-all duration-300"
                    >
                        {t('card_detailBtn', 'Xem chi tiết')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
