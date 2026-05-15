import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { adminCustomerApi } from '@/services/api/adminCustomer.api';
import { MOCK_TIER_CONFIG } from '../../Customers/data/tierConfig.mock';

export const useCustomerDetail = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [tiersList] = useState(MOCK_TIER_CONFIG);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('GARAGE');

    const [isTierModalOpen, setIsTierModalOpen] = useState(false);
    const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [ordersPagination, setOrdersPagination] = useState({ page: 1, limit: 5, total: 0 });

    const [bookings, setBookings] = useState([]);
    const [bookingsLoading, setBookingsLoading] = useState(false);
    const [bookingsPagination, setBookingsPagination] = useState({ page: 1, limit: 5, total: 0 });

    useEffect(() => {
        if (!id || id === 'undefined') {
            console.warn('Customer ID is missing or undefined');
            setIsLoading(false);
            return;
        }

        const fetchCustomer = async () => {
            setIsLoading(true);
            try {
                console.log('Fetching customer detail for ID:', id);
                const data = await adminCustomerApi.getCustomerById(id);
                setCustomer(data);
            } catch (err) {
                const errorMsg = err?.response?.data?.message || err.message || 'Không thể tải thông tin khách hàng';
                message.error(errorMsg);
                console.error('Fetch customer detail error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCustomer();
    }, [id]);

    const fetchOrders = useCallback(async (page = 1, limit = 5) => {
        if (!id) return;
        setOrdersLoading(true);
        try {
            const data = await adminCustomerApi.getOrdersByCustomer(id, { page, limit });
            setOrders(data?.orders || []);
            setOrdersPagination(p => ({ ...p, page, total: data?.pagination?.total || 0 }));
        } catch (err) {
            message.error('Không thể tải lịch sử đơn hàng');
            console.error(err);
        } finally {
            setOrdersLoading(false);
        }
    }, [id]);

    const fetchBookings = useCallback(async (page = 1, limit = 5) => {
        if (!id) return;
        setBookingsLoading(true);
        try {
            const data = await adminCustomerApi.getBookingsByCustomer(id, { page, limit });
            setBookings(data?.bookings || []);
            setBookingsPagination(p => ({ ...p, page, total: data?.pagination?.total || 0 }));
        } catch (err) {
            message.error('Không thể tải lịch sử booking');
            console.error(err);
        } finally {
            setBookingsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (activeTab === 'HISTORY') fetchOrders();
        if (activeTab === 'BOOKINGS') fetchBookings();
    }, [activeTab, fetchOrders, fetchBookings]);

    const handleCustomerUpdate = async (updatedData) => {
        try {
            const result = await adminCustomerApi.updateCustomer(id, updatedData);
            setCustomer(result?.customer || result);
            message.success('Cập nhật thông tin khách hàng thành công');
            setIsEditorOpen(false);
        } catch (err) {
            message.error('Cập nhật thất bại: ' + (err?.response?.data?.message || err.message));
        }
    };

    const handleToggleLock = async () => {
        setIsActionLoading(true);
        try {
            const result = await adminCustomerApi.toggleLockStatus(id, customer?.status);
            setCustomer(prev => ({ ...prev, status: result?.customer?.status || result?.status }));
            message.success(customer?.status === 'active' ? 'Đã khóa tài khoản khách hàng' : 'Đã mở khóa tài khoản khách hàng');
        } catch (err) {
            message.error('Thao tác thất bại: ' + (err?.response?.data?.message || err.message));
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleUpgradeTier = async (newTier) => {
        setIsActionLoading(true);
        try {
            const result = await adminCustomerApi.upgradeTier(id, newTier);
            setCustomer(prev => ({
                ...prev,
                loyalty: {
                    ...(prev.loyalty || {}),
                    tier: result?.tier || newTier
                }
            }));
            message.success(`Đã nâng hạng lên ${newTier.toUpperCase()}`);
            setIsTierModalOpen(false);
        } catch (err) {
            message.error('Nâng hạng thất bại: ' + (err?.response?.data?.message || err.message));
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleAddPoints = async (values) => {
        setIsActionLoading(true);
        try {
            const result = await adminCustomerApi.addLoyaltyPoints(id, values);
            setCustomer(prev => ({
                ...prev,
                loyalty: result?.loyalty || prev.loyalty
            }));
            message.success(`Đã tặng ${values.points} điểm thành công`);
            setIsPointsModalOpen(false);
        } catch (err) {
            message.error('Tặng điểm thất bại: ' + (err?.response?.data?.message || err.message));
        } finally {
            setIsActionLoading(false);
        }
    };

    return {
        customer,
        isLoading,
        activeTab,
        setActiveTab,
        isEditorOpen,
        setIsEditorOpen,
        isTierModalOpen,
        setIsTierModalOpen,
        isPointsModalOpen,
        setIsPointsModalOpen,
        isActionLoading,
        tiersList,
        orders,
        ordersLoading,
        ordersPagination,
        fetchOrders,
        bookings,
        bookingsLoading,
        bookingsPagination,
        fetchBookings,
        handleCustomerUpdate,
        handleToggleLock,
        handleUpgradeTier,
        handleAddPoints,
    };
};
