import React from 'react';
import { InlineInput } from '../../Shared/InlineInput';

export const VehicleDetails = ({ snapshot = {}, isEditMode, onChange }) => {
    return (
        <div className="mb-6 text-sm leading-relaxed text-justify">
            <h4 className="font-bold mb-2 uppercase">ĐIỀU 1: ĐẶC ĐIỂM XE Ô TÔ MUA BÁN</h4>
            <p className="mb-2">Bên A đồng ý bán và Bên B đồng ý mua 01 (một) xe ô tô với các đặc điểm cụ thể như sau:</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 pl-4 border-l-2 border-slate-300">
                <div>
                    <span className="font-medium">Nhãn hiệu: </span>
                    <InlineInput 
                        value={snapshot.brandName} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('vehicle_snapshot', 'brandName', val)}
                    />
                </div>
                <div>
                    <span className="font-medium">Loại xe: </span>
                    <InlineInput 
                        value={snapshot.name} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('vehicle_snapshot', 'name', val)}
                    />
                </div>
                <div>
                    <span className="font-medium">Màu sơn: </span>
                    <InlineInput 
                        value={snapshot.color?.name || snapshot.color} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('vehicle_snapshot', 'color', val)}
                    />
                </div>
                <div>
                    <span className="font-medium">Năm sản xuất: </span>
                    <InlineInput 
                        value={snapshot.year} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('vehicle_snapshot', 'year', val)}
                    />
                </div>
                <div>
                    <span className="font-medium">Số khung (VIN): </span>
                    <InlineInput 
                        value={snapshot.vin} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('vehicle_snapshot', 'vin', val)}
                    />
                </div>
                <div>
                    <span className="font-medium">Số máy: </span>
                    <InlineInput 
                        value={snapshot.engine_number} 
                        isEditMode={isEditMode} 
                        onChange={(val) => onChange('vehicle_snapshot', 'engine_number', val)}
                    />
                </div>
            </div>
            <p className="mt-2 italic">Lưu ý: Chất lượng xe theo tiêu chuẩn của nhà sản xuất.</p>
        </div>
    );
};
