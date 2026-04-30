export const mockStaffData = [
    // --- QUẢN ĐỐC / TRƯỞNG BỘ PHẬN ---
    {
        _id: '60d5ecb8b392d700153528a1',
        employeeId: 'MGR-001',
        fullName: 'Nguyễn Đình Trọng',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'SHOP_FOREMAN',
        department: 'Service Center',
        status: 'ACTIVE',
        baseSalary: 25000000,
        kpiType: 'SALARY_ONLY',
        kpiValue: 0
    },
    // --- CỐ VẤN DỊCH VỤ ---
    {
        _id: '60d5ecb8b392d700153528a2',
        employeeId: 'ADV-012',
        fullName: 'Trần Minh Quân',
        avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
        role: 'SERVICE_ADVISOR',
        department: 'Customer Service',
        status: 'ACTIVE',
        baseSalary: 12000000,
        kpiType: 'COMMISSION',
        kpiValue: 3.5
    },
    {
        _id: '60d5ecb8b392d700153528a3',
        employeeId: 'ADV-015',
        fullName: 'Lê Hoàng Ngọc Ngân',
        avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'SERVICE_ADVISOR',
        department: 'Customer Service',
        status: 'ACTIVE',
        baseSalary: 12000000,
        kpiType: 'COMMISSION',
        kpiValue: 3.5
    },
    // --- KINH DOANH (SALES) ---
    {
        _id: '60d5ecb8b392d700153528a4',
        employeeId: 'SLS-089',
        fullName: 'Phạm Thị Lan Anh',
        avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
        role: 'SALES_EXECUTIVE',
        department: 'Showroom Floor',
        status: 'ACTIVE',
        baseSalary: 8000000,
        kpiType: 'COMMISSION',
        kpiValue: 2.5
    },
    {
        _id: '60d5ecb8b392d700153528a5',
        employeeId: 'SLS-092',
        fullName: 'Vũ Đức Duy',
        avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
        role: 'SALES_EXECUTIVE',
        department: 'Showroom Floor',
        status: 'ON_LEAVE',
        baseSalary: 8000000,
        kpiType: 'COMMISSION',
        kpiValue: 2.5
    },
    // --- KỸ THUẬT VIÊN (TECHNICIANS) ---
    {
        _id: '60d5ecb8b392d700153528a6',
        employeeId: 'TEC-042',
        fullName: 'Đặng Thái Sơn',
        avatarUrl: 'https://randomuser.me/api/portraits/men/78.jpg',
        role: 'LEAD_TECHNICIAN',
        department: 'Repair Workshop',
        status: 'ACTIVE',
        baseSalary: 15000000,
        kpiType: 'FLAT_RATE',
        kpiValue: 250000 // 250k VNĐ / Billed Hour
    },
    {
        _id: '60d5ecb8b392d700153528a7',
        employeeId: 'TEC-045',
        fullName: 'Bùi Quốc Tuấn',
        avatarUrl: '', // Test fallback avatar
        role: 'TECHNICIAN',
        department: 'Repair Workshop',
        status: 'ACTIVE',
        baseSalary: 9000000,
        kpiType: 'FLAT_RATE',
        kpiValue: 180000
    },
    {
        _id: '60d5ecb8b392d700153528a8',
        employeeId: 'TEC-048',
        fullName: 'Lý Quốc Đạt',
        avatarUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
        role: 'TECHNICIAN',
        department: 'Body & Paint',
        status: 'ACTIVE',
        baseSalary: 9000000,
        kpiType: 'FLAT_RATE',
        kpiValue: 180000
    },
    // --- KHO & KẾ TOÁN ---
    {
        _id: '60d5ecb8b392d700153528a9',
        employeeId: 'INV-112',
        fullName: 'Đỗ Tiến Huy',
        avatarUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
        role: 'INVENTORY_MGR',
        department: 'Logistics',
        status: 'ACTIVE',
        baseSalary: 14000000,
        kpiType: 'SALARY_ONLY',
        kpiValue: 0
    },
    {
        _id: '60d5ecb8b392d700153528b0',
        employeeId: 'ACC-004',
        fullName: 'Hồ Kim Phương',
        avatarUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
        role: 'CASHIER',
        department: 'Accounting',
        status: 'ACTIVE',
        baseSalary: 11000000,
        kpiType: 'SALARY_ONLY',
        kpiValue: 0
    }
];
