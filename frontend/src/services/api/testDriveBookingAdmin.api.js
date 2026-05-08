import { GLOBAL_TEST_DRIVES } from '../mock/globalTestDrive.mock';
import { getAdminProducts } from './adminProduct.api';
import { mockStaffData } from '../../pages/Admin/Staff/data/mockStaffData';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const bookingApi = {
    fetchBookings: async (filters = {}) => {
        const { page = 1, pageSize = 10, ...otherFilters } = filters;
        let realCars = [];
        try {
            const carsResponse = await getAdminProducts({ pageSize: 1000 });
            realCars = carsResponse.products || [];
        } catch (error) {
            console.error("Failed to fetch real cars for Test Drive bookings:", error);
        }

        await new Promise((resolve) => setTimeout(resolve, 600));

        let data = GLOBAL_TEST_DRIVES.map(booking => {
            const matchedCar = realCars.find(car => car.sku === booking.targetCarSku);
            return {
                ...booking,
                targetCar: matchedCar || null
            };
        });

        if (filters.search) {
            const term = filters.search.toLowerCase();
            data = data.filter(b => b.fullName.toLowerCase().includes(term) || b.phoneNumber.includes(term));
        }

        if (filters.status && filters.status !== 'all') {
            data = data.filter(b => b.status === filters.status);
        }

        if (filters.type && filters.type !== 'all') {
            data = data.filter(b => b.bookingType === filters.type);
        }

        if (filters.date) {
            data = data.filter(b => b.selectedDate === filters.date);
        }

        const stats = data.reduce((acc, b) => {
            acc.total += 1;
            if (b.status === 'Pending') acc.pending += 1;
            if (b.bookingType === 'home') acc.home += 1;
            if (b.bookingType === 'showroom') acc.showroom += 1;
            return acc;
        }, { total: 0, pending: 0, home: 0, showroom: 0 });

        data.sort((a, b) => {
            const dateA = dayjs(a.selectedDate, 'DD/MM/YYYY');
            const dateB = dayjs(b.selectedDate, 'DD/MM/YYYY');

            if (dateA.isBefore(dateB)) return -1;
            if (dateA.isAfter(dateB)) return 1;

            const timeA = a.selectedTimeSlot ? a.selectedTimeSlot.split(' - ')[0] : '00:00';
            const timeB = b.selectedTimeSlot ? b.selectedTimeSlot.split(' - ')[0] : '00:00';
            return timeA.localeCompare(timeB);
        });

        // 3. Paginate
        const totalItems = data.length;
        const startIndex = (page - 1) * pageSize;
        const paginatedData = data.slice(startIndex, startIndex + pageSize);

        // 4. Return RESTful structure
        return {
            data: paginatedData,
            stats,
            pagination: {
                current: page,
                pageSize: pageSize,
                total: totalItems
            }
        };
    },

    fetchSalesStaff: async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        // Lấy danh sách nhân viên có role là SALES_EXECUTIVE
        return mockStaffData.filter(staff => staff.role === 'SALES_EXECUTIVE' && staff.status === 'ACTIVE');
    },

    assignBookingToStaff: async (bookingId, staffId, priority, note) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const bookingIndex = GLOBAL_TEST_DRIVES.findIndex(b => b._id === bookingId);
        if (bookingIndex === -1) throw new Error("Booking not found");

        const staff = mockStaffData.find(s => s._id === staffId);
        if (!staff) throw new Error("Staff not found");

        const booking = GLOBAL_TEST_DRIVES[bookingIndex];
        booking.status = "Confirmed";
        booking.assignedStaff = {
            _id: staff._id,
            name: staff.fullName,
            avatar: staff.avatarUrl
        };

        let targetCarName = booking.targetCarSku;
        try {
            const carsResponse = await getAdminProducts({ pageSize: 1000 });
            const matchedCar = carsResponse.products?.find(car => car.sku === booking.targetCarSku);
            if (matchedCar) {
                targetCarName = matchedCar.name;
            }
        } catch (error) {
            console.error("Failed to fetch car info for task creation:", error);
        }

        let calculatedPriority = priority || 'MEDIUM';
        if (!priority) {
            if (booking.bookingType === 'home') {
                calculatedPriority = 'HIGH'; // Tại nhà thường quan trọng và tốn thời gian hơn
            }
            if (booking.note && booking.note.toLowerCase().includes('vip')) {
                calculatedPriority = 'URGENT';
            }
        }

        const newTask = {
            id: `LD-${Math.floor(100 + Math.random() * 900)}`,
            title: `Lịch lái thử xe ${targetCarName} (${booking.fullName.split(' ').pop()})`,
            priority: calculatedPriority,
            sla: calculatedPriority === 'URGENT' ? '30m' : 'Mới',
            vehicleModel: targetCarName,
            licensePlate: `${Math.floor(10 + Math.random() * 90)}LD-${Math.floor(100 + Math.random() * 900)}.${Math.floor(10 + Math.random() * 90)} (Demo)`,
            customerName: booking.fullName,
            customerPhone: booking.phoneNumber,
            appointmentDate: booking.selectedDate || dayjs().format('DD/MM/YYYY'),
            appointmentTime: booking.selectedTimeSlot ? booking.selectedTimeSlot.split(' - ')[0] : '00:00',
            description: note || booking.note || 'Điều phối từ Dispatch Board',
            locationType: booking.bookingType === 'home' ? 'HOME' : 'SHOWROOM',
            address: booking.bookingType === 'home' ? [booking.addressDetail, booking.ward, booking.district, booking.city].filter(Boolean).join(', ') : ''
        };

        if (!staff.performance.kanban.todo) staff.performance.kanban.todo = [];
        staff.performance.kanban.todo.unshift(newTask);

        return { success: true, booking, task: newTask };
    }
};
