import React from 'react';
import { Image } from 'antd';

const HeroBlock = ({ block, t }) => {
    return (
        <div className="w-full py-16 px-8 rounded-[3rem] bg-transparent">
            <div className={`flex flex-col md:flex-row gap-12 items-center max-w-7xl mx-auto ${block.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 w-full">
                    {block.image_url && (
                        <Image 
                            src={block.image_url} 
                            alt={block.title || t('parts:productImage', 'Product Image')} 
                            className="w-full h-[300px] md:h-[450px] object-cover rounded-[2.5rem] shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-[1.02] dark:shadow-indigo-500/10 border border-slate-200/50 dark:border-white/5" 
                            preview={true}
                        />
                    )}
                </div>
                <div className={`md:w-1/2 w-full flex flex-col justify-center items-start md:items-start text-left`}>
                    {block.title && <h3 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight leading-tight text-slate-900 dark:text-white">{block.title}</h3>}
                    {block.subtitle && <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400">{block.subtitle}</p>}
                </div>
            </div>
        </div>
    );
};

export default HeroBlock;
