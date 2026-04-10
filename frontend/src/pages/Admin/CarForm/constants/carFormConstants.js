export const CAR_FORM_IMAGES = {
    inventoryDecorativeBg: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000" // Circuit/Processor style abstract
};

export const getOutOfStockBehaviorOptions = (t) => [
    { value: 'pre_order', label: t('behaviorPreOrder', 'Nhận đặt hàng nhà máy (Waitlist)') },
    { value: 'contact', label: t('behaviorContact', 'Khóa Lái thử - Chỉ yêu cầu Tư vấn') },
    { value: 'hide', label: t('behaviorHide', 'Ẩn xe khỏi Danh mục') },
];
