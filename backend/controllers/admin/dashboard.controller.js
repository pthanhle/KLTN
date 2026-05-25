import asyncHandler from 'express-async-handler'
import Order from '../../models/orderModel.js'
import User from '../../models/userModel.js'
import Part from '../../models/partModel.js'
import RevenueReport from '../../models/revenueReportModel.js'
import Booking from '../../models/bookingModel.js'
import ServiceAppointment from '../../models/serviceAppointmentModel.js'
import Role from '../../models/roleModel.js'
import OrderItem from '../../models/orderItemModel.js'
import moment from 'moment'


export const getDashboardStats = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query

    const start = startDate ? moment(startDate).startOf('day') : moment().subtract(30, 'days').startOf('day')
    const end = endDate ? moment(endDate).endOf('day') : moment().endOf('day')

    const completedOrders = await Order.aggregate([
        {
            $match: {
                order_status: { $in: ['DELIVERED', 'COMPLETED'] },
                createdAt: { $gte: start.toDate(), $lte: end.toDate() },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$financials.grand_total' },
                orderCount: { $sum: 1 },
            },
        },
    ])

    const dailyRevenue = await Order.aggregate([
        {
            $match: {
                order_status: { $in: ['DELIVERED', 'COMPLETED'] },
                createdAt: { $gte: moment().subtract(30, 'days').startOf('day').toDate(), $lte: moment().endOf('day').toDate() },
            },
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                revenue: { $sum: '$financials.grand_total' },
            },
        },
        { $sort: { _id: 1 } }
    ]);

    const dailyRevenueMap = dailyRevenue.reduce((acc, item) => {
        acc[item._id] = item.revenue;
        return acc;
    }, {});

    const completeDailyRevenue = [];
    for (let i = 29; i >= 0; i--) {
        const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
        completeDailyRevenue.push({
            _id: date,
            revenue: dailyRevenueMap[date] || 0
        });
    }

    const newCustomers = await User.countDocuments({
        role_id: (await Role.findOne({ role_name: { $in: ['customer', 'Customer'] } }))._id,
        createdAt: { $gte: start.toDate(), $lte: end.toDate() },
    })

    const lowStockProducts = await Part.countDocuments({
        "inventory.available_stock": { $lt: 5 },
    })

    const pendingOrdersCount = await Order.countDocuments({
        order_status: 'PENDING'
    })

    const pendingAppointmentsCount = await ServiceAppointment.countDocuments({
        status: 'PENDING'
    })

    const pendingTestDrivesCount = 0 // testDriveBookingModel not yet complete

    const orderStatusStats = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: start.toDate(), $lte: end.toDate() },
            },
        },
        {
            $group: {
                _id: '$order_status',
                count: { $sum: 1 },
            },
        },
    ])

    const recentOrders = await Order.find()
        .populate('user_id', 'full_name avatar email')
        .sort({ createdAt: -1 })
        .limit(8);

    const lowStockParts = await Part.find({
        "inventory.available_stock": { $lt: 5 },
    }).select('name sku inventory images').sort({ 'inventory.available_stock': 1 }).limit(5);

    const recentAppointments = await ServiceAppointment.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

    // Monthly revenue for the current year (bar chart)
    const monthlyRevenue = await Order.aggregate([
        {
            $match: {
                order_status: { $in: ['DELIVERED', 'COMPLETED'] },
                createdAt: { $gte: moment().startOf('year').toDate(), $lte: moment().endOf('day').toDate() },
            },
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                revenue: { $sum: '$financials.grand_total' },
                count: { $sum: 1 },
            },
        },
        { $sort: { _id: 1 } }
    ]);

    res.json({
        totalRevenue: completedOrders[0]?.totalRevenue ? parseFloat(completedOrders[0].totalRevenue) : 0,
        orderCount: completedOrders[0]?.orderCount || 0,
        pendingOrdersCount,
        pendingAppointmentsCount,
        pendingTestDrivesCount,
        newCustomers,
        lowStockProducts,
        orderStatusStats: orderStatusStats.reduce((acc, stat) => ({
            ...acc,
            [stat._id]: stat.count,
        }), {}),
        dailyRevenue: completeDailyRevenue,
        monthlyRevenue,
        recentOrders,
        lowStockParts,
        recentAppointments,
        dateRange: {
            start: start.toISOString(),
            end: end.toISOString(),
        },
    })
})


export const getRevenueReport = asyncHandler(async (req, res) => {
    const { year } = req.query

    const filter = year ? { year: parseInt(year) } : {}
    const reports = await RevenueReport.find(filter).sort({ month: 1 })

    res.json({
        reports: reports.map(report => ({
            month: report.month,
            year: report.year,
            total_revenue: parseFloat(report.total_revenue),
        })),
    })
})


export const getTopProducts = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query

    const start = startDate ? moment(startDate).startOf('day') : moment().subtract(30, 'days').startOf('day')
    const end = endDate ? moment(endDate).endOf('day') : moment().endOf('day')

    const topProducts = await OrderItem.aggregate([
        {
            $lookup: {
                from: 'orders',
                localField: 'order_id',
                foreignField: '_id',
                as: 'order',
            },
        },
        { $unwind: '$order' },
        {
            $match: {
                'order.status': 'delivered',
                'order.createdAt': { $gte: start.toDate(), $lte: end.toDate() },
            },
        },
        {
            $group: {
                _id: '$product_id',
                totalSold: { $sum: '$quantity' },
                totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
            },
        },
        {
            $lookup: {
                from: 'parts',
                localField: '_id',
                foreignField: '_id',
                as: 'product',
            },
        },
        { $unwind: '$product' },
        {
            $project: {
                product_id: '$_id',
                product_name: '$product.name',
                totalSold: 1,
                totalRevenue: 1,
            },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
    ])

    res.json({
        topProducts: topProducts.map(p => ({
            ...p,
            totalRevenue: parseFloat(p.totalRevenue),
        })),
        dateRange: {
            start: start.toISOString(),
            end: end.toISOString(),
        },
    })
})