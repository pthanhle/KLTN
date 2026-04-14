import { SEO_CONSTANTS } from '../constants/seo.constants';

export const getSeoRules = (t) => ({
    slug: [
        { required: true, message: t('val_slugRequired', 'Vui lòng nhập đường dẫn tĩnh (Slug)') },
        { pattern: /^[a-z0-9-]+$/, message: t('val_slugInvalid', 'Chỉ chứa chữ thường, số và dấu gạch ngang') },
        { max: 100, message: t('val_slugMax', 'Slug tối đa 100 ký tự') }
    ],
    metaTitle: [
        { max: SEO_CONSTANTS.MAX_TITLE_LENGTH, message: t('val_metaTitleMax', 'Tiêu đề vượt quá giới hạn tối ưu SEO') }
    ],
    metaDescription: [
        { max: SEO_CONSTANTS.MAX_DESC_LENGTH, message: t('val_metaDescMax', 'Mô tả vượt quá giới hạn tối ưu SEO') }
    ],
    ogImage: [
        { type: 'url', message: t('val_urlInvalid', 'Vui lòng nhập đường dẫn URL hợp lệ') }
    ]
});
