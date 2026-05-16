import React from 'react';

export const PrintItems = ({ items, t }) => {
    return (
        <section>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b-2 border-black">
                        <th className="py-2 font-bold uppercase text-sm w-3/4">{t('print_product_name')}</th>
                        <th className="py-2 font-bold uppercase text-sm text-center w-1/4">{t('print_qty')}</th>
                    </tr>
                </thead>
                <tbody className="text-sm border-b-2 border-black">
                    {items?.map((item, index) => (
                        <tr key={index} className="border-b border-gray-300 border-dashed last:border-none">
                            <td className="py-3 font-medium">{item.name} {item.properties ? ` - ${item.properties}` : ''}</td>
                            <td className="py-3 text-center font-bold text-lg">{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};