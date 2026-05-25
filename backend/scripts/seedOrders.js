import mongoose from 'mongoose';
import dotenv from 'dotenv';
import moment from 'moment';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Part from '../models/partModel.js';
import Role from '../models/roleModel.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};

const generateOrderCode = () => {
    return `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED'];
const PAYMENT_METHODS = ['COD', 'VNPAY', 'MOMO', 'BANK_TRANSFER'];

const seedOrders = async () => {
    try {
        await connectDB();

        console.log('🔍 Fetching customers and parts...');

        // Get customer role
        const customerRole = await Role.findOne({ role_name: { $in: ['customer', 'Customer'] } });
        if (!customerRole) {
            console.error('❌ Customer role not found');
            process.exit(1);
        }

        // Get all customers
        const customers = await User.find({ role_id: customerRole._id }).limit(10);
        if (customers.length === 0) {
            console.error('❌ No customers found in database');
            process.exit(1);
        }
        console.log(`✅ Found ${customers.length} customers`);

        // Get all parts
        let parts = await Part.find().limit(20);

        // If no parts exist, create some sample parts
        if (parts.length === 0) {
            console.log('⚠️  No parts found, creating sample parts...');
            const sampleParts = [];
            const partNames = [
                'Lốp xe Michelin', 'Phanh ABS', 'Gương chiếu hậu', 'Đèn pha LED',
                'Bộ lọc gió', 'Dầu nhớt Castrol', 'Ắc quy GS', 'Bộ lọc dầu',
                'Má phanh', 'Đĩa phanh', 'Gạt mưa Bosch', 'Bóng đèn Philips',
                'Lọc điều hòa', 'Bugi NGK', 'Dây curoa', 'Bình nước rửa kính',
                'Cần gạt nước', 'Gối đỡ động cơ', 'Lọc nhiên liệu', 'Bộ truyền động'
            ];

            for (let i = 0; i < partNames.length; i++) {
                sampleParts.push({
                    name: partNames[i],
                    sku: `PART${1000 + i}`,
                    slug: `part-${1000 + i}-${partNames[i].toLowerCase().replace(/\s+/g, '-')}`,
                    category: 'Phụ tùng ô tô',
                    condition: 'new',
                    original_price: Math.floor(Math.random() * 2000000) + 100000,
                    price: Math.floor(Math.random() * 1500000) + 100000,
                    images: ['https://via.placeholder.com/300'],
                    compatible_brands: ['Toyota', 'Honda', 'Mazda'],
                    inventory: {
                        stock_on_hand: Math.floor(Math.random() * 100) + 10,
                        allocated: 0,
                        available_stock: Math.floor(Math.random() * 100) + 10
                    },
                    status: 'active', // IMPORTANT: Set to active so client can see
                    seo_description: `Phụ tùng chất lượng cao - ${partNames[i]}`
                });
            }

            parts = await Part.insertMany(sampleParts);
            console.log(`✅ Created ${parts.length} sample parts`);
        } else {
            console.log(`✅ Found ${parts.length} parts`);
        }

        console.log('🗑️  Clearing existing orders...');
        await Order.deleteMany({});

        console.log('📦 Creating orders for the last 30 days...');
        const orders = [];
        const today = moment();

        // Create 50-80 orders distributed over 30 days
        const totalOrders = Math.floor(Math.random() * 31) + 50; // 50-80 orders

        for (let i = 0; i < totalOrders; i++) {
            // Random date in last 30 days
            const daysAgo = Math.floor(Math.random() * 30);
            const orderDate = moment(today).subtract(daysAgo, 'days')
                .hour(Math.floor(Math.random() * 24))
                .minute(Math.floor(Math.random() * 60));

            // Random customer
            const customer = customers[Math.floor(Math.random() * customers.length)];

            // Random 1-4 items
            const itemCount = Math.floor(Math.random() * 4) + 1;
            const orderItems = [];
            let subtotal = 0;

            for (let j = 0; j < itemCount; j++) {
                const part = parts[Math.floor(Math.random() * parts.length)];
                const quantity = Math.floor(Math.random() * 3) + 1;
                const unitPrice = part.price || 100000;
                const totalPrice = unitPrice * quantity;

                orderItems.push({
                    part_id: part._id,
                    sku: part.sku,
                    name: part.name,
                    image: part.images?.[0] || '',
                    quantity: quantity,
                    original_price: unitPrice,
                    unit_price: unitPrice,
                    total_price: totalPrice,
                    is_reviewed: Math.random() > 0.7
                });

                subtotal += totalPrice;
            }

            // Calculate financials
            const shippingFee = Math.floor(Math.random() * 50000) + 20000; // 20k-70k
            const discount = Math.random() > 0.7 ? Math.floor(subtotal * 0.1) : 0; // 10% discount for 30% orders
            const vat = Math.floor((subtotal - discount) * 0.1); // 10% VAT
            const grandTotal = subtotal + shippingFee - discount + vat;

            // Determine status based on order age
            let status;
            if (daysAgo < 2) {
                // Recent orders: mostly PENDING or CONFIRMED
                status = Math.random() > 0.5 ? 'PENDING' : 'CONFIRMED';
            } else if (daysAgo < 7) {
                // Last week: PROCESSING, SHIPPED
                const rand = Math.random();
                if (rand > 0.7) status = 'PROCESSING';
                else if (rand > 0.4) status = 'SHIPPED';
                else status = 'DELIVERED';
            } else {
                // Older orders: mostly DELIVERED or COMPLETED
                const rand = Math.random();
                if (rand > 0.8) status = 'COMPLETED';
                else if (rand > 0.6) status = 'DELIVERED';
                else if (rand > 0.5) status = 'CANCELLED';
                else status = 'SHIPPED';
            }

            // Payment status
            const paymentStatus = ['CANCELLED'].includes(status) ? 'UNPAID' :
                                 ['DELIVERED', 'COMPLETED'].includes(status) ? 'PAID' :
                                 Math.random() > 0.5 ? 'PAID' : 'UNPAID';

            const paymentMethod = PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)];

            const order = {
                order_code: generateOrderCode(),
                user_id: customer._id,
                order_type: 'ACCESSORIES',
                order_status: status,
                cancel_reason: status === 'CANCELLED' ? 'Khách hàng hủy đơn' : undefined,

                financials: {
                    subtotal: subtotal,
                    shipping_fee: shippingFee,
                    discount: discount,
                    vat: vat,
                    grand_total: grandTotal
                },

                payment: {
                    method: paymentMethod,
                    method_name: paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' :
                                paymentMethod === 'VNPAY' ? 'VNPay' :
                                paymentMethod === 'MOMO' ? 'MoMo' : 'Chuyển khoản ngân hàng',
                    transaction_id: paymentStatus === 'PAID' ? `TXN${Date.now()}${i}` : undefined,
                    status: paymentStatus
                },

                shipping: {
                    provider: ['GHTK', 'GHN', 'Viettel Post'][Math.floor(Math.random() * 3)],
                    tracking_code: status !== 'PENDING' ? `TRACK${Date.now()}${i}` : undefined,
                    estimated_delivery: moment(orderDate).add(3, 'days').format('YYYY-MM-DD')
                },

                delivery: {
                    receiver_name: customer.full_name,
                    phone: customer.phone || '0912345678',
                    email: customer.email,
                    address: customer.address || 'Hà Nội, Việt Nam',
                    note: Math.random() > 0.7 ? 'Giao hàng giờ hành chính' : undefined
                },

                vat_info: {
                    is_requested: Math.random() > 0.8,
                    company_name: Math.random() > 0.8 ? 'Công ty TNHH ABC' : undefined,
                    tax_code: Math.random() > 0.8 ? '0123456789' : undefined
                },

                items: orderItems,
                order_date: orderDate.toDate(),
                createdAt: orderDate.toDate(),
                updatedAt: orderDate.toDate()
            };

            orders.push(order);
        }

        // Insert all orders
        await Order.insertMany(orders);

        console.log(`✅ Successfully created ${orders.length} orders`);
        console.log('\n📊 Order Status Distribution:');
        const statusCount = orders.reduce((acc, order) => {
            acc[order.order_status] = (acc[order.order_status] || 0) + 1;
            return acc;
        }, {});
        console.table(statusCount);

        console.log('\n💰 Revenue Summary:');
        const completedOrders = orders.filter(o => ['DELIVERED', 'COMPLETED'].includes(o.order_status));
        const totalRevenue = completedOrders.reduce((sum, o) => sum + o.financials.grand_total, 0);
        console.log(`Total Completed Orders: ${completedOrders.length}`);
        console.log(`Total Revenue: ${totalRevenue.toLocaleString('vi-VN')} VND`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding orders:', error);
        process.exit(1);
    }
};

seedOrders();
