import axiosClient from '../../utils/axiosClient';

const notificationApi = {
    getAll: () => axiosClient.get('/client/notifications/'),
    markAsRead: (id) => axiosClient.put(`/client/notifications/${id}/read`),
    markAllAsRead: () => axiosClient.put('/client/notifications/read-all'),
};

export default notificationApi;
