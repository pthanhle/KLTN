import React from 'react';
import { COMPANY_PROFILE } from '../../../constants/companyProfile.constants';

export const PartySeller = () => {
    return (
        <div className="mb-6 text-sm leading-relaxed text-justify">
            <h4 className="font-bold mb-2 uppercase">BÊN BÁN (BÊN A): {COMPANY_PROFILE.name}</h4>
            <div className="space-y-1">
                <p>
                    <span className="font-bold">Địa chỉ:</span> {COMPANY_PROFILE.address}
                </p>
                <p>
                    <span className="font-bold">Điện thoại:</span> {COMPANY_PROFILE.phone} 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="font-bold">Mã số thuế:</span> {COMPANY_PROFILE.tax_code}
                </p>
                <p>
                    <span className="font-bold">Đại diện:</span> {COMPANY_PROFILE.representative} 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="font-bold">Chức vụ:</span> {COMPANY_PROFILE.role}
                </p>
                <p>
                    <span className="font-bold">Tài khoản:</span> {COMPANY_PROFILE.bank_account} tại {COMPANY_PROFILE.bank_name}
                </p>
            </div>
        </div>
    );
};
