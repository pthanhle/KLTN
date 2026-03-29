export const MOCK_PROFILE_CUSTOMER = {
    id: "65c2e10b923d",
    customer_code: "CUS-8866",
    username: "nguyenvana_tt",
    email: "customer@ttauto.com",
    full_name: "Nguyễn Văn A",
    phone: "0987 654 321",
    address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    avatar: "https://i.pravatar.cc/150?img=11",
    role: { role_name: "Customer" },
    status: "active",
    tier: "gold",
    total_spent: 45000000,
    debt: 0,
    createdAt: "2023-11-15T08:30:00Z",
    authProvider: "local",
};

export const MOCK_PROFILE_ADMIN = {
    id: "78a9c20b411d",
    username: "admin_vip",
    email: "admin@ttauto.vn",
    full_name: "Nguyễn Quản Trị",
    phone: "0909 111 222",
    address: "Trung tâm quản trị TT AUTO, TPHCM",
    avatar: "https://i.pravatar.cc/150?img=33",
    role: { role_name: "Admin" },
    status: "active",
    authProvider: "local",
    employeeInfo: {
        position: "Quản trị viên Hệ thống",
        salary: 45000000,
        hired_date: "2021-03-15"
    }
};
