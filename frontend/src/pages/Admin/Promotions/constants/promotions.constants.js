export const DISCOUNT_TYPES = {
    PERCENT: 'PERCENT',
    FIXED: 'FIXED',
    FREE_SHIPPING: 'FREE'
};

export const PROMOTION_STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    ALL: 'ALL'
};

export const PROMOTION_CATEGORY = {
    LOYALTY: 'LOYALTY',
    GLOBAL: 'GLOBAL',
    ALL: 'ALL'
};

export const FILTER_OPTIONS = {
    STATUS: [
        { value: PROMOTION_STATUS.ALL, labelKey: 'filter_status_all' },
        { value: PROMOTION_STATUS.ACTIVE, labelKey: 'filter_status_active' },
        { value: PROMOTION_STATUS.INACTIVE, labelKey: 'filter_status_inactive' }
    ],
    TYPE: [
        { value: 'ALL', labelKey: 'filter_type_all' },
        { value: DISCOUNT_TYPES.PERCENT, labelKey: 'type_percent' },
        { value: DISCOUNT_TYPES.FIXED, labelKey: 'type_fixed' },
        { value: DISCOUNT_TYPES.FREE_SHIPPING, labelKey: 'type_free' }
    ],
    CATEGORY: [
        { value: PROMOTION_CATEGORY.ALL, labelKey: 'filter_category_all' },
        { value: PROMOTION_CATEGORY.LOYALTY, labelKey: 'filter_category_loyalty' },
        { value: PROMOTION_CATEGORY.GLOBAL, labelKey: 'filter_category_global' }
    ]
};
