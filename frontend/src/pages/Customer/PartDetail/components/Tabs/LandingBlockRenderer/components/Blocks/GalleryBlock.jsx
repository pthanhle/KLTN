import React from 'react';
import { Image } from 'antd';

const GalleryBlock = ({ block, t }) => {
    const images = block.images || [];

    return (
        <div className="w-full py-16 lg:py-24 rounded-[3rem] bg-transparent">
            <div className="max-w-7xl mx-auto px-8 space-y-12">
                {block.title && (
                    <div className="text-center">
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white">{block.title}</h3>
                    </div>
                )}
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {images.map((img, idx) => (
                        <div key={idx} className={`aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} group relative shadow-lg`}>
                            {img.url ? (
                                <Image 
                                    src={img.url} 
                                    alt={t('parts:galleryImg', 'Gallery Image')} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    preview={{ maskClassName: 'rounded-3xl' }}
                                />
                            ) : null}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryBlock;
