import React from 'react';
import { Image } from 'antd';

const QuotationSignatures = ({ quotation, t }) => (
    <footer className="mt-16 grid grid-cols-2 gap-10 text-center">
        <div>
            <h5 className="font-bold text-slate-800 dark:text-white mb-2">{t('quote_sign_customer', 'Xác nhận của Khách Hàng')}</h5>
            <div className="h-24 flex items-center justify-center relative">
                {quotation.customer_signature ? (
                    <Image 
                        src={quotation.customer_signature} 
                        alt="E-Signature" 
                        preview={false}
                        rootClassName="h-full w-auto z-10 flex justify-center items-center"
                        className="h-full w-auto object-contain cursor-crosshair opacity-80 dark:invert drop-shadow-md" 
                    />
                ) : (
                    <div className="absolute inset-x-0 bottom-4 text-[10px] text-slate-300 dark:text-white/20 italic">
                        ({t('quote_sign_req', 'Ký và ghi rõ họ tên')})
                    </div>
                )}
            </div>
            <p className="font-medium text-slate-800 dark:text-white">{quotation.customer_info.full_name}</p>
        </div>
        <div>
            <h5 className="font-bold text-slate-800 dark:text-white mb-2">{t('quote_sign_advisor', 'Cố vấn Dịch Vụ')}</h5>
            <div className="h-24 flex items-center justify-center relative">
                <div className="absolute inset-x-0 bottom-4 text-[10px] text-slate-300 dark:text-white/20 italic">
                    ({t('quote_sign_req', 'Ký và ghi rõ họ tên')})
                </div>
            </div>
            <p className="font-medium text-slate-800 dark:text-white">{quotation.advisor_name}</p>
        </div>
    </footer>
);

export default QuotationSignatures;
