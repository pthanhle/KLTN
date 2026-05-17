import { Button, Tooltip } from 'antd';
import { ShoppingCart } from 'lucide-react';

const PartActions = ({ t, formattedPrice, isOutOfStock, isAddingToCart, onAddToCart, onPreorder }) => {
    return (
        <div className="mt-auto pt-4 flex items-end justify-between border-t border-slate-100/50 dark:border-white/10">
            <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                    {t('retail_price', 'GIÁ BÁN LẺ')}
                </span>
                <div className="flex items-center gap-1">
                    <span className="text-[20px] sm:text-[22px] font-black text-slate-900 dark:text-white leading-none">
                        {formattedPrice}
                    </span>
                </div>
            </div>

            {isOutOfStock ? (
                <Button
                    type="default"
                    onClick={onPreorder}
                    className="!h-[42px] px-3 sm:px-4 !rounded-[12px] !bg-slate-50 hover:!bg-slate-100 dark:!bg-[#1a1c23] dark:hover:!bg-[#22252d] !border-slate-200 dark:!border-white/10 !text-slate-600 dark:!text-slate-400 hover:!text-slate-900 dark:hover:!text-white !font-bold !text-[11px] transition-all tracking-wider uppercase shadow-none border flex-shrink-0 active:scale-95"
                >
                    {t('btn_preorder', 'Đặt hàng')}
                </Button>
            ) : (
                <Tooltip title="" color="#1e293b" placement="top">
                    <Button
                        type="primary"
                        onClick={onAddToCart}
                        loading={isAddingToCart}
                        className="!w-[42px] !h-[42px] !rounded-[12px] !border-none !flex !items-center !justify-center flex-shrink-0 transition-all duration-300 !bg-yellow-500 hover:!bg-yellow-400 !shadow-[0_4px_12px_rgba(234,179,8,0.25)] hover:scale-105 active:scale-95"
                        icon={!isAddingToCart && <ShoppingCart size={18} strokeWidth={2.5} className="text-slate-900" />}
                    />
                </Tooltip>
            )}
        </div>
    );
};

export default PartActions;
