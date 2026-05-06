// Mô phỏng Database Collection `compliances`
// Database Schema thực tế sẽ có cấu trúc như sau và được truy vấn bằng staffId

const complianceDatabase = {
    // 1. Nguyễn Đình Trọng
    '60d5ecb8b392d700153528a1': {
        _id: 'COMP-60d5ecb8b392d700153528a1',
        staffId: '60d5ecb8b392d700153528a1',
        identity: {
            idNumber: "079092015882",
            issueDate: "2021-05-15",
            issuePlace: "Cục Cảnh sát QLHC về TTXH",
            dob: "1992-08-20",
            pob: "Hồ Chí Minh, Việt Nam",
            permanentAddress: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
            currentAddress: "45/2 Huỳnh Tấn Phát, Nhà Bè, TP.HCM"
        },
        financial: {
            bankAccount: "19035688201019",
            bankName: "Techcombank",
            bankBranch: "Chi nhánh Nam Sài Gòn",
            taxCode: "8521098311",
            insuranceCode: "7915201193"
        },
        emergency: {
            contactName: "Nguyễn Thị Ngọc Hân",
            relation: "Vợ",
            phone: "0901234567",
            address: "45/2 Huỳnh Tấn Phát, Nhà Bè, TP.HCM"
        }
    },
    // 2. Trần Minh Quân
    '60d5ecb8b392d700153528a2': {
        _id: 'COMP-60d5ecb8b392d700153528a2',
        staffId: '60d5ecb8b392d700153528a2',
        identity: {
            idNumber: "001095012345",
            issueDate: "2020-10-10",
            issuePlace: "Cục Cảnh sát QLHC về TTXH",
            dob: "1995-12-05",
            pob: "Hà Nội, Việt Nam",
            permanentAddress: "15 Lê Lợi, Quận 1, TP.HCM",
            currentAddress: "15 Lê Lợi, Quận 1, TP.HCM"
        },
        financial: {
            bankAccount: "0181003456789",
            bankName: "Vietcombank",
            bankBranch: "Hội sở chính",
            taxCode: "0102030405",
            insuranceCode: "7915202244"
        },
        emergency: {
            contactName: "Trần Minh Tâm",
            relation: "Bố",
            phone: "0987654321",
            address: "15 Lê Lợi, Quận 1, TP.HCM"
        }
    },
    // 3. Lê Hoàng Ngọc Ngân
    '60d5ecb8b392d700153528a3': {
        _id: 'COMP-60d5ecb8b392d700153528a3',
        staffId: '60d5ecb8b392d700153528a3',
        identity: {
            idNumber: "079198056789",
            issueDate: "2022-01-20",
            issuePlace: "Cục Cảnh sát QLHC về TTXH",
            dob: "1998-03-15",
            pob: "Đà Nẵng, Việt Nam",
            permanentAddress: "88 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
            currentAddress: "12/4 Nguyễn Đình Chiểu, Quận 3, TP.HCM"
        },
        financial: {
            bankAccount: "889900112233",
            bankName: "MB Bank",
            bankBranch: "Chi nhánh Đông Sài Gòn",
            taxCode: "0314567890",
            insuranceCode: "7915203355"
        },
        emergency: {
            contactName: "Lê Văn Hải",
            relation: "Anh trai",
            phone: "0912345678",
            address: "88 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM"
        }
    },
    // 4. Phạm Thị Lan Anh
    '60d5ecb8b392d700153528a4': {
        _id: 'COMP-60d5ecb8b392d700153528a4',
        staffId: '60d5ecb8b392d700153528a4',
        identity: {
            idNumber: "079194098765",
            issueDate: "2019-11-11",
            issuePlace: "Cục Cảnh sát QLHC về TTXH",
            dob: "1994-07-22",
            pob: "Đồng Nai, Việt Nam",
            permanentAddress: "Khu dân cư Thăng Long, Biên Hòa, Đồng Nai",
            currentAddress: "Chung cư Vinhomes Central Park, Bình Thạnh, TP.HCM"
        },
        financial: {
            bankAccount: "060123456789",
            bankName: "Sacombank",
            bankBranch: "Chi nhánh Tân Bình",
            taxCode: "0405060708",
            insuranceCode: "7915204466"
        },
        emergency: {
            contactName: "Phạm Hữu Phước",
            relation: "Bố",
            phone: "0934567890",
            address: "Khu dân cư Thăng Long, Biên Hòa, Đồng Nai"
        }
    },
    // 5. Vũ Đức Duy
    '60d5ecb8b392d700153528a5': {
        _id: 'COMP-60d5ecb8b392d700153528a5',
        staffId: '60d5ecb8b392d700153528a5',
        identity: {
            idNumber: "079090011223",
            issueDate: "2018-05-05",
            issuePlace: "Cục Cảnh sát QLHC về TTXH",
            dob: "1990-11-30",
            pob: "Hải Phòng, Việt Nam",
            permanentAddress: "Số 5 Trần Phú, Quận 5, TP.HCM",
            currentAddress: "Số 5 Trần Phú, Quận 5, TP.HCM"
        },
        financial: {
            bankAccount: "1122334455",
            bankName: "ACB",
            bankBranch: "Chi nhánh Chợ Lớn",
            taxCode: "0506070809",
            insuranceCode: "7915205577"
        },
        emergency: {
            contactName: "Trần Thị Bé",
            relation: "Mẹ",
            phone: "0945678901",
            address: "Số 5 Trần Phú, Quận 5, TP.HCM"
        }
    },
    // 6. Đặng Thái Sơn
    '60d5ecb8b392d700153528a6': {
        _id: 'COMP-60d5ecb8b392d700153528a6',
        staffId: '60d5ecb8b392d700153528a6',
        identity: {
            idNumber: "079188033445",
            issueDate: "2021-02-28",
            issuePlace: "Cục Cảnh sát QLHC về TTXH",
            dob: "1988-02-14",
            pob: "Nghệ An, Việt Nam",
            permanentAddress: "100/2A Nguyễn Đình Chiểu, Quận 3, TP.HCM",
            currentAddress: "100/2A Nguyễn Đình Chiểu, Quận 3, TP.HCM"
        },
        financial: {
            bankAccount: "1010101010",
            bankName: "BIDV",
            bankBranch: "Chi nhánh Sở giao dịch 2",
            taxCode: "0607080910",
            insuranceCode: "7915206688"
        },
        emergency: {
            contactName: "Đặng Thị Thảo",
            relation: "Chị gái",
            phone: "0956789012",
            address: "100/2A Nguyễn Đình Chiểu, Quận 3, TP.HCM"
        }
    },
    // 7. Bùi Quốc Tuấn
    '60d5ecb8b392d700153528a7': {
        _id: 'COMP-60d5ecb8b392d700153528a7',
        staffId: '60d5ecb8b392d700153528a7',
        identity: {
            idNumber: "079093055667",
            issueDate: "2023-08-10",
            issuePlace: "Cục Cảnh sát QLHC về TTXH",
            dob: "1993-09-09",
            pob: "Thanh Hóa, Việt Nam",
            permanentAddress: "44 Lý Thường Kiệt, Quận 10, TP.HCM",
            currentAddress: "44 Lý Thường Kiệt, Quận 10, TP.HCM"
        },
        financial: {
            bankAccount: "9988776655",
            bankName: "VPBank",
            bankBranch: "Chi nhánh Quận 10",
            taxCode: "0708091011",
            insuranceCode: "7915207799"
        },
        emergency: {
            contactName: "Lê Thị Mai",
            relation: "Vợ",
            phone: "0967890123",
            address: "44 Lý Thường Kiệt, Quận 10, TP.HCM"
        }
    },
    // 8. Lý Quốc Đạt
    '60d5ecb8b392d700153528a8': {
        _id: 'COMP-60d5ecb8b392d700153528a8',
        staffId: '60d5ecb8b392d700153528a8',
        identity: {
            idNumber: "079097077889",
            issueDate: "2020-04-04",
            issuePlace: "Cục Cảnh sát QLHC về TTXH",
            dob: "1997-01-01",
            pob: "Bình Dương, Việt Nam",
            permanentAddress: "Khu phố 2, Phường Phú Hòa, Thủ Dầu Một, Bình Dương",
            currentAddress: "68 Nguyễn Xí, Bình Thạnh, TP.HCM"
        },
        financial: {
            bankAccount: "3344556677",
            bankName: "TPBank",
            bankBranch: "Chi nhánh Bình Thạnh",
            taxCode: "0809101112",
            insuranceCode: "7915208800"
        },
        emergency: {
            contactName: "Lý Văn Phát",
            relation: "Bố",
            phone: "0978901234",
            address: "Khu phố 2, Phường Phú Hòa, Thủ Dầu Một, Bình Dương"
        }
    },
    // 9. Đỗ Tiến Huy
    '60d5ecb8b392d700153528a9': {
        _id: 'COMP-60d5ecb8b392d700153528a9',
        staffId: '60d5ecb8b392d700153528a9',
        identity: {
            idNumber: "079085099001",
            issueDate: "2019-06-15",
            issuePlace: "Cục Cảnh sát QLHC về TTXH",
            dob: "1985-10-10",
            pob: "Long An, Việt Nam",
            permanentAddress: "220/1 Xô Viết Nghệ Tĩnh, Quận Bình Thạnh, TP.HCM",
            currentAddress: "220/1 Xô Viết Nghệ Tĩnh, Quận Bình Thạnh, TP.HCM"
        },
        financial: {
            bankAccount: "5566778899",
            bankName: "VIB",
            bankBranch: "Chi nhánh Xô Viết Nghệ Tĩnh",
            taxCode: "0910111213",
            insuranceCode: "7915209911"
        },
        emergency: {
            contactName: "Nguyễn Thị Lệ",
            relation: "Vợ",
            phone: "0989012345",
            address: "220/1 Xô Viết Nghệ Tĩnh, Quận Bình Thạnh, TP.HCM"
        }
    },
    // 10. Hồ Kim Phương
    '60d5ecb8b392d700153528b0': {
        _id: 'COMP-60d5ecb8b392d700153528b0',
        staffId: '60d5ecb8b392d700153528b0',
        identity: {
            idNumber: "079192011223",
            issueDate: "2022-12-12",
            issuePlace: "Cục Cảnh sát QLHC về TTXH",
            dob: "1992-04-30",
            pob: "TP.HCM, Việt Nam",
            permanentAddress: "12A Võ Văn Tần, Quận 3, TP.HCM",
            currentAddress: "12A Võ Văn Tần, Quận 3, TP.HCM"
        },
        financial: {
            bankAccount: "7788990011",
            bankName: "Shinhan Bank",
            bankBranch: "Chi nhánh Trung Tâm",
            taxCode: "1011121314",
            insuranceCode: "7915200022"
        },
        emergency: {
            contactName: "Hồ Văn Long",
            relation: "Bố",
            phone: "0990123456",
            address: "12A Võ Văn Tần, Quận 3, TP.HCM"
        }
    }
};

export const generateMockComplianceForStaff = (staffId) => {
    // Lookup data dựa trên ID thực tế
    const staffData = complianceDatabase[staffId];

    // Nếu ID hợp lệ có data, trả về data thật của ID đó
    if (staffData) {
        return staffData;
    }

    // Fallback cho các staff ID ảo khác nếu có
    return {
        _id: `COMP-${staffId}`,
        staffId: staffId,
        identity: {
            idNumber: "000000000000",
            issueDate: "2000-01-01",
            issuePlace: "Hệ thống CSDL Quốc gia",
            dob: "1990-01-01",
            pob: "Chưa cập nhật",
            permanentAddress: "Chưa cập nhật",
            currentAddress: "Chưa cập nhật"
        },
        financial: {
            bankAccount: "0000000000",
            bankName: "Chưa cập nhật",
            bankBranch: "Chưa cập nhật",
            taxCode: "0000000000",
            insuranceCode: "0000000000"
        },
        emergency: {
            contactName: "Chưa cập nhật",
            relation: "Chưa cập nhật",
            phone: "0000000000",
            address: "Chưa cập nhật"
        }
    };
};

export const updateMockCompliance = (staffId, newComplianceData) => {
    if (complianceDatabase[staffId]) {
        complianceDatabase[staffId] = {
            ...complianceDatabase[staffId],
            ...(newComplianceData.identity && { identity: { ...complianceDatabase[staffId].identity, ...newComplianceData.identity } }),
            ...(newComplianceData.financial && { financial: { ...complianceDatabase[staffId].financial, ...newComplianceData.financial } }),
            ...(newComplianceData.emergency && { emergency: { ...complianceDatabase[staffId].emergency, ...newComplianceData.emergency } })
        };
        return complianceDatabase[staffId];
    }

    const newRecord = {
        _id: `COMP-${staffId}`,
        staffId: staffId,
        identity: newComplianceData.identity || {},
        financial: newComplianceData.financial || {},
        emergency: newComplianceData.emergency || {}
    };
    complianceDatabase[staffId] = newRecord;
    return newRecord;
};
