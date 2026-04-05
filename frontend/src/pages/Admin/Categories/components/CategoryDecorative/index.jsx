import React from 'react';
import { Image } from 'antd';
import { CATEGORY_ASSETS } from '../../constants/categoryAssets';

export const CategoryDecorative = () => {
    return (
        <div className="fixed -bottom-20 -right-40 w-[600px] h-[400px] pointer-events-none opacity-5 dark:opacity-20 blur-sm z-[-1]">
            <Image 
                preview={false}
                alt="Luxury Sports Car" 
                src={CATEGORY_ASSETS.DECORATIVE_CAR_BG}
                className="w-full h-full object-contain" 
            />
        </div>
    );
};
