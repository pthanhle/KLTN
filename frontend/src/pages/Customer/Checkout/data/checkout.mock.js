export const mockCartItems = [
    {
        id: '1',
        name: 'Forged Performance Piston Set',
        sku: 'TT-ENG-7721-P',
        price: 2500000,
        original_price: null,
        condition: 'New',
        stock: 50,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGjLowdPfxUuKoRUGaHEkJGW6faOXQqI_YIzHrdXDnwxCP8wK_CHqPkWCMXpjPMAMNn2NfPcwIvP1eeNQ0QYGVQxQRZXX-2Sz4Gx1Fo8nPdHgcHCQXqWZU1z0si7t8WT2xFfU3XTJwXkI7ub4n5kVf-rh7xq2OX5afZI_WPJUc5YK4DOGsR9Y0pxyw4NjiXKJotoFEwzP11lTnUfTKATx2BDHiwIBQ3QtZJTgLTuUlSRzGYLj6GirBBwdKIiSGDn2Exn3q4HEE3CU',
        checked: true
    },
    {
        id: '2',
        name: 'TT-Spec 19" Alloy Wheel',
        sku: 'TT-WHL-0092-B',
        price: 8950000,
        original_price: 10000000,
        condition: 'New',
        stock: 2,
        quantity: 4,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8B1Hi-K2WJ_LKQ7cqzojng-CqD8zqhcK_G-fJ-EA-49LUVLmh_emU04uQ54Ys2dKfboMaVm9E6NlU9AHi6S0Qk2OWjHNLms90MjzD4UET4EiMEV4iLIPOO76drhevRNd9UaaJDfKOor6plvlplQHQ47ZipDwGWXNzvniKm9FkMb2F11o3vtFsyGCF3hsgUw-7owCxttwubzF5c3zI2KZORlqpKCFT9oPMTxTqW_fhE5Rly6KjDEdI6IjuiGTBFqzDDUrZxkofMxM',
        checked: true
    },
    {
        id: '3',
        name: 'Carbon Fiber Wing Mirror Caps',
        sku: 'TT-EXT-CFM-01',
        price: 4200000,
        original_price: null,
        condition: 'New',
        stock: 10,
        quantity: 2,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv5dO3_uSU2FbTS0pe3x5K8SErh3Bo3BQ2HFHM37mlVE9D6Km_HI4lU05DUvA3FeYlQH7ULp_11j_NxI9G7jvdoZwYgd6h7hsT1r9dQ1FrYFjBa7Jw9Nf87XdLHuRqT5lWBd7kEQJqPyY6Ebo8taA8ReBdQ238_XKbizYEWVTLNHJ_F-PlzjDUxEWxiOBRkgbNySA2f1xlSQrIMrn1BBu0RUVRm2i4RNQ7N2HygH5FevYDvKuFr46AN1_7N2SVXufgipuovrW8ogU',
        checked: false
    }
];

export const mockCities = [
    { value: 'hcm', label: 'Hồ Chí Minh' },
    { value: 'hn', label: 'Hà Nội' },
    { value: 'dn', label: 'Đà Nẵng' },
];

export const mockDistricts = {
    hcm: [
        { value: 'q1', label: 'Quận 1' },
        { value: 'q7', label: 'Quận 7' },
        { value: 'td', label: 'Thủ Đức' },
    ],
    hn: [
        { value: 'hk', label: 'Hoàn Kiếm' },
        { value: 'bd', label: 'Ba Đình' },
        { value: 'cg', label: 'Cầu Giấy' },
    ],
    dn: [
        { value: 'hc', label: 'Hải Châu' },
        { value: 'st', label: 'Sơn Trà' },
    ]
};

export const mockShippingMethods = [
    { id: 'economy', label: 'Tiết kiệm', desc: '5-7 ngày làm việc', price: 0, priceLabel: 'Miễn phí' },
    { id: 'express', label: 'Hỏa tốc (2-4h)', desc: 'Nhận ngay trong ngày', price: 50000, priceLabel: '50.000 đ' },
    { id: 'standard', label: 'Tiêu chuẩn', desc: '2-3 ngày làm việc', price: 15000, priceLabel: '15.000 đ' },
];

export const mockPaymentMethods = [
    { id: 'credit_card', label: 'Thẻ tín dụng (Visa/Mastercard)', tags: ['VISA', 'MC'] },
    { id: 'bank_transfer', label: 'Chuyển khoản ngân hàng', tags: [] },
    { id: 'vnpay', label: 'Ví điện tử VNPay (QR)', tags: [] },
    { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)', tags: [] },
];
