import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import OutofStockNotification from '../OutofStockNotification';

export const ProductActions = ({ part, selectedOptions, quantity, handleQuantityChange, handleBuyNow, t, isSubmittingAction }) => {
    return (
        <>
            {part.stock === 0 ? (
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
                    <div className="flex gap-4">
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-2xl p-1 bg-white dark:bg-slate-900 w-32 justify-between shrink-0">
                            <Button type="text" onClick={() => handleQuantityChange('decrement')} className="w-10 h-10 !flex !items-center !justify-center !text-lg !font-bold text-slate-900 dark:text-white">-</Button>
                            <span className="font-bold text-slate-900 dark:text-white">{quantity}</span>
                            <Button type="text" onClick={() => handleQuantityChange('increment')} className="w-10 h-10 !flex !items-center !justify-center !text-lg !font-bold text-slate-900 dark:text-white">+</Button>
                        </div>
                        
                        <Button 
                            type="primary"
                            loading={isSubmittingAction}
                            onClick={handleBuyNow}
                            className="flex-1 !h-auto !bg-yellow-500 hover:!bg-yellow-600 !text-black !font-black !py-4 sm:!py-5 !rounded-2xl shadow-xl shadow-yellow-500/20 transition-all border-0 text-sm sm:text-base uppercase active:scale-[0.98]"
                        >
                            {t('btn_buy_now', 'MUA NHANH')}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductActions;
