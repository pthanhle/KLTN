import React from 'react';
import { Image } from 'antd';

const formatPriceDelta = (delta) => {
    if (!delta || delta === 0) return null;
    const sign = delta > 0 ? '+' : '';
    return `${sign}${delta.toLocaleString('vi-VN')}đ`;
};

export const ProductOptions = ({ part, selectedOptions, handleOptionSelect }) => {
    if (!part.options || part.options.length === 0) return null;

    return (
        <>
            {part.options.map((opt, idx) => {
                const optIdentifier = opt.type;
                return (
                    <div key={idx} className="flex flex-col gap-3">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            {optIdentifier}
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {(opt.choices || []).map((c) => {
                                const choiceLabel = typeof c === 'string' ? c : c.label;
                                const priceModifier = typeof c === 'object' ? c.price_modifier : 0;
                                const imageUrl = typeof c === 'object' ? c.image_url : null;
                                const isSelected = selectedOptions[optIdentifier] === choiceLabel;
                                const priceDelta = formatPriceDelta(priceModifier);

                                if (imageUrl) {
                                    // Image swatch variant
                                    return (
                                        <button
                                            key={choiceLabel}
                                            onClick={() => handleOptionSelect(optIdentifier, choiceLabel)}
                                            className={`relative flex flex-col items-center gap-1.5 p-1 rounded-2xl border-2 transition-all ${isSelected ? 'border-yellow-500 shadow-md shadow-yellow-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-yellow-400'}`}
                                        >
                                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <Image
                                                    src={imageUrl}
                                                    alt={choiceLabel}
                                                    preview={false}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className={`text-[11px] font-bold px-1 pb-0.5 ${isSelected ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-600 dark:text-slate-300'}`}>
                                                {choiceLabel}
                                            </span>
                                            {priceDelta && (
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${priceModifier > 0 ? 'bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400' : 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400'}`}>
                                                    {priceDelta}
                                                </span>
                                            )}
                                        </button>
                                    );
                                }

                                // Text chip variant
                                return (
                                    <button
                                        key={choiceLabel}
                                        onClick={() => handleOptionSelect(optIdentifier, choiceLabel)}
                                        className={`flex flex-col items-center px-5 py-2.5 rounded-xl border-2 transition-all ${isSelected ? 'border-yellow-500 bg-yellow-500/5 text-yellow-600 dark:text-yellow-500 font-bold shadow-sm' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'}`}
                                    >
                                        <span className="text-sm font-medium">{choiceLabel}</span>
                                        {priceDelta && (
                                            <span className={`text-[10px] font-bold mt-0.5 ${priceModifier > 0 ? 'text-orange-500' : 'text-green-500'}`}>
                                                {priceDelta}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductOptions;
