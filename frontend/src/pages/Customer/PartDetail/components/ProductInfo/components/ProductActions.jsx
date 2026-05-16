import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import OutofStockNotification from '../OutofStockNotification';

import { ShoppingCart } from 'lucide-react';

export const ProductActions = ({ part, selectedOptions, quantity, handleQuantityChange, handleAddToCart, handleBuyNow, t, isSubmittingAction }) => {
    return (
        <>
            {(part.inventory?.available_stock || 0) <= 0 ? (
                <div className="pt-6">
                    <OutofStockNotification t={t} />
                    <Link to={`/parts/pre-order/${part.id}`} state={{ selectedOptions, quantity }} className="block w-full">
                        <Button 
                            type="primary"
                            className="w-full !h-auto !bg-slate-900 hover:!bg-slate-800 dark:!bg-white dark:hover:!bg-slate-200 !text-white dark:!text-slate-900 !font-black !py-4 sm:!py-5 !rounded-2xl shadow-xl transition-all border-0 text-sm sm:text-base uppercase active:scale-[0.98]"
                        >
                            {t('btn_contact_order', 'LIÊN HỆ ĐẶT HÀNG')}
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="pt-6 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center border border-slate-200 dark:border-white/10 rounded-2xl p-1 bg-white dark:bg-[#0a0a0b] w-full sm:w-32 justify-between shrink-0">
                            <Button type="text" onClick={() => handleQuantityChange('decrement')} className="w-10 h-10 !flex !items-center !justify-center !text-lg !font-bold text-slate-900 dark:!text-white">-</Button>
                            <span className="font-bold text-slate-900 dark:text-white">{quantity}</span>
                            <Button type="text" onClick={() => handleQuantityChange('increment')} className="w-10 h-10 !flex !items-center !justify-center !text-lg !font-bold text-slate-900 dark:!text-white">+</Button>
                        </div>
                        
                        <div className="flex flex-1 gap-2 sm:gap-4">
                            <Button 
                                type="default"
                                loading={isSubmittingAction}
                                onClick={handleAddToCart}
                                className="w-16 sm:w-[64px] !h-auto !bg-yellow-50 hover:!bg-yellow-100 dark:!bg-yellow-500/10 dark:hover:!bg-yellow-500/20 text-yellow-600 dark:text-yellow-500 !py-4 sm:!py-5 !rounded-2xl shadow-none hover:shadow-lg hover:shadow-yellow-500/5 border border-yellow-200 dark:border-yellow-500/30 transition-all flex items-center justify-center shrink-0 active:scale-[0.98]"
                            >
                                <ShoppingCart size={24} strokeWidth={2.5} />
                            </Button>

                            <Button 
                                type="primary"
                                loading={isSubmittingAction}
                                onClick={handleBuyNow}
                                className="flex-1 !h-auto !bg-yellow-500 hover:!bg-yellow-600 !text-black !font-black !py-4 sm:!py-5 !rounded-2xl shadow-xl shadow-yellow-500/20 transition-all border-0 text-xs sm:text-sm uppercase active:scale-[0.98]"
                            >
                                {t('btn_buy_now', 'MUA NHANH')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductActions;
