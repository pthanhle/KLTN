import { Wrench, Droplets, PenTool } from 'lucide-react';

export const mapServiceHistoryData = (record, t) => {
    // 1. Dịch vụ chi tiết
    const serviceName = record.services?.[0]?.service_name 
        || record.service_name 
        || t('adminCustomers:defaultServiceType', 'Dịch vụ Bảo dưỡng');

    // 2. Chi tiết xe
    const carName = record.vehicle_info 
        ? `${record.vehicle_info.brand} ${record.vehicle_info.model} (${record.vehicle_info.license_plate || 'No Plate'})` 
        : record.car_id || t('adminCustomers:defaultCar', 'Xe Nội Bộ');

    // 3. Phân loại dịch vụ (Category) khớp với field service_type của Booking
    // service_type DTO (MAINTENANCE, CAR_SPA, REPAIR)
    const categoryType = record.service_type || record.type || 'MAINTENANCE';
    
    let categoryLabel = '';
    let categoryIcon = null;
    let categoryColor = 'text-slate-500';
    let categoryBg = 'bg-slate-100';

    switch(categoryType) {
        case 'MAINTENANCE':
            categoryLabel = t('adminCustomers:typeMaintenance', 'Bảo dưỡng');
            categoryIcon = Wrench;
            categoryColor = 'text-blue-500';
            categoryBg = 'bg-blue-50 dark:bg-blue-500/10';
            break;
        case 'CAR_SPA':
            categoryLabel = t('adminCustomers:typeCarSpa', 'Chăm sóc xe');
            categoryIcon = Droplets;
            categoryColor = 'text-cyan-500';
            categoryBg = 'bg-cyan-50 dark:bg-cyan-500/10';
            break;
        case 'REPAIR':
            categoryLabel = t('adminCustomers:typeRepair', 'Sửa chữa');
            categoryIcon = PenTool;
            categoryColor = 'text-rose-500';
            categoryBg = 'bg-rose-50 dark:bg-rose-500/10';
            break;
        default:
            categoryLabel = categoryType;
            categoryIcon = Wrench;
            break;
    }

    // 4. Giá tiền
    const price = record.total_cost || record.price || 0;

    // 5. Cố vấn và ODO (Chuẩn hóa Schema BE DTO: 100% không dùng fallback)
    const advisor = record.advisor_info?.name || t('adminCustomers:unassigned', 'Chưa xếp');
    
    // DB Entity Odometer: vehicle_info.current_odometer
    const odoValue = record.vehicle_info?.current_odometer;

    const odometer = (odoValue !== undefined && odoValue !== null && !isNaN(odoValue))
        ? `${Number(odoValue).toLocaleString('vi-VN')} km` 
        : t('adminCustomers:noOdo', 'N/A');

    return {
        serviceName,
        carName,
        categoryLabel,
        CategoryIcon: categoryIcon,
        categoryColor,
        categoryBg,
        price,
        advisor,
        odometer
    };
};
