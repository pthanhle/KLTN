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

    const recentTestDrives = await Booking.find({ booking_type: 'test_drive' })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('product_id', 'name sku images')
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
        recentTestDrives,
        dateRange: {
            start: start.toISOString(),
            end: end.toISOString(),
        },
    })
})


export const getPendingCounts = asyncHandler(async (req, res) => {
    const [pendingOrdersCount, pendingTestDrivesCount, pendingAppointmentsCount] = await Promise.all([
        Order.countDocuments({ order_status: 'PENDING' }),
        Booking.countDocuments({ booking_type: 'test_drive', booking_status: 'PENDING' }),
        Booking.countDocuments({ booking_type: { $in: ['service', 'maintenance'] }, booking_status: 'PENDING' }),
    ])
    res.json({ pendingOrdersCount, pendingTestDrivesCount, pendingAppointmentsCount })
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


export const getRevenueAnalytics = asyncHandler(async (req, res) => {
    const { period = 'month', startDate, endDate, year } = req.query

    const now = moment()
    const currentYear = year ? parseInt(year) : now.year()
    let start, end

    if (period === 'day') {
        start = startDate ? moment(startDate).startOf('day') : now.clone().subtract(29, 'days').startOf('day')
        end = endDate ? moment(endDate).endOf('day') : now.clone().endOf('day')
    } else if (period === 'week') {
        start = startDate ? moment(startDate).startOf('isoWeek') : now.clone().subtract(11, 'weeks').startOf('isoWeek')
        end = endDate ? moment(endDate).endOf('isoWeek') : now.clone().endOf('isoWeek')
    } else if (period === 'month') {
        start = moment({ year: currentYear }).startOf('year')
        end = moment({ year: currentYear }).endOf('year')
    } else {
        start = now.clone().subtract(4, 'years').startOf('year')
        end = now.clone().endOf('year')
    }

    const duration = end.diff(start, 'ms')
    const prevEnd = start.clone().subtract(1, 'ms')
    const prevStart = moment(prevEnd.valueOf() - duration)

    const matchCompleted = {
        order_status: { $in: ['DELIVERED', 'COMPLETED'] },
        createdAt: { $gte: start.toDate(), $lte: end.toDate() }
    }
    const matchPrevCompleted = {
        order_status: { $in: ['DELIVERED', 'COMPLETED'] },
        createdAt: { $gte: prevStart.toDate(), $lte: prevEnd.toDate() }
    }
    const matchAll = { createdAt: { $gte: start.toDate(), $lte: end.toDate() } }

    let timeSeriesPromise
    if (period === 'day') {
        timeSeriesPromise = Order.aggregate([
            { $match: matchCompleted },
            { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, revenue: { $sum: '$financials.grand_total' }, orderCount: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ])
    } else if (period === 'week') {
        timeSeriesPromise = Order.aggregate([
            { $match: matchCompleted },
            { $group: { _id: { year: { $isoWeekYear: '$createdAt' }, week: { $isoWeek: '$createdAt' } }, revenue: { $sum: '$financials.grand_total' }, orderCount: { $sum: 1 } } },
            { $sort: { '_id.year': 1, '_id.week': 1 } }
        ])
    } else if (period === 'month') {
        timeSeriesPromise = Order.aggregate([
            { $match: matchCompleted },
            { $group: { _id: { $month: '$createdAt' }, revenue: { $sum: '$financials.grand_total' }, orderCount: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ])
    } else {
        timeSeriesPromise = Order.aggregate([
            { $match: matchCompleted },
            { $group: { _id: { $year: '$createdAt' }, revenue: { $sum: '$financials.grand_total' }, orderCount: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ])
    }

    const [
        currentStats, prevStats, orderStatusAgg, topProductsAgg, timeSeriesAgg,
        totalOrders, completedOrders, cancelledOrders
    ] = await Promise.all([
        Order.aggregate([
            { $match: matchCompleted },
            { $group: { _id: null, totalRevenue: { $sum: '$financials.grand_total' }, orderCount: { $sum: 1 } } }
        ]),
        Order.aggregate([
            { $match: matchPrevCompleted },
            { $group: { _id: null, totalRevenue: { $sum: '$financials.grand_total' }, orderCount: { $sum: 1 } } }
        ]),
        Order.aggregate([
            { $match: matchAll },
            { $group: { _id: '$order_status', count: { $sum: 1 } } }
        ]),
        Order.aggregate([
            { $match: matchCompleted },
            { $unwind: '$items' },
            { $group: { _id: '$items.part_id', name: { $first: '$items.name' }, totalSold: { $sum: '$items.quantity' }, totalRevenue: { $sum: '$items.total_price' } } },
            { $sort: { totalRevenue: -1 } },
            { $limit: 5 }
        ]),
        timeSeriesPromise,
        Order.countDocuments(matchAll),
        Order.countDocuments({ ...matchAll, order_status: { $in: ['DELIVERED', 'COMPLETED'] } }),
        Order.countDocuments({ ...matchAll, order_status: 'CANCELLED' })
    ])

    const MONTHS_LABEL = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
    let timeSeries = []

    if (period === 'day') {
        const map = timeSeriesAgg.reduce((acc, item) => { acc[item._id] = item; return acc; }, {})
        const days = end.diff(start, 'days') + 1
        for (let i = 0; i < days; i++) {
            const d = start.clone().add(i, 'days')
            const key = d.format('YYYY-MM-DD')
            timeSeries.push({ label: d.format('DD/MM'), date: key, revenue: map[key]?.revenue || 0, orderCount: map[key]?.orderCount || 0 })
        }
    } else if (period === 'week') {
        const map = {}
        timeSeriesAgg.forEach(item => { map[`${item._id.year}-${item._id.week}`] = item })
        let current = start.clone().startOf('isoWeek')
        while (current.isSameOrBefore(end, 'day')) {
            const key = `${current.isoWeekYear()}-${current.isoWeek()}`
            const weekEndDate = current.clone().endOf('isoWeek')
            timeSeries.push({
                label: current.format('DD/MM'),
                weekEnd: weekEndDate.format('DD/MM'),
                revenue: map[key]?.revenue || 0,
                orderCount: map[key]?.orderCount || 0
            })
            current.add(1, 'week')
        }
    } else if (period === 'month') {
        const map = timeSeriesAgg.reduce((acc, item) => { acc[item._id] = item; return acc; }, {})
        for (let m = 1; m <= 12; m++) {
            timeSeries.push({ label: MONTHS_LABEL[m - 1], month: m, revenue: map[m]?.revenue || 0, orderCount: map[m]?.orderCount || 0 })
        }
    } else {
        timeSeries = timeSeriesAgg.map(item => ({ label: `${item._id}`, year: item._id, revenue: item.revenue, orderCount: item.orderCount }))
    }

    const totalRevenue = currentStats[0]?.totalRevenue || 0
    const orderCount = currentStats[0]?.orderCount || 0
    const prevTotalRevenue = prevStats[0]?.totalRevenue || 0
    const prevOrderCount = prevStats[0]?.orderCount || 0

    res.json({
        summary: {
            totalRevenue: parseFloat(totalRevenue),
            orderCount,
            avgOrderValue: orderCount > 0 ? Math.round(parseFloat(totalRevenue) / orderCount) : 0,
            revenueGrowth: prevTotalRevenue > 0 ? parseFloat(((totalRevenue - prevTotalRevenue) / prevTotalRevenue * 100).toFixed(2)) : null,
            orderGrowth: prevOrderCount > 0 ? parseFloat(((orderCount - prevOrderCount) / prevOrderCount * 100).toFixed(2)) : null,
            completedOrders,
            cancelledOrders,
            totalOrders,
            completionRate: totalOrders > 0 ? parseFloat(((completedOrders / totalOrders) * 100).toFixed(1)) : 0
        },
        timeSeries,
        orderStatusDistribution: orderStatusAgg.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {}),
        topProducts: topProductsAgg.map(p => ({ ...p, totalRevenue: parseFloat(p.totalRevenue || 0) })),
        dateRange: { start: start.toISOString(), end: end.toISOString() }
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