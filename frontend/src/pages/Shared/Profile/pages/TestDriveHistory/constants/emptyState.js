export const EMPTY_STATE_BG_IMAGE = "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

export const getEmptyStateFeatures = (t) => [
    {
        title: t('empty_feat1_title', 'Trải nghiệm'),
        highlight: '24/7',
        desc: t('empty_feat1_desc', 'Hỗ trợ đặt lịch bất cứ lúc nào')
    },
    {
        title: t('empty_feat2_title', 'Phạm vi'),
        highlight: t('empty_feat2_high', 'Tận nơi'),
        desc: t('empty_feat2_desc', 'Lái thử ngay tại khu vực của bạn')
    },
    {
        title: t('empty_feat3_title', 'Dòng xe'),
        highlight: '50+',
        desc: t('empty_feat3_desc', 'Đầy đủ các dòng xe mới nhất')
    }
];
