import React from 'react';
import { CONTRACT_TERMS } from '../../../data/contractTerms.data';

export const LegalTerms = () => {
    return (
        <div className="mb-8 text-sm leading-relaxed text-justify">
            {CONTRACT_TERMS.map((term) => (
                <div key={term.id} className="mb-4">
                    <h4 className="font-bold mb-2 uppercase">{term.title}</h4>
                    {term.paragraphs.map((p, idx) => (
                        <p key={idx} className="mb-2">{p}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};

export const Signatures = () => {
    return (
        <div className="grid grid-cols-2 mt-12 text-center text-sm">
            <div>
                <h4 className="font-bold uppercase mb-1">ĐẠI DIỆN BÊN B</h4>
                <p className="italic text-slate-500 mb-24">(Ký, ghi rõ họ tên)</p>
            </div>
            <div>
                <h4 className="font-bold uppercase mb-1">ĐẠI DIỆN BÊN A</h4>
                <p className="italic text-slate-500 mb-24">(Ký, đóng dấu, ghi rõ họ tên)</p>
            </div>
        </div>
    );
};
