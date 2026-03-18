import { Truck } from 'lucide-react';

const ShippingMethod = ({ shippingMethod, setShippingMethod, mockShippingMethods, t }) => {
    return (
        <section className="bg-white dark:bg-[#141416] p-8 rounded-3xl shadow-xl dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <Truck className="text-yellow-500" size={24} strokeWidth={2.5} />
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">{t('checkout_shipping_title', 'Phương thức vận chuyển')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockShippingMethods.map(method => {
                    const isActive = shippingMethod === method.id;
                    return (
                        <div 
                            key={method.id}
                            onClick={() => setShippingMethod(method.id)}
                            className={`relative flex flex-col p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                                isActive 
                                ? 'border-yellow-500 bg-yellow-50/30 dark:bg-yellow-500/5' 
                                : 'border-slate-100 dark:border-white/5 bg-white dark:bg-[#141416] hover:border-yellow-200 dark:hover:border-white/10'
                            }`}
                        >
                            <div className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                isActive ? 'border-yellow-500' : 'border-slate-300 dark:border-slate-600'
                            }`}>
                                {isActive && <div className="w-2 h-2 rounded-full bg-yellow-500" />}
                            </div>
                            
                            <span className="font-bold text-slate-900 dark:text-white block mb-1">{method.label}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 mb-4 italic">{method.desc}</span>
                            <span className={`mt-auto font-bold ${method.price === 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>{method.priceLabel}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ShippingMethod;
