// Để đảm bảo 100% dữ liệu đồng nhất giữa Customer Profile và Admin Order Management
// Chúng ta sẽ re-export trực tiếp dữ liệu từ Shared Profile.
// Khi có API thực, chỉ cần sửa logic gọi API trong useOrderListLogic.js.

export { mockOrders } from '@/pages/Shared/Profile/pages/OrderHistory/data/mockOrderData';
