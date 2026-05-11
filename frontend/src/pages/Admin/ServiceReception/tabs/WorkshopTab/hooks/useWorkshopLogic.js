import { useState, useEffect } from 'react';
import { MOCK_SERVICE_BOOKINGS } from '../../../data/mockServiceBookings';
import { mockBays } from '../../../data/mockBays';
import { mockStaffData } from '../../../../Staff/data/mockStaffData';

export const useWorkshopLogic = (selectedDate) => {
    const [bookings, setBookings] = useState([]);
    const [bays, setBays] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeBooking, setActiveBooking] = useState(null);
    const [pendingAssignment, setPendingAssignment] = useState(null);

    const dateStr = selectedDate ? selectedDate.format('YYYY-MM-DD') : null;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));

            const bookingsForDate = MOCK_SERVICE_BOOKINGS.filter(b => b.booking_date === dateStr && (b.status === 'RO_CREATED' || b.status === 'IN_PROGRESS'));

            const techs = mockStaffData.filter(staff => staff.role === 'TECHNICIAN' || staff.role === 'LEAD_TECHNICIAN');

            setTechnicians(techs);
            setBookings(bookingsForDate);
            setBays(mockBays);
            setIsLoading(false);
        };

        fetchData();
    }, [dateStr]);

    const handleDragStart = (event) => {
        const { active } = event;
        const draggedBooking = bookings.find(b => b._id === active.id);
        setActiveBooking(draggedBooking);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveBooking(null);

        if (!over) return;

        const bookingId = active.id;
        const targetId = over.id;

        if (targetId === 'unassigned_pool') {
            setBookings(prevBookings =>
                prevBookings.map(b => {
                    if (b._id === bookingId) {
                        return { ...b, bay_id: null, primary_technician: null, assistant_technicians: [], status: 'RO_CREATED' };
                    }
                    return b;
                })
            );
            return;
        }

        const targetBay = bays.find(b => b.id === targetId);
        const bookingToAssign = bookings.find(b => b._id === bookingId);

        if (targetBay && bookingToAssign) {
            setPendingAssignment({
                booking: bookingToAssign,
                targetBay: targetBay
            });
        }
    };

    const confirmAssignment = (values) => {
        if (!pendingAssignment) return;

        setBookings(prevBookings =>
            prevBookings.map(b => {
                if (b._id === pendingAssignment.booking._id) {
                    return {
                        ...b,
                        bay_id: pendingAssignment.targetBay.id,
                        time_slot: values.time_slot,
                        primary_technician: values.primary_technician,
                        assistant_technicians: values.assistant_technicians || [],
                        status: 'IN_PROGRESS'
                    };
                }
                return b;
            })
        );
        setPendingAssignment(null);
    };

    const cancelAssignment = () => {
        setPendingAssignment(null);
    };

    const adjustDuration = (bookingId, minutesToAdd) => {
        setBookings(prevBookings => prevBookings.map(b => {
            if (b._id === bookingId) {
                const parts = b.time_slot.split(' - ');
                if (parts.length === 2) {
                    const startStr = parts[0];
                    let [endH, endM] = parts[1].split(':').map(Number);

                    let totalEndMins = endH * 60 + endM + minutesToAdd;
                    if (totalEndMins < (parseInt(startStr.split(':')[0]) * 60 + parseInt(startStr.split(':')[1]) + 30)) {
                        totalEndMins = parseInt(startStr.split(':')[0]) * 60 + parseInt(startStr.split(':')[1]) + 30; // Min 30 mins
                    }
                    if (totalEndMins > 19 * 60) totalEndMins = 19 * 60; // Max 19:00

                    const newEndH = Math.floor(totalEndMins / 60);
                    const newEndM = totalEndMins % 60;
                    const formattedEnd = `${newEndH.toString().padStart(2, '0')}:${newEndM.toString().padStart(2, '0')}`;

                    return { ...b, time_slot: `${startStr} - ${formattedEnd}` };
                }
            }
            return b;
        }));
    };

    // Calculate dynamic workloads based on assigned bookings
    const getTechniciansWithWorkload = () => {
        return technicians.map(tech => {
            const assignedCount = bookings.filter(b =>
                b.primary_technician === tech._id ||
                b.assistant_technicians?.includes(tech._id)
            ).length;
            // Fake workload calculation: 1 task = 25% utilization
            let workload = assignedCount * 25;
            if (workload > 100) workload = 100;
            return { ...tech, calculatedWorkload: workload };
        });
    };

    // Derived state for filtered bookings
    const filteredBookings = bookings.filter(b => {
        if (!searchTerm) return true;
        return b.license_plate?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const unassignedBookings = filteredBookings.filter(b => b.status === 'RO_CREATED');
    const assignedBookings = filteredBookings.filter(b => b.status === 'IN_PROGRESS');

    return {
        bookings: assignedBookings,
        unassignedBookings,
        bays,
        technicians: getTechniciansWithWorkload(),
        isLoading,
        searchTerm,
        setSearchTerm,
        activeBooking,
        handleDragStart,
        handleDragEnd,
        adjustDuration,
        pendingAssignment,
        confirmAssignment,
        cancelAssignment
    };
};
