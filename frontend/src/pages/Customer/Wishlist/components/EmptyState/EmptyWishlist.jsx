import React from 'react';
import { Link } from 'react-router-dom';
import { HeartCrack } from 'lucide-react';
import { Button } from 'antd';

export const EmptyWishlist = ({ t }) => {
    return (
        <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-white dark:bg-[#141416] rounded-3xl border border-dashed border-slate-200 dark:border-white/5 shadow-sm">
            <div className="w-24 h-24 bg-yellow-50 dark:bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                <HeartCrack size={48} className="text-yellow-500" strokeWidth={1.5} />
            </div>
            
            <h3 className="text-2xl text-slate-900 dark:text-white font-black tracking-tight mb-3">
                {t('empty_title', 'Danh sách của bạn đang trống')}
            </h3>
            
            <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 max-w-sm mb-8">
                {t('empty_desc', 'Hãy lưu lại những sản phẩm ưng ý để quay lại mua sắm dễ dàng hơn.')}
            </p>
            
            <Link to="/parts">
                <Button 
                    type="primary" 
                    className="!h-auto !py-4 !px-8 !rounded-2xl !bg-yellow-500 hover:!bg-yellow-600 !text-black !font-bold text-[15px] border-0 shadow-lg shadow-yellow-500/20 active:scale-95 transition-all"
                >
                    {t('continue_shopping', 'Tiếp tục mua sắm')}
                </Button>
            </Link>
        </div>
    );
};

export default EmptyWishlist;
