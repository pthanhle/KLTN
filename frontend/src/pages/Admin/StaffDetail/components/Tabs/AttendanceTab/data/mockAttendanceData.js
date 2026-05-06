// Mô phỏng Database Collection `attendances`
// Schema chuẩn bị cho DB Model:
// staffId: ObjectId
// date: String (YYYY-MM-DD)
// shiftName: String
// clockIn: Date (ISO 8601)
// clockOut: Date (ISO 8601)
// status: Enum (ON_TIME, LATE, ABSENT, DAY_OFF)
// lateMinutes: Number
// method: String
// notes: String

export const generateMockAttendanceForStaff = (staffId, monthYear) => {
    // Để demo, chúng ta tạo một pattern dữ liệu chung cho bất kỳ nhân viên nào
    // Trong thực tế, BE sẽ query: db.attendances.find({ staffId, date: { $regex: monthYear } })
    
    // Fake Summary DB Aggregation
    const summary = {
        totalWorkDays: 22,
        targetDays: 26,
        lateDays: 2,
        overtimeHours: 8.5,
        attendanceScore: 95
    };

    const baseDateStr = monthYear || "2023-10"; // Ví dụ: "2023-10"
    
    // Danh sách bản ghi chấm công (Logs) chuẩn Schema DB
    const logs = [
        {
            _id: `ATT-${staffId}-01`,
            staffId: staffId,
            date: `${baseDateStr}-02`,
            shiftName: "Ca Hành Chính",
            clockIn: `${baseDateStr}-02T00:55:00Z`, // 07:55 AM (UTC+7)
            clockOut: `${baseDateStr}-02T10:05:00Z`, // 17:05 PM (UTC+7)
            status: "ON_TIME",
            lateMinutes: 0,
            method: "FaceID Kiosk",
            notes: null
        },
        {
            _id: `ATT-${staffId}-02`,
            staffId: staffId,
            date: `${baseDateStr}-03`,
            shiftName: "Ca Hành Chính",
            clockIn: `${baseDateStr}-03T01:15:00Z`, // 08:15 AM
            clockOut: `${baseDateStr}-03T10:30:00Z`, // 17:30 PM
            status: "LATE",
            lateMinutes: 15,
            method: "GPS Mobile App",
            notes: "Kẹt xe cầu Sài Gòn"
        },
        {
            _id: `ATT-${staffId}-03`,
            staffId: staffId,
            date: `${baseDateStr}-04`,
            shiftName: "Ca Hành Chính",
            clockIn: null,
            clockOut: null,
            status: "ABSENT",
            lateMinutes: null,
            method: null,
            notes: "Nghỉ phép không phép"
        },
        {
            _id: `ATT-${staffId}-04`,
            staffId: staffId,
            date: `${baseDateStr}-05`,
            shiftName: "Ca Hành Chính",
            clockIn: null,
            clockOut: null,
            status: "DAY_OFF",
            lateMinutes: null,
            method: null,
            notes: "Nghỉ phép năm (AL)"
        },
        {
            _id: `ATT-${staffId}-05`,
            staffId: staffId,
            date: `${baseDateStr}-06`,
            shiftName: "Ca Sáng",
            clockIn: `${baseDateStr}-06T22:50:00Z`, // 05:50 AM (UTC+7) của ngày hôm sau, nhưng dùng tạm logic
            clockOut: `${baseDateStr}-06T07:15:00Z`, // 14:15 PM
            status: "ON_TIME",
            lateMinutes: 0,
            method: "FaceID Kiosk",
            notes: "Đi sớm chuẩn bị giao xe"
        }
    ];

    return { summary, logs };
};
