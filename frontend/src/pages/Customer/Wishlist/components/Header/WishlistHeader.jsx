import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Trash2 } from 'lucide-react';
import ConfirmModal from '../../../../../components/ui/ConfirmModal';

export const WishlistHeader = ({ itemCount, onClearAll, t }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-4">
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-bold mb-4">
                    <Link to="/" className="!text-slate-900 dark:!text-white hover:!text-yellow-500 transition-colors">
                        {t('breadcrumb_home', 'Trang chủ')}
                    </Link>
                    <ChevronRight size={14} className="text-slate-400" />
                    <span className="text-yellow-500 font-bold">{t('breadcrumb_wishlist', 'Danh sách yêu thích')}</span>
                </nav>
                
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        {t('wishlist:title', 'Danh Sách Yêu Thích')}
                    </h1>
                    <span className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-4 py-1.5 rounded-full text-lg font-bold border border-slate-200 dark:border-white/10 shadow-sm">
                        {itemCount}
                    </span>
                </div>
            </div>
            
            {itemCount > 0 && (
                <>
                    <button 
                        onClick={() => setIsConfirmOpen(true)}
                        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 font-bold transition-colors pb-1 group border-b-2 border-transparent hover:border-red-500 dark:hover:border-red-400"
                    >
                        <Trash2 size={18} className="group-hover:animate-bounce" />
                        {t('wishlist:clear_all', 'Xóa tất cả')}
                    </button>

                    <ConfirmModal
                        isOpen={isConfirmOpen}
                        onClose={() => setIsConfirmOpen(false)}
                        onConfirm={() => {
                            setIsConfirmOpen(false);
                            onClearAll();
                        }}
                        title={t('wishlist:confirm_clear_all_title', 'Làm trống danh sách?')}
                        description={t('wishlist:confirm_clear_all_desc', 'Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong danh sách yêu thích? Hành động này không thể hoàn tác.')}
                        confirmText={t('wishlist:btn_clear_all', 'Xóa tất cả')}
                        cancelText={t('wishlist:btn_cancel', 'Hủy')}
                        iconType="trash"
                    />
                </>
            )}
        </div>
    );
};

export default WishlistHeader;
