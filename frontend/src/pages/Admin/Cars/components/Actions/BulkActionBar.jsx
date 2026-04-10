import { Trash2, UploadCloud, Archive, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BulkActionBar = ({ selectedKeys, toggleAllSelections }) => {
    const { t } = useTranslation('adminCars');

    if (selectedKeys.length === 0) return null;

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-[#23293c]/90 backdrop-blur-2xl px-8 py-4 rounded-full border border-slate-200 dark:border-[#ffd165]/20 shadow-2xl flex items-center space-x-8 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-[#ffd165]">
                {t('selectedItems', 'Đã chọn {{count}} sản phẩm', { count: selectedKeys.length })}
            </span>
            <div className="h-4 w-px bg-slate-300 dark:bg-[#d3c5ac]/30"></div>
            
            <div className="flex items-center space-x-4">
                <button className="flex items-center text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-[#ffb4ab]/10 px-4 py-2 rounded-full transition-all">
                    <Trash2 size={16} className="mr-2" /> {t('delete', 'Xóa')}
                </button>
                <button className="flex items-center text-[10px] font-bold uppercase tracking-widest text-green-600 dark:text-[#4edea3] hover:bg-green-50 dark:hover:bg-[#4edea3]/10 px-4 py-2 rounded-full transition-all">
                    <UploadCloud size={16} className="mr-2" /> {t('publish', 'Lên sóng')}
                </button>
                <button className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#d3c5ac] hover:bg-slate-100 dark:hover:bg-white/5 px-4 py-2 rounded-full transition-all">
                    <Archive size={16} className="mr-2" /> {t('archive', 'Lưu trữ')}
                </button>
            </div>
            
            <button 
                onClick={() => toggleAllSelections(true)}
                className="ml-4 text-slate-400 hover:text-slate-700 dark:text-[#d3c5ac] dark:hover:text-white transition-colors"
                title={t('deselectAll', 'Bỏ chọn tất cả')}
            >
                <X size={20} />
            </button>
        </div>
    );
};

export default BulkActionBar;
