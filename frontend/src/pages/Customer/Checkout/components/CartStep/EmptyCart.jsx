import { Button } from 'antd';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyCart = ({ t }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500 max-w-md mx-auto h-[60vh]">
            <div className="w-28 h-28 bg-yellow-50 dark:bg-yellow-500/10 rounded-full flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 border-4 border-yellow-500/20 rounded-full animate-ping opacity-20"></div>
                <ShoppingBag size={56} className="text-yellow-500" strokeWidth={1.5} />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                {t('cart_empty', 'Giỏ hàng của bạn đang trống.')}
            </h3>
            
            <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-10 font-medium max-w-[300px]">
                {t('cart_empty_desc', 'Có vẻ như bạn chưa chọn mua bất kỳ dịch vụ hay phụ kiện nào. Hãy khám phá gian hàng phía trước nhé.')}
            </p>
            
            <Link to="/parts">
                <Button 
                    type="primary" 
                    icon={<ShoppingBag size={18} />}
                    className="!h-auto !py-4 !px-8 !bg-yellow-500 hover:!bg-yellow-600 !text-slate-900 font-black rounded-full transition-all hover:scale-105 active:scale-95 text-[15px] uppercase tracking-widest shadow-xl shadow-yellow-500/30 border-none flex items-center justify-center gap-2"
                >
                    {t('cart_continue_shopping', 'Tiếp tục mua sắm')}
                </Button>
            </Link>
        </div>
    );
};

export default EmptyCart;
