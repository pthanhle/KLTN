export const mockStaffData = [
    // --- QUẢN ĐỐC / TRƯỞNG BỘ PHẬN ---
    {
        _id: '60d5ecb8b392d700153528a1',
        employeeId: 'MGR-001',
        fullName: 'Nguyễn Đình Trọng',
        email: 'trongnd@ttvelocity.com',
        phone: '+84 905450716',
        joinDate: '2019-09-23',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'SHOP_FOREMAN',
        department: 'Service Center',
        status: 'ACTIVE',
        baseSalary: 25000000,
        kpiType: 'SALARY_ONLY',
        kpiValue: 0,
        isOvertimeEligible: true,
        accessLevel: 'STANDARD_USER',
        lastLogin: '2026-05-06T08:30:00Z',
        performance: {
            kpis: {
                revenue: { current: 5200000000, target: 5000000000 },
                csat: { score: 4.8, totalReviews: 320, percentile: "Top 5% Regional" },
                efficiency: { billed: 1250, clocked: 1100, rate: 113 },
                rework: { rate: 1.2, trend: -0.5 }
            },
            kanban: {
                todo: [
                    { id: 'RO-300', title: 'Khám xe: Động cơ kêu lạ (CR-V)', priority: 'URGENT', sla: '1h', customerName: 'Nguyễn Văn A', licensePlate: '51G-123.45', customerPhone: '0977088308', vehicleModel: 'Honda CR-V', appointmentTime: '12:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' } ,
                    { id: 'RO-304', title: 'Kiểm tra hồ sơ bảo hành thước lái', priority: 'MEDIUM', sla: '2h', customerName: 'Hoàng Minh Bình', licensePlate: '43G-803.92', customerPhone: '0869574013', vehicleModel: 'Kia Sorento', appointmentTime: '15:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                inProgress: [
                    { id: 'RO-301', title: 'Giám sát đại tu gầm Porsche Macan', priority: 'HIGH', sla: 'Ongoing', progress: 50, customerName: 'Bùi Hữu Đạt', licensePlate: '65G-601.24', customerPhone: '0985844302', vehicleModel: 'Porsche Macan', appointmentTime: '10:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                done: [
                    { id: 'RO-299', title: 'QA xe xuất xưởng BMW 320i', priority: 'HIGH', billed: '0.5h', customerName: 'Lý Xuân Dũng', licensePlate: '30H-391.93', customerPhone: '0934692512', vehicleModel: 'BMW 320i', appointmentTime: '11:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  ,
                    { id: 'RO-298', title: 'Test drive sau đại tu hộp số', priority: 'MEDIUM', billed: '1.0h', customerName: 'Đặng Thu Tùng', licensePlate: '60G-964.76', customerPhone: '0897376291', vehicleModel: 'Mazda 3', appointmentTime: '10:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ]
            }
        }
    },
    // --- CỐ VẤN DỊCH VỤ 1 ---
    {
        _id: '60d5ecb8b392d700153528a2',
        employeeId: 'ADV-012',
        fullName: 'Trần Minh Quân',
        email: 'quantm@ttvelocity.com',
        phone: '+84 902891738',
        joinDate: '2023-05-12',
        avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
        role: 'SERVICE_ADVISOR',
        department: 'Customer Service',
        status: 'ACTIVE',
        baseSalary: 12000000,
        kpiType: 'COMMISSION',
        kpiValue: 3.5,
        isOvertimeEligible: true,
        accessLevel: 'STANDARD_USER',
        lastLogin: '2026-05-06T08:30:00Z',
        performance: {
            kpis: {
                revenue: { current: 120000000, target: 150000000 },
                csat: { score: 4.8, totalReviews: 124, percentile: "Top 5% Regional" },
                efficiency: null,
                rework: null
            },
            kanban: {
                todo: [
                    { id: 'RO-101', title: 'Booking: Khách VIP mang xe tới bảo dưỡng 5000km', priority: 'HIGH', sla: '2h', customerName: 'Lê Trần B', licensePlate: '51H-999.99', customerPhone: '0981400819', vehicleModel: 'BMW 320i', appointmentTime: '11:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' } ,
                    { id: 'RO-108', title: 'Tiếp nhận xe Mazda 3 bị tai nạn nhẹ', priority: 'MEDIUM', sla: '4h', customerName: 'Bùi Thu Đạt', licensePlate: '60H-787.62', customerPhone: '0987108871', vehicleModel: 'Mazda 3', appointmentTime: '12:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                inProgress: [
                    { id: 'RO-105', title: 'Báo giá đại tu gầm Honda City chờ khách duyệt', priority: 'HIGH', sla: '45m Remaining', progress: 65, customerName: 'Nguyễn Quang Dũng', licensePlate: '51F-674.65', customerPhone: '0978507283', vehicleModel: 'Honda City', appointmentTime: '10:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  ,
                    { id: 'RO-106', title: 'Thương lượng bảo hiểm thân vỏ xe tai nạn', priority: 'HIGH', sla: '1h', progress: 40, customerName: 'Huỳnh Hữu Sơn', licensePlate: '29D-515.50', customerPhone: '0897484063', vehicleModel: 'Mazda 3', appointmentTime: '15:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                done: [
                    { id: 'RO-099', title: 'Đã thanh toán - Chờ giao xe SantaFe', priority: 'LOW', billed: 'N/A', customerName: 'Phạm Văn Hương', licensePlate: '61A-623.92', customerPhone: '0931077343', vehicleModel: 'Hyundai SantaFe', appointmentTime: '09:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  ,
                    { id: 'RO-097', title: 'Giải quyết khiếu nại xong - Gọi khách tới lấy xe', priority: 'HIGH', billed: 'N/A', customerName: 'Dương Thu Tùng', licensePlate: '51F-856.64', customerPhone: '0906127705', vehicleModel: 'Toyota Camry', appointmentTime: '16:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ]
            }
        }
    },
    // --- CỐ VẤN DỊCH VỤ 2 ---
    {
        _id: '60d5ecb8b392d700153528a3',
        employeeId: 'ADV-015',
        fullName: 'Lê Hoàng Ngọc Ngân',
        email: 'nganlhn@ttvelocity.com',
        phone: '+84 904194414',
        joinDate: '2021-07-27',
        avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'SERVICE_ADVISOR',
        department: 'Customer Service',
        status: 'ACTIVE',
        baseSalary: 12000000,
        kpiType: 'COMMISSION',
        kpiValue: 3.5,
        isOvertimeEligible: true,
        accessLevel: 'STANDARD_USER',
        lastLogin: '2026-05-06T08:30:00Z',
        performance: {
            kpis: {
                revenue: { current: 180000000, target: 150000000 },
                csat: { score: 4.9, totalReviews: 210, percentile: "Top 1% Regional" },
                efficiency: null,
                rework: null
            },
            kanban: {
                todo: [
                    { id: 'RO-112', title: 'Lên báo giá sơn dặm bảo hiểm Liberty', priority: 'HIGH', sla: '30m', customerName: 'Võ Hải Lan', licensePlate: '61F-143.88', customerPhone: '0975608664', vehicleModel: 'Mazda 3', appointmentTime: '09:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  ,
                    { id: 'RO-113', title: 'Tiếp nhận xe độ mâm thể thao', priority: 'LOW', sla: '4h', customerName: 'Đỗ Văn Hương', licensePlate: '60A-811.61', customerPhone: '0912394741', vehicleModel: 'Mercedes C200', appointmentTime: '14:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                inProgress: [
                    { id: 'RO-110', title: 'Gửi báo giá gói phủ Ceramic - Chờ khách rep', priority: 'MEDIUM', sla: '2h', progress: 30, customerName: 'Hồ Ngọc Dũng', licensePlate: '51H-770.80', customerPhone: '0866015877', vehicleModel: 'Ford Everest', appointmentTime: '11:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                done: [
                    { id: 'RO-102', title: 'Giao xe khách VIP (Porsche 911)', priority: 'HIGH', billed: 'N/A', customerName: 'Nguyễn Anh Dũng', licensePlate: '60D-133.55', customerPhone: '0906249396', vehicleModel: 'Porsche 911', appointmentTime: '10:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ]
            }
        }
    },
    // --- KINH DOANH (SALES) 1 ---
    {
        _id: '60d5ecb8b392d700153528a4',
        employeeId: 'SLS-089',
        fullName: 'Phạm Thị Lan Anh',
        email: 'anhptl@ttvelocity.com',
        phone: '+84 906239054',
        joinDate: '2018-01-03',
        avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
        role: 'SALES_EXECUTIVE',
        department: 'Showroom Floor',
        status: 'ACTIVE',
        baseSalary: 8000000,
        kpiType: 'COMMISSION',
        kpiValue: 2.5,
        isOvertimeEligible: true,
        accessLevel: 'STANDARD_USER',
        lastLogin: '2026-05-06T08:30:00Z',
        performance: {
            kpis: {
                revenue: { current: 3500000000, target: 4000000000 },
                csat: { score: 4.6, totalReviews: 45, percentile: "Top 20%" },
                efficiency: null,
                rework: null
            },
            kanban: {
                todo: [
                    { id: 'LD-881', title: 'Lịch lái thử xe CR-V (Anh Tuấn)', priority: 'URGENT', sla: '2h', customerName: 'Phạm Anh Tuấn', customerPhone: '0897779937', vehicleModel: 'Honda CR-V', licensePlate: '51LD-123.45 (Demo)', appointmentTime: '14:00', description: 'Khách VIP. Vui lòng chuẩn bị sẵn sàng.', locationType: 'HOME', address: 'Khu biệt thự Chateau, Quận 7, TP.HCM' } ,
                    { id: 'LD-883', title: 'Setup lịch lái thử GLC 300 cuối tuần', priority: 'MEDIUM', sla: '24h', customerName: 'Hoàng Thu Hoa', licensePlate: '43C-131.56', customerPhone: '0867538723', vehicleModel: 'Mercedes GLC 300', appointmentTime: '11:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                inProgress: [
                    { id: 'CS-102', taskType: 'CHAT', title: 'Tư vấn giá lăn bánh Honda CR-V', priority: 'HIGH', sla: '12:05', progress: 50, customerName: 'Hoàng Minh', customerPhone: '0909123456', vehicleModel: 'Honda CR-V', isBlinking: true, description: 'Khách hàng quan tâm giá lăn bánh tại HN.', chatLogs: [ { sender: 'customer', time: '10:00', text: 'Chào bạn, mình đang quan tâm dòng CR-V bản L, nhờ bạn tư vấn.' }, { sender: 'staff', time: '10:01', text: 'Dạ em chào anh Minh. Cảm ơn anh đã quan tâm đến dòng xe CR-V ạ.' }, { sender: 'customer', time: '10:02', text: 'Bản L hiện tại lăn bánh ở HN là bao nhiêu? Có chương trình khuyến mãi gì không bạn?' }, { sender: 'staff', time: '10:03', text: 'Dạ hiện tại CR-V bản L đang được hỗ trợ 100% lệ phí trước bạ. Em gửi anh bảng chiết tính chi tiết nhé.' } ] },
                    { id: 'LD-870', title: 'Gửi báo giá lăn bánh Ford Everest', priority: 'HIGH', sla: '1d', progress: 90, customerName: 'Bùi Minh Sơn', licensePlate: '65H-278.50', customerPhone: '0988409915', vehicleModel: 'Ford Everest', appointmentTime: '10:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  ,
                    { id: 'LD-871', title: 'Thương lượng chốt giá bán Tucson', priority: 'HIGH', sla: '4h', progress: 60, customerName: 'Ngô Văn Nam', licensePlate: '30F-929.52', customerPhone: '0988552732', vehicleModel: 'Hyundai Tucson', appointmentTime: '09:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                done: [
                    { id: 'LD-865', title: 'Đã thu cọc - Chờ giao xe Civic RS', priority: 'LOW', billed: 'N/A', customerName: 'Vũ Thanh Bình', licensePlate: '30D-690.74', customerPhone: '0894317041', vehicleModel: 'Honda Civic', appointmentTime: '16:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  ,
                    { id: 'LD-864', title: 'Ký hợp đồng Peugeot 3008 thành công', priority: 'MEDIUM', billed: 'N/A', customerName: 'Phan Thanh Hương', licensePlate: '30A-308.23', customerPhone: '0899777036', vehicleModel: 'Peugeot 3008', appointmentTime: '15:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ]
            }
        }
    },
    // --- KINH DOANH (SALES) 2 ---
    {
        _id: '60d5ecb8b392d700153528a5',
        employeeId: 'SLS-092',
        fullName: 'Vũ Đức Duy',
        email: 'duyvd@ttvelocity.com',
        phone: '+84 901575965',
        joinDate: '2023-12-23',
        avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
        role: 'SALES_EXECUTIVE',
        department: 'Showroom Floor',
        status: 'ACTIVE',
        baseSalary: 8000000,
        kpiType: 'COMMISSION',
        kpiValue: 2.5,
        isOvertimeEligible: true,
        accessLevel: 'STANDARD_USER',
        lastLogin: '2026-05-06T08:30:00Z',
        performance: {
            kpis: {
                revenue: { current: 500000000, target: 2000000000 },
                csat: { score: 4.0, totalReviews: 12, percentile: "Bottom 30%" },
                efficiency: null,
                rework: null
            },
            kanban: { 
                todo: [], 
                inProgress: [], 
                done: [
                    { id: 'LD-700', title: 'Ký hợp đồng Vios G trước khi nghỉ phép', priority: 'HIGH', billed: 'N/A', customerName: 'Lý Văn Nhung', licensePlate: '61G-997.69', customerPhone: '0868462307', vehicleModel: 'Toyota Vios', appointmentTime: '15:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ] 
            }
        }
    },
    // --- LEAD KỸ THUẬT VIÊN ---
    {
        _id: '60d5ecb8b392d700153528a6',
        employeeId: 'TEC-042',
        fullName: 'Đặng Thái Sơn',
        email: 'sondt@ttvelocity.com',
        phone: '+84 905291502',
        joinDate: '2019-02-07',
        avatarUrl: 'https://randomuser.me/api/portraits/men/78.jpg',
        role: 'LEAD_TECHNICIAN',
        department: 'Repair Workshop',
        status: 'ACTIVE',
        baseSalary: 15000000,
        kpiType: 'FLAT_RATE',
        kpiValue: 250000,
        isOvertimeEligible: true,
        accessLevel: 'STANDARD_USER',
        lastLogin: '2026-05-06T08:30:00Z',
        performance: {
            kpis: {
                revenue: null,
                csat: { score: 4.5, totalReviews: 89, percentile: "Top 15%" }, 
                efficiency: { billed: 185, clocked: 160, rate: 115 },
                rework: { rate: 2.1, trend: -0.4 } 
            },
            kanban: {
                todo: [
                    { id: 'RO-201', title: 'Khám xe & Lên Checklist lỗi hộp số C200', priority: 'HIGH', sla: '24h', customerName: 'Đỗ C', licensePlate: '30A-555.55', customerPhone: '0898659819', vehicleModel: 'Mercedes C200', appointmentTime: '08:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' } ,
                    { id: 'RO-205', title: 'Đọc lỗi chuyên sâu hệ thống điện Camry', priority: 'HIGH', sla: '4h', customerName: 'Hồ Minh Linh', licensePlate: '60H-476.15', customerPhone: '0934538387', vehicleModel: 'Toyota Camry', appointmentTime: '09:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                inProgress: [
                    { id: 'RO-195', title: 'Đang tháo cụm lốc điều hoà \u0026 nạp gas', priority: 'MEDIUM', sla: '2h Remaining', progress: 80, customerName: 'Vũ Tuấn Bình', licensePlate: '29F-541.27', customerPhone: '0902346889', vehicleModel: 'Mazda 3', appointmentTime: '11:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                done: [
                    { id: 'RO-180', title: 'Hoàn thành bảo dưỡng mốc 4 vạn km', priority: 'LOW', billed: '4h', customerName: 'Bùi Anh Hoa', licensePlate: '43D-588.55', customerPhone: '0986010760', vehicleModel: 'Toyota Camry', appointmentTime: '14:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  ,
                    { id: 'RO-179', title: 'Thay xong bộ giảm xóc trước', priority: 'MEDIUM', billed: '2.5h', customerName: 'Lý Hữu Lan', licensePlate: '60G-120.30', customerPhone: '0983689256', vehicleModel: 'Porsche Macan', appointmentTime: '12:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ]
            }
        }
    },
    // --- KỸ THUẬT VIÊN THƯỜNG ---
    {
        _id: '60d5ecb8b392d700153528a7',
        employeeId: 'TEC-045',
        fullName: 'Bùi Quốc Tuấn',
        email: 'tuanbq@ttvelocity.com',
        phone: '+84 901913787',
        joinDate: '2019-09-17',
        avatarUrl: '', // Test fallback avatar
        role: 'TECHNICIAN',
        department: 'Repair Workshop',
        status: 'ACTIVE',
        baseSalary: 9000000,
        kpiType: 'FLAT_RATE',
        kpiValue: 180000,
        isOvertimeEligible: true,
        accessLevel: 'STANDARD_USER',
        lastLogin: '2026-05-06T08:30:00Z',
        performance: {
            kpis: {
                revenue: null,
                csat: null,
                efficiency: { billed: 120, clocked: 160, rate: 75 }, 
                rework: { rate: 5.5, trend: 1.2 } 
            },
            kanban: {
                todo: [
                    { id: 'RO-250', title: 'Đo phanh & Checklist gầm trước', priority: 'MEDIUM', sla: '4h', customerName: 'Hồ Anh Bình', licensePlate: '61H-995.92', customerPhone: '0913563003', vehicleModel: 'BMW 320i', appointmentTime: '14:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                inProgress: [
                    { id: 'RO-249', title: 'Đang xử lý tiếng kêu gầm bất thường (Rework)', priority: 'HIGH', sla: 'Overdue', progress: 20, customerName: 'Ngô Minh Đạt', licensePlate: '29F-772.26', customerPhone: '0911483892', vehicleModel: 'Toyota Camry', appointmentTime: '10:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                done: [
                    { id: 'RO-240', title: 'Thay nhớt xong - Chờ QA', priority: 'LOW', billed: '0.5h', customerName: 'Lê Văn Nhung', licensePlate: '29D-613.77', customerPhone: '0974970463', vehicleModel: 'Mercedes C200', appointmentTime: '10:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ]
            }
        }
    },
    // --- KỸ THUẬT ĐỒNG SƠN ---
    {
        _id: '60d5ecb8b392d700153528a8',
        employeeId: 'TEC-048',
        fullName: 'Lý Quốc Đạt',
        email: 'datlq@ttvelocity.com',
        phone: '+84 905093954',
        joinDate: '2020-07-20',
        avatarUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
        role: 'TECHNICIAN',
        department: 'Body & Paint',
        status: 'ACTIVE',
        baseSalary: 9000000,
        kpiType: 'FLAT_RATE',
        kpiValue: 180000,
        isOvertimeEligible: true,
        accessLevel: 'STANDARD_USER',
        lastLogin: '2026-05-06T08:30:00Z',
        performance: {
            kpis: {
                revenue: null,
                csat: null,
                efficiency: { billed: 190, clocked: 160, rate: 118 },
                rework: { rate: 0.5, trend: -0.1 }
            },
            kanban: {
                todo: [
                    { id: 'BP-101', title: 'Khám xe: Trầy xước cản trước', priority: 'LOW', sla: '8h', customerName: 'Hồ Hữu Hùng', licensePlate: '65C-535.78', customerPhone: '0907293306', vehicleModel: 'Toyota Camry', appointmentTime: '09:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                inProgress: [
                    { id: 'BP-099', title: 'Đang gò nóc xe do đá rơi', priority: 'HIGH', sla: '2d', progress: 40, customerName: 'Bùi Đức Hương', licensePlate: '65A-883.75', customerPhone: '0862062661', vehicleModel: 'Mazda 3', appointmentTime: '12:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  ,
                    { id: 'BP-100', title: 'Đang chuẩn bị bề mặt \u0026 bả matit', priority: 'MEDIUM', sla: '4h', progress: 70, customerName: 'Lý Ngọc Hương', licensePlate: '43D-587.14', customerPhone: '0892474546', vehicleModel: 'Ford Everest', appointmentTime: '13:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                done: [
                    { id: 'BP-095', title: 'Đánh bóng xong - Chờ QA xuất xưởng', priority: 'LOW', billed: '3h', customerName: 'Nguyễn Văn Bình', licensePlate: '43G-651.29', customerPhone: '0869230938', vehicleModel: 'BMW 320i', appointmentTime: '09:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ]
            }
        }
    },
    // --- KHO ---
    {
        _id: '60d5ecb8b392d700153528a9',
        employeeId: 'INV-112',
        fullName: 'Đỗ Tiến Huy',
        email: 'huydt@ttvelocity.com',
        phone: '+84 909784467',
        joinDate: '2019-01-23',
        avatarUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
        role: 'INVENTORY_MGR',
        department: 'Logistics',
        status: 'ACTIVE',
        baseSalary: 14000000,
        kpiType: 'SALARY_ONLY',
        kpiValue: 0,
        isOvertimeEligible: true,
        accessLevel: 'STANDARD_USER',
        lastLogin: '2026-05-06T08:30:00Z',
        performance: {
            kpis: {
                revenue: null, csat: null, efficiency: null, rework: null, inventoryAccuracy: { score: 99.8, target: 99.0 }, avgSla: { time: 1.2, unit: 'h' }
            },
            kanban: {
                todo: [
                    { id: 'PO-551', title: 'Web Order: Khách đặt lốp Michelin', priority: 'HIGH', sla: '2h', customerName: 'Dương Hữu Lan', licensePlate: '60H-573.17', customerPhone: '0938032966', vehicleModel: 'Porsche Macan', appointmentTime: '13:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  ,
                    { id: 'PO-552', title: 'Yêu cầu phụ tùng: Lọc dầu cho RO-105', priority: 'HIGH', sla: '1h', customerName: 'Trần Đức Nam', licensePlate: '61D-864.99', customerPhone: '0864137866', vehicleModel: 'BMW 320i', appointmentTime: '14:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                inProgress: [
                    { id: 'IV-220', title: 'Đang đóng gói lốp gửi Viettel Post', priority: 'MEDIUM', sla: '1d', progress: 60, customerName: 'Bùi Minh Hùng', licensePlate: '61A-906.89', customerPhone: '0971484108', vehicleModel: 'Toyota Camry', appointmentTime: '09:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                done: [
                    { id: 'IV-210', title: 'Đã xuất 4 lốp xe cho KTV (RO-099)', priority: 'HIGH', billed: 'N/A', customerName: 'Hồ Ngọc Hoa', licensePlate: '29H-404.65', customerPhone: '0917007398', vehicleModel: 'Mercedes C200', appointmentTime: '09:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ]
            }
        }
    },
    // --- KẾ TOÁN/THU NGÂN ---
    {
        _id: '60d5ecb8b392d700153528b0',
        employeeId: 'ACC-004',
        fullName: 'Hồ Kim Phương',
        email: 'phuonghk@ttvelocity.com',
        phone: '+84 909835428',
        joinDate: '2019-06-13',
        avatarUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
        role: 'CASHIER',
        department: 'Accounting',
        status: 'ACTIVE',
        baseSalary: 11000000,
        kpiType: 'SALARY_ONLY',
        kpiValue: 0,
        isOvertimeEligible: true,
        accessLevel: 'STANDARD_USER',
        lastLogin: '2026-05-06T08:30:00Z',
        performance: {
            kpis: {
                revenue: null, csat: null, efficiency: null, rework: null, transactionTime: { time: 4.5, unit: 'm' }, errorRate: { rate: 0.1 }
            },
            kanban: {
                todo: [
                    { id: 'INV-889', title: 'Xuất hoá đơn VAT điện tử RO-105', priority: 'HIGH', sla: '15m', customerName: 'Võ Thu Nhung', licensePlate: '30F-823.26', customerPhone: '0987028007', vehicleModel: 'Toyota Camry', appointmentTime: '10:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  ,
                    { id: 'INV-890', title: 'Đối soát công nợ bảo hiểm PVI', priority: 'HIGH', sla: '4h', customerName: 'Hồ Đức Hùng', licensePlate: '60A-427.68', customerPhone: '0984470216', vehicleModel: 'Kia Sorento', appointmentTime: '09:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                inProgress: [
                    { id: 'INV-885', title: 'Đang làm thủ tục hoàn cọc xe (LD-850)', priority: 'MEDIUM', sla: '2h', progress: 80, customerName: 'Lý Ngọc Tùng', licensePlate: '30F-480.42', customerPhone: '0897119764', vehicleModel: 'Honda CR-V', appointmentTime: '14:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ],
                done: [
                    { id: 'INV-888', title: 'Quyết toán quỹ tiền mặt hoàn tất', priority: 'HIGH', billed: 'N/A', customerName: 'Lý Xuân Hương', licensePlate: '61C-656.28', customerPhone: '0939276382', vehicleModel: 'Ford Everest', appointmentTime: '14:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  ,
                    { id: 'INV-887', title: 'Đã thu tiền mặt \u0026 quẹt thẻ RO-099', priority: 'HIGH', billed: 'N/A', customerName: 'Hồ Thanh Linh', licensePlate: '61F-877.55', customerPhone: '0861213502', vehicleModel: 'Ford Everest', appointmentTime: '14:00', description: 'Khách hàng hẹn đến đúng giờ. Vui lòng chuẩn bị sẵn sàng.' }  
                ]
            }
        }
    }
];

// Hàm giả lập POST API tạo nhân viên mới
export const addMockStaff = (newStaffData) => {
    // Generate a mock MongoDB ObjectId (24 hex characters)
    const generateObjectId = () => {
        const timestamp = (Math.floor(new Date().getTime() / 1000)).toString(16);
        const randomHex = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16));
        return timestamp + randomHex;
    };

    const newId = generateObjectId();
    const newEmployeeId = `STF-${Math.floor(100 + Math.random() * 900)}`;

    const newStaff = {
        _id: newId,
        employeeId: newEmployeeId,
        fullName: newStaffData.fullName,
        email: newStaffData.email,
        phone: newStaffData.phone,
        department: newStaffData.department,
        role: newStaffData.role,
        status: 'ACTIVE',
        joinDate: new Date().toISOString().split('T')[0],
        tenure: '0 Tháng',
        certifications: [],
        avatar: null,
        payroll: {
            baseSalary: 10000000, // Lương cơ bản mặc định
            kpiType: 'SALARY_ONLY',
            kpiValue: 0,
            allowOvertime: false
        },
        performance: {
            metrics: {},
            kanban: {
                todo: [],
                inProgress: [],
                done: []
            }
        }
    };

    mockStaffData.push(newStaff);
    return newStaff;
};
