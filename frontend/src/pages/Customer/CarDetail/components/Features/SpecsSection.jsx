const SpecsSection = ({ specs, t }) => {
    return (
        <section id="specs" className="py-24 bg-white dark:bg-[#0a0a0b] relative">
            <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1000px]">
                <h2 className="text-[28px] lg:text-[40px] font-black uppercase text-center text-slate-900 dark:text-white mb-16 tracking-tight">
                    {t('specs', 'THÔNG SỐ KỸ THUẬT')}
                </h2>
                
                <div className="relative bg-slate-50 dark:bg-[#141416] rounded-[48px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.02)] dark:shadow-none border border-slate-100 dark:border-white/5">
                    {/* Scrollable Container */}
                    <div className="max-h-[600px] overflow-y-auto custom-scrollbar p-6 md:p-12 lg:p-16 relative z-0">
                        {specs.map((group, index) => (
                            <div key={index} className="mb-14 last:mb-0">
                                <h3 className="text-[14px] font-black text-yellow-600 dark:text-yellow-500 uppercase tracking-widest mb-8 pb-4 border-b border-slate-200 dark:border-white/10">
                                    {group.category}
                                </h3>
                                
                                <div className="flex flex-col gap-6">
                                    {group.items.map((item, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-8 group/row">
                                            <span className="text-[14px] font-bold text-slate-900 dark:text-slate-200 w-full sm:w-1/3 group-hover/row:text-yellow-600 dark:group-hover/row:text-yellow-500 transition-colors uppercase tracking-wide opacity-80">{item.label}</span>
                                            <span className="text-[14px] font-medium text-slate-500 dark:text-slate-400 w-full flex-1 sm:text-right">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Faded bottom mask for scroll indicator overlaying the content */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 dark:from-[#141416] to-transparent pointer-events-none z-10"></div>
                </div>
                
                <div className="mt-12 text-center">
                    <button className="px-10 py-4 border-2 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-[13px] font-bold uppercase tracking-widest rounded-full hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-white hover:shadow-xl transition-all">
                        TẢI BROCHURE ĐẦY ĐỦ (PDF)
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpecsSection;
