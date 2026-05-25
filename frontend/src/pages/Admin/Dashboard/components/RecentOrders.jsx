import React from 'react';
import { Avatar, Tag } from 'antd';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatVND } from '../../Customers/utils/format';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('vi');

export const RecentOrders = ({ orders }) => {
    
    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'gold';
            case 'CONFIRMED': return 'blue';
            case 'PROCESSING': return 'cyan';
            case 'SHIPPED': return 'purple';
            case 'DELIVERED': return 'green';
            case 'COMPLETED': return 'green';
            case 'CANCELLED': return 'red';
            default: return 'default';
        }
    };

    return (
        <div className="bg-white dark:bg-[#141416] rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Đơn hàng gần đây</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Các giao dịch mới nhất</p>
                </div>
                <div className="p-2.5 bg-indigo-50 dark:bg-white/5 rounded-2xl">
                    <ShoppingBag size={20} className="text-indigo-500" />
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col gap-2">
                {orders && orders.length > 0 ? orders.map((order) => (
                    <Link 
                        key={order._id} 
                        to={`/admin/orders/${order._id}`}
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                    >
                        <Avatar 
                            src={order.user_id?.avatar} 
                            size={44}
                            className="bg-indigo-100 text-indigo-600 font-bold border-2 border-white shadow-sm"
                        >
                            {order.user_id?.full_name?.charAt(0) || 'U'}
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                                    {order.user_id?.full_name || 'Khách vãng lai'}
                                </p>
                                <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                                    {dayjs(order.createdAt).fromNow()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                    {formatVND(order.financials?.grand_total)}
                                </p>
                                <Tag color={getStatusColor(order.order_status)} className="m-0 text-[10px] uppercase font-bold border-0">
                                    {order.order_status}
                                </Tag>
                            </div>
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight size={18} className="text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                )) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2 min-h-[200px]">
                        <ShoppingBag size={32} className="opacity-20" />
                        <span className="text-sm">Chưa có đơn hàng nào</span>
                    </div>
                )}
            </div>
            
            {orders && orders.length > 0 && (
                <div className="p-4 border-t border-slate-100 dark:border-white/5 text-center">
                    <Link to="/admin/orders" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors">
                        Xem tất cả đơn hàng
                    </Link>
                </div>
            )}
        </div>
    );
};
