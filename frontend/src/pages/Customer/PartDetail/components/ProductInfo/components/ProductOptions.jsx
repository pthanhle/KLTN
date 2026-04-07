import React from 'react';

export const ProductOptions = ({ part, selectedOptions, handleOptionSelect }) => {
    if (!part.options || part.options.length === 0) return null;

    return (
        <>
            {part.options.map((opt, idx) => {
                const optIdentifier = opt.type;
                return (
                    <div key={idx} className="flex flex-col gap-4">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{optIdentifier}</label>
                        <div className="flex flex-wrap gap-3">
                            {opt.type === 'color' ? (
                                opt.choices.map((c) => {
                                    const choiceLabel = typeof c === 'string' ? c : c.label;
                                    const choiceColor = typeof c === 'string' ? '#000000' : c.colorCode || '#000000';
                                    return (
                                        <button
                                            key={choiceLabel}
                                            onClick={() => handleOptionSelect(optIdentifier, choiceLabel)}
                                            className={`flex items-center gap-2 p-2 rounded-2xl border-2 transition-all ${selectedOptions[optIdentifier] === choiceLabel ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`}
                                        >
                                            <span className="w-8 h-8 rounded-full shadow-inner border border-slate-100 dark:border-white/10" style={{ backgroundColor: choiceColor }}></span>
                                            <span className="text-sm font-bold pr-2">{choiceLabel}</span>
                                        </button>
                                    );
                                })
                            ) : (
                                opt.choices.map((c) => {
                                    const choiceLabel = typeof c === 'string' ? c : c.label;
                                    return (
                                        <button
                                            key={choiceLabel}
                                            onClick={() => handleOptionSelect(optIdentifier, choiceLabel)}
                                            className={`px-6 py-2 rounded-xl border-2 transition-all text-sm font-medium ${selectedOptions[optIdentifier] === choiceLabel ? 'border-yellow-500 bg-yellow-500/5 text-yellow-600 dark:text-yellow-500 font-bold' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'}`}
                                        >
                                            {choiceLabel}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductOptions;
