import React from 'react';

export const PrintBarcode = ({ orderCode }) => {
    return (
        <section className="flex flex-col items-center justify-center py-2">
            <div className="inline-block h-[50px] w-3/4 max-w-[300px]" style={{
                background: 'repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 4px, #000 4px, #000 5px, #fff 5px, #fff 8px, #000 8px, #000 12px, #fff 12px, #fff 14px)'
            }}></div>
            <p className="font-display font-bold tracking-[0.2em] mt-2">{orderCode}</p>
        </section>
    );
};
