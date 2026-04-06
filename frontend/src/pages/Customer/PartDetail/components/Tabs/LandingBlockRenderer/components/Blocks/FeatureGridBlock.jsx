import React from 'react';
import { Image } from 'antd';

const FeatureGridBlock = ({ block }) => {
    const features = block.features || [];

    return (
        <div className="w-full py-16 lg:py-24 px-4 md:px-8 bg-transparent mx-auto">
            <div className="max-w-6xl mx-auto space-y-16">
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    {block.title && <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-slate-900 dark:text-white">{block.title}</h3>}
                    {block.subtitle && <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">{block.subtitle}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feat, idx) => (
                        <div key={idx} className="p-8 rounded-[2rem] bg-white dark:bg-slate-800/50 shadow-xl hover:shadow-2xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-white/5 transition-all duration-300 transform hover:-translate-y-2 group space-y-6">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-indigo-50 dark:bg-slate-700/50 text-indigo-500 dark:group-hover:bg-indigo-500 dark:group-hover:text-white transition-colors">
                                {feat.icon ? (
                                    <Image src={feat.icon} alt={feat.title} className="w-8 h-8 object-contain" preview={false} />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 Z"/></svg>
                                )}
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{feat.title}</h4>
                                <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">{feat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureGridBlock;
