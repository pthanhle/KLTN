import { Skeleton } from 'antd';

/**
 * Higher Order Function để Inject Skeleton loading vào các Columns của Antd Table.
 * @param {Array} baseColumns - Các cột chuẩn của bảng
 * @returns {Array} Columns đã được bọc logic Skeleton
 */
export const withSkeletonColumns = (baseColumns) => {
    return baseColumns.map(col => ({
        ...col,
        render: (value, record, index) => {
            if (record.isSkeleton) {
                // Tùy biến hình dạng Skeleton dựa trên dataIndex thực tế của Bảng Khách hàng
                if (col.dataIndex === 'customer') {
                    return (
                        <div className="flex items-center gap-3 py-1 animate-pulse">
                            <Skeleton.Avatar active size={42} />
                            <div className="flex flex-col gap-2">
                                <Skeleton.Input active size="small" style={{ width: 120, height: 16 }} />
                                <Skeleton.Input active size="small" style={{ width: 80, height: 12 }} />
                            </div>
                        </div>
                    );
                }
                
                if (col.dataIndex === 'tier' || col.dataIndex === 'status') {
                    return <Skeleton.Button active size="small" shape="round" style={{ width: 80, height: 24 }} />;
                }

                if (col.key === 'actions') {
                    return <div className="flex justify-center"><Skeleton.Button active size="small" shape="circle" /></div>;
                }

                // Các cột chữ/số chung
                return <Skeleton.Input active size="small" style={{ width: '80%', minWidth: 60, maxWidth: 100, height: 16 }} />;
            }

            // Fallback về render gốc nếu không phải đang loading
            return col.render ? col.render(value, record, index) : value;
        }
    }));
};

/**
 * Generate mảng data giả lập để vẽ các dòng Skeleton
 * @param {Number} length - Số dòng skeleton cần tạo
 */
export const generateSkeletonData = (length = 5) => {
    return Array.from({ length }).map((_, i) => ({ 
        id: `skeleton-${i}`, 
        isSkeleton: true 
    }));
};
