import React from 'react';
import { InlineInput } from '../../Shared/InlineInput';
import { numberToVietnameseWords } from '../../../utils/contractFormat.utils';

export const PricingDetails = ({ snapshot = {}, isEditMode, onChange }) => {
    const formatter = new Intl.NumberFormat('vi-VN');
    const grandTotal = snapshot.grand_total || 0;

    return (
        <div className="mb-6 text-sm leading-relaxed text-justify">
            <h4 className="font-bold mb-2 uppercase">ĐIỀU 2: GIÁ TRỊ HỢP ĐỒNG VÀ PHƯƠNG THỨC THANH TOÁN</h4>
            
            <p className="font-medium">2.1. Giá trị hợp đồng:</p>
            <ul className="list-disc pl-8 mb-2">
                <li>
                    Giá xe (Đã bao gồm VAT): <InlineInput 
                        value={formatter.format(snapshot.sale_price || snapshot.listed_price || 0)} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('pricing_snapshot', 'sale_price', Number(val.replace(/[^0-9]/g, '')))}
                    /> VNĐ.
                </li>
                <li>
                    Lệ phí trước bạ: <InlineInput 
                        value={formatter.format(snapshot.registration_fee || 0)} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('pricing_snapshot', 'registration_fee', Number(val.replace(/[^0-9]/g, '')))}
                    /> VNĐ.
                </li>
                <li>
                    Các chi phí khác: <InlineInput 
                        value={formatter.format(snapshot.other_fees || 0)} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('pricing_snapshot', 'other_fees', Number(val.replace(/[^0-9]/g, '')))}
                    /> VNĐ.
                </li>
            </ul>

            <p className="mb-2">
                <span className="font-bold">Tổng giá trị hợp đồng: {formatter.format(grandTotal)} VNĐ</span>
                <br/>
                <span className="italic">(Bằng chữ: {numberToVietnameseWords(grandTotal)})</span>
            </p>

            <p className="font-medium mt-4">2.2. Phương thức thanh toán:</p>
            <p>Bên B thanh toán cho Bên A bằng tiền Việt Nam Đồng (chuyển khoản hoặc tiền mặt) làm 02 đợt:</p>
            <ul className="list-disc pl-8">
                <li>Đợt 1: Thanh toán tiền đặt cọc tương đương 10% giá trị hợp đồng ngay sau khi ký.</li>
                <li>Đợt 2: Thanh toán phần còn lại trước khi nhận xe và hồ sơ xe.</li>
            </ul>
        </div>
    );
};
