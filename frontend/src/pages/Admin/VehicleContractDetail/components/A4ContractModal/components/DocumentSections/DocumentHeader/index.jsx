import React from 'react';
import { formatA4Date } from '../../../utils/contractFormat.utils';
import { InlineInput } from '../../Shared/InlineInput';

export const DocumentHeader = ({ contract, isEditMode, onChange }) => {
    return (
        <div className="text-center mb-8">
            <h3 className="font-bold text-base mb-1 uppercase">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
            <h4 className="font-bold text-sm mb-4 underline">Độc lập - Tự do - Hạnh phúc</h4>
            
            <div className="mt-8 mb-4">
                <h1 className="font-bold text-xl uppercase mb-2">HỢP ĐỒNG MUA BÁN XE Ô TÔ</h1>
                <p className="text-sm italic">
                    Số: <InlineInput 
                        value={contract.contract_number} 
                        isEditMode={false} // Contract number cannot be edited inline
                    />
                </p>
            </div>
            
            <p className="text-sm italic text-right mt-6">
                Hà Nội, {formatA4Date(contract.createdAt || contract.created_at)}
            </p>
            
            <div className="text-justify mt-4 text-sm leading-relaxed">
                <p>- Căn cứ Bộ luật Dân sự số 91/2015/QH13 Quốc hội ban hành ngày 24/11/2015;</p>
                <p>- Căn cứ Luật Thương mại số 36/2005/QH11 Quốc hội ban hành ngày 14/06/2005;</p>
                <p>- Căn cứ vào nhu cầu và khả năng của hai bên;</p>
                <p className="mt-2 font-medium">Hôm nay, hai bên chúng tôi gồm có:</p>
            </div>
        </div>
    );
};
