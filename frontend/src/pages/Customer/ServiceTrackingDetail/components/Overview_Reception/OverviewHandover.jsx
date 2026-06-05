import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

const OverviewHandover = ({ signatures }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-600 dark:text-[#ffd165] px-4">
                {t('title_digital_handover', 'Digital Handover')}
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
                {/* Advisor Signature */}
                <div className="space-y-3">
                    <div className="bg-slate-50 dark:bg-[#191f31]/70 backdrop-blur-xl h-36 rounded-3xl border border-dashed border-slate-300 dark:border-yellow-500/30 flex flex-col items-center justify-center p-6 relative shadow-inner">
                        <span className="absolute top-4 left-5 text-[8px] font-bold text-slate-400 dark:text-[#d3c5ac]/40 uppercase tracking-[0.2em]">
                            {t('label_advisor_esign', 'Advisor E-Sign')}
                        </span>
                        
                        {signatures.advisor.isImage ? (
                            <img 
                                src={signatures.advisor.url} 
                                alt="Advisor Signature" 
                                className="w-full h-full object-contain p-2 filter dark:invert" 
                            />
                        ) : (
                            <svg className="w-40 h-auto opacity-80" viewBox="0 0 200 80">
                                <style>
                                    {`
                                        .signature-path-advisor {
                                            stroke-dasharray: 1000;
                                            stroke-dashoffset: 1000;
                                            animation: dash 3s ease-out forwards;
                                        }
                                        @keyframes dash {
                                            to { stroke-dashoffset: 0; }
                                        }
                                    `}
                                </style>
                                <path 
                                    className="signature-path-advisor" 
                                    d={signatures.advisor.svgPath} 
                                    fill="none" 
                                    stroke="#eab308" 
                                    strokeLinecap="round" 
                                    strokeWidth="2.5"
                                ></path>
                            </svg>
                        )}
                    </div>
                    <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-[#d3c5ac]">
                        {signatures.advisor.name}
                    </p>
                </div>

                {/* Customer Signature */}
                <div className="space-y-3">
                    <div className="bg-slate-50 dark:bg-[#191f31]/70 backdrop-blur-xl h-36 rounded-3xl border border-dashed border-slate-300 dark:border-emerald-500/30 flex flex-col items-center justify-center p-6 relative shadow-inner">
                        <span className="absolute top-4 left-5 text-[8px] font-bold text-slate-400 dark:text-[#d3c5ac]/40 uppercase tracking-[0.2em]">
                            {t('label_customer_auth', 'Customer Auth')}
                        </span>
                        
                        {signatures.customer.isImage ? (
                            <img 
                                src={signatures.customer.url} 
                                alt="Customer Signature" 
                                className="w-full h-full object-contain p-2 filter dark:invert" 
                            />
                        ) : (
                            <svg className="w-40 h-auto opacity-80" viewBox="0 0 200 80">
                                <style>
                                    {`
                                        .signature-path-customer {
                                            stroke-dasharray: 1000;
                                            stroke-dashoffset: 1000;
                                            animation: dash 4s ease-out forwards 0.5s;
                                        }
                                    `}
                                </style>
                                <path 
                                    className="signature-path-customer" 
                                    d={signatures.customer.svgPath} 
                                    fill="none" 
                                    stroke="#4edea3" 
                                    strokeLinecap="round" 
                                    strokeWidth="2.5"
                                ></path>
                            </svg>
                        )}
                    </div>
                    <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-[#d3c5ac]">
                        {signatures.customer.name}
                    </p>
                </div>
            </div>

            <div className="mt-8 text-center w-full relative">
                <Button 
                    type="primary" 
                    size="large"
                    className="group relative !w-full !h-[60px] !bg-gradient-to-br from-yellow-400 to-yellow-600 !border-0 !text-[#0a0a0b] font-black !rounded-full !shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:!shadow-[0_15px_40px_rgba(234,179,8,0.5)] active:!scale-[0.98] transition-all duration-300 flex items-center justify-center overflow-hidden hover:!text-[#0a0a0b] hover:-translate-y-0.5"
                >
                    <div className="flex items-center gap-3 z-10 relative">
                        <span className="text-[13px] uppercase tracking-[0.25em] font-black">
                            {t('btn_finalize_reception', 'Hoàn tất bàn giao')}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1.5 transition-transform duration-300"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0"></div>
                </Button>
            </div>
        </div>
    );
};

export default OverviewHandover;
