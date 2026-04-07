import { z } from 'zod';

export const getPartFormSchema = (t) => z.object({
  name: z.string().min(1, { message: t('adminPartForm:reqName', 'Vui lòng nhập tên linh kiện') }),
  sku: z.string().min(1, { message: t('adminPartForm:reqSku', 'Vui lòng nhập mã SKU') }),
  category: z.string().min(1, { message: t('adminPartForm:reqCategory', 'Vui lòng chọn danh mục') }),
  original_price: z.number().min(0, { message: 'Giá gốc không hợp lệ' }),
  price: z.number().min(0, { message: 'Giá bán không hợp lệ' }),
  images: z.array(z.string()).optional(),
  compatible_brands: z.array(z.string()).optional(),
  fitment_data: z.array(z.object({
    brand: z.string().optional(),
    model: z.string(),
    yearRange: z.string()
  })).optional(),
  landing_blocks: z.array(z.object({
    id: z.string().optional(),
    type: z.enum(['hero', 'text', 'feature_grid', 'gallery', 'video']),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    content: z.string().optional(),
    image_url: z.string().optional(),
    align: z.string().optional(),
    features: z.array(z.any()).optional(),
    images: z.array(z.any()).optional(),
    video_url: z.string().optional(),
    cover_image: z.string().optional()
  })).optional(),
  inventory: z.object({
    warehouse: z.number().min(0),
    showroom: z.number().min(0)
  }),
  specs: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional(),
  options: z.array(z.object({
    type: z.string().min(1, { message: 'Vui lòng nhập loại tùy chọn' }),
    choices: z.array(z.any()).min(1, { message: 'Vui lòng thêm ít nhất 1 lựa chọn' })
  })).optional(),
  status: z.enum(['active', 'draft']).optional().default('active'),
  slug: z.string().optional(),
  seo_title: z.string().max(60, 'Title max 60 chars').optional(),
  seo_description: z.string().max(160, 'Description max 160 chars').optional()
});
