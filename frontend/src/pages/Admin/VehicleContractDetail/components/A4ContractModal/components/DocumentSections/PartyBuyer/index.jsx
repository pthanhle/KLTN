import React from 'react';
import { InlineInput } from '../../Shared/InlineInput';

export const PartyBuyer = ({ snapshot = {}, isEditMode, onChange }) => {
    return (
        <div className="mb-6 text-sm leading-relaxed text-justify">
            <h4 className="font-bold mb-2 uppercase">
                BÊN MUA (BÊN B): <InlineInput 
                    value={snapshot.full_name} 
                    isEditMode={isEditMode} 
                    onChange={(val) => onChange('customer_snapshot', 'full_name', val)}
                    className="font-bold uppercase"
                />
            </h4>
            <div className="space-y-1">
                <p>
                    <span className="font-bold">Địa chỉ:</span>{' '}
                    <InlineInput 
                        value={snapshot.address} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('customer_snapshot', 'address', val)}
                    />
                </p>
                <p>
                    <span className="font-bold">Điện thoại:</span>{' '}
                    <InlineInput 
                        value={snapshot.phone} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('customer_snapshot', 'phone', val)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="font-bold">Mã số thuế / CCCD:</span>{' '}
                    <InlineInput 
                        value={snapshot.tax_code || snapshot.id_number} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('customer_snapshot', snapshot.tax_code ? 'tax_code' : 'id_number', val)}
                    />
                </p>
                <p>
                    <span className="font-bold">Đại diện:</span>{' '}
                    <InlineInput 
                        value={snapshot.full_name} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('customer_snapshot', 'full_name', val)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="font-bold">Chức vụ:</span> Cá nhân / Người mua
                </p>
            </div>
        </div>
    );
};
