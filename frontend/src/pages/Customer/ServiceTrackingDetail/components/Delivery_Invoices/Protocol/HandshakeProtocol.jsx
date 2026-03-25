import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';
import { Check, Pointer } from 'lucide-react';
import { CHECKLIST_ITEMS } from '../../../constants/deliveryConstants';
import SignatureModal from '../../Quotations_Approval/SignatureModal';

const HandshakeProtocol = ({ data }) => {
    const { t } = useTranslation('tracking');
    const [checkedItems, setCheckedItems] = useState({});
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    const [clientSig, setClientSig] = useState(data.client_signature?.image_url || null);

    const toggleCheck = (id) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSaveSignature = (sigUrl) => {
        setClientSig(sigUrl);
        setIsSignatureModalOpen(false);
    };

    return (
        <div className="bg-slate-50 dark:bg-[#141416] rounded-xl p-8 border border-slate-200 dark:border-white/5 shadow-sm h-full">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-[#a0a0a0] mb-6">
                {t('del_handshake', 'Biên Bản Bàn Giao Thỏa Thuận')}
            </h3>

            <div className="space-y-4 mb-8">
                {CHECKLIST_ITEMS.map(item => (
                    <label 
                        key={item.id} 
                        className="flex items-center gap-4 cursor-pointer group"
                        onClick={() => toggleCheck(item.id)}
                    >
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${checkedItems[item.id] ? 'border-yellow-500 bg-yellow-500/10' : 'border-slate-300 dark:border-white/20 group-hover:border-yellow-500'}`}>
                            <Check 
                                className={`text-yellow-600 dark:text-[#d4af37] transition-transform ${checkedItems[item.id] ? 'scale-100' : 'scale-0 group-active:scale-100'}`} 
                                size={16} 
                                strokeWidth={3} 
                            />
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-white select-none">
                            {t(item.label_key, item.default_label)}
                        </span>
                    </label>
                ))}
            </div>

            <div className="space-y-6">
                {/* Advisor Signature */}
                <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-[#a0a0a0] mb-2">
                        {t('del_advisor', 'Cố Vấn Dịch Vụ')}
                    </p>
                    <div className="h-24 bg-white dark:bg-[#1e1e20] rounded-lg border border-slate-200 dark:border-white/10 relative flex items-center justify-center overflow-hidden">
                        {data.advisor_signature?.is_signed && (
                            <Image 
                                src={data.advisor_signature.image_url} 
                                alt="Advisor Signature" 
                                preview={false}
                                className="h-16 opacity-80 dark:invert" 
                            />
                        )}
                        <div className="absolute bottom-2 right-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span className="text-[8px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                                {t('del_verified', 'Đã Xác Thực')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Client Signature */}
                <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-[#a0a0a0] mb-2">
                        {t('del_client', 'Chữ Ký Khách Hàng Xác Nhận')}
                    </p>
                    {!clientSig ? (
                        <div 
                            onClick={() => setIsSignatureModalOpen(true)}
                            className="h-32 bg-slate-100/50 dark:bg-white/5 rounded-lg border-2 border-dashed border-slate-300 dark:border-white/20 flex flex-col items-center justify-center gap-2 cursor-pointer group hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                        >
                            <Pointer className="text-slate-400 dark:text-[#a0a0a0] group-hover:text-yellow-600 dark:group-hover:text-[#d4af37] transition-colors" size={24} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#a0a0a0]">
                                {t('del_touch_sign', 'Chạm ngón tay để ký')}
                            </span>
                        </div>
                    ) : (
                        <div 
                            onClick={() => setIsSignatureModalOpen(true)}
                            className="h-32 bg-white dark:bg-[#1e1e20] rounded-lg border border-slate-200 dark:border-white/10 relative flex items-center justify-center overflow-hidden cursor-pointer"
                        >
                            <Image src={clientSig} alt="Client Signature" preview={false} className="h-24 opacity-90 dark:invert" />
                            <div className="absolute top-2 right-2 flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full border border-yellow-200 dark:border-yellow-700/50">
                                <span className="text-[8px] uppercase font-bold text-yellow-600 dark:text-[#d4af37]">
                                    {t('del_resign', 'Chạm để ký lại')}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <SignatureModal 
                isOpen={isSignatureModalOpen} 
                onClose={() => setIsSignatureModalOpen(false)} 
                onConfirm={handleSaveSignature} 
            />
        </div>
    );
};

export default HandshakeProtocol;
