export const CustomerGarageCards = ({ garage, t }) => {
    if (!garage || garage.length === 0) {
        return (
            <div className="py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">{t('adminCustomers:detailNoCars', 'Khách chưa lưu thông tin xe!')}</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {garage.map((car, idx) => (
                <div 
                    key={car.id || idx} 
                    className={`bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${idx !== 0 ? 'opacity-80 hover:opacity-100' : ''}`}
                >
                    {/* Glowing effect background for primary car */}
                    {idx === 0 && <div className="absolute -right-8 -top-8 w-40 h-40 bg-yellow-500/10 dark:bg-premium-gold/10 rounded-full blur-3xl"></div>}
                    
                    <div className="flex justify-between items-start mb-10 relative z-10">
                        <div>
                            <h4 className="text-2xl font-black tracking-tighter text-slate-800 dark:text-white uppercase">{car.brand} {car.model}</h4>
                            <p className="text-[10px] tracking-widest text-yellow-600 dark:text-premium-gold font-bold uppercase mt-1">
                                {car.type || 'Luxury Sedan'} • {car.year || '2023'} Edition
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-6 relative z-10">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] tracking-widest text-slate-500 font-bold uppercase">Biển Số</span>
                            <span className="px-4 py-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase">
                                {car.license_plate}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] tracking-widest text-slate-500 font-bold uppercase">SỐ KHUNG (VIN)</span>
                            <span className="text-xs font-mono tracking-tighter text-slate-800 dark:text-slate-200 font-bold">
                                {car.vin || 'Đang cập nhật'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] tracking-widest text-slate-500 font-bold uppercase">ODO Hiện tại</span>
                            <span className="text-xl font-black tracking-tighter text-yellow-600 dark:text-premium-gold">
                                {car.odometer ? `${car.odometer.toLocaleString()} KM` : '-'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex gap-4">
                        <div className="flex-1">
                            <span className="block text-[9px] tracking-widest text-slate-500 font-bold uppercase mb-1">Bảo hiểm</span>
                            <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase">{car.insurance_exp || 'Chưa ĐK'}</span>
                        </div>
                        <div className="flex-1">
                            <span className="block text-[9px] tracking-widest text-slate-500 font-bold uppercase mb-1">Đăng kiểm</span>
                            <span className="text-xs font-black text-emerald-500 uppercase">
                                {car.registration_status || t('adminCustomers:statusValid', 'HỢP LỆ')}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
