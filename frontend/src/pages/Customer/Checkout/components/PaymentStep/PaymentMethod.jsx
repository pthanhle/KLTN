import { CreditCard, Wallet, QrCode, Handshake } from 'lucide-react';
import { Visa, Mastercard } from '@thesvg/react';

const getPaymentIcon = (id) => {
    switch (id) {
        case 'credit_card': return <CreditCard size={20} strokeWidth={2.5} />;
        case 'bank_transfer': return <Wallet size={20} strokeWidth={2.5} />;
        case 'vnpay': return <QrCode size={20} strokeWidth={2.5} />;
        case 'cod': return <Handshake size={20} strokeWidth={2.5} />;
        default: return <CreditCard size={20} strokeWidth={2.5} />;
    }
};

const PaymentMethod = ({ paymentMethod, setPaymentMethod, mockPaymentMethods, t }) => {
    return (
        <section className="bg-white dark:bg-[#141416] p-8 rounded-3xl shadow-xl dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <CreditCard className="text-yellow-500" size={24} strokeWidth={2.5} />
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">{t('checkout_payment_title', 'Phương thức thanh toán')}</h2>
            </div>
            
            <div className="space-y-3">
                {mockPaymentMethods.map(method => {
                    const isActive = paymentMethod === method.id;
                    return (
                        <div 
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                                isActive 
                                ? 'border-yellow-500 bg-yellow-50/30 dark:bg-yellow-500/5' 
                                : 'border-slate-100 dark:border-white/5 bg-white dark:bg-[#141416] hover:border-yellow-200 dark:hover:border-white/10'
                            }`}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                isActive ? 'border-yellow-500' : 'border-slate-300 dark:border-slate-600'
                            }`}>
                                {isActive && <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />}
                            </div>
                            
                            <div className="ml-4 flex items-center flex-1 gap-3">
                                <div className={`${isActive ? 'text-yellow-500' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {getPaymentIcon(method.id)}
                                </div>
                                <span className={`font-bold ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                    {method.label}
                                </span>
                            </div>

                            {method.tags && method.tags.length > 0 && (
                                <div className="flex space-x-2">
                                    {method.tags.map(tag => (
                                        <div key={tag} className="min-w-[32px] px-1 h-5 bg-slate-200 dark:bg-white/10 rounded text-[9px] text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold">
                                            {tag === 'VISA' ? <Visa width={22} height={12} /> :
                                             tag === 'MC' ? <Mastercard width={22} height={12} /> :
                                             tag}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default PaymentMethod;
