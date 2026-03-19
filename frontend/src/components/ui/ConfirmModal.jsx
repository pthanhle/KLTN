import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { Button } from 'antd';

export const ConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    description, 
    confirmText = "Xác nhận", 
    cancelText = "Hủy", 
    iconType = "trash",
    isLoading = false
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in" 
                onClick={!isLoading ? onClose : undefined}
            ></div>
            
            <div className="relative z-10 bg-white dark:bg-[#141416] w-full max-w-[400px] rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-8 border border-slate-100 dark:border-white/10 animate-scale-in">
                
                <button 
                    onClick={!isLoading ? onClose : undefined} 
                    className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                    disabled={isLoading}
                >
                    <X size={20} />
                </button>

                <div className="flex justify-center mb-6">
                    <div className="relative w-16 h-16 bg-yellow-50 dark:bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500">
                        {iconType === 'trash' ? <Trash2 size={28} className="text-red-500" strokeWidth={2} /> : <AlertTriangle size={28} className="text-yellow-500" strokeWidth={2} />}
                    </div>
                </div>
                
                <div className="text-center mb-8">
                    <h2 className="text-slate-900 dark:text-white text-xl font-black mb-3">{title}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Button 
                        size="large"
                        className="flex-1 !h-[48px] !rounded-xl !bg-slate-50 hover:!bg-slate-100 dark:!bg-white/5 dark:hover:!bg-white/10 !text-slate-600 dark:!text-slate-300 !border-slate-200 dark:!border-white/10 !font-bold transition-all" 
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button 
                        size="large"
                        type="primary"
                        className="flex-1 !h-[48px] !rounded-xl !bg-yellow-500 hover:!bg-yellow-400 !text-slate-900 !font-bold border-none shadow-[0_8px_16px_rgba(234,179,8,0.2)] active:scale-95 transition-all"
                        onClick={onConfirm}
                        loading={isLoading}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
                .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
        </div>,
        document.body
    );
};

export default ConfirmModal;
