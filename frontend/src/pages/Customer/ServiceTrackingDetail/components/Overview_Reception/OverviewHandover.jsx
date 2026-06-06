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


        </div>
    );
};

export default OverviewHandover;
