import React from 'react';
import { Image } from 'antd';

const SignatureBox = ({ title, name, signature, t }) => (
    <div>
        <h5 className="font-bold text-slate-800 dark:text-white mb-2">{title}</h5>
        <div className="h-24 flex items-center justify-center relative">
            {signature ? (
                <Image
                    src={signature}
                    alt={`${title} E-Signature`}
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
        <p className="font-medium text-slate-800 dark:text-white">{name}</p>
    </div>
);

const QuotationSignatures = ({ quotation, t }) => (
    <footer className="mt-16 grid grid-cols-2 gap-10 text-center">
        <SignatureBox
            title={t('quote_sign_customer', 'Xác nhận của Khách Hàng')}
            name={quotation.customer_info?.full_name}
            signature={quotation.customer_signature}
            t={t}
        />
        <SignatureBox
            title={t('quote_sign_advisor', 'Cố vấn Dịch Vụ')}
            name={quotation.advisor_name}
            signature={quotation.advisor_signature}
            t={t}
        />
    </footer>
);

export default QuotationSignatures;
