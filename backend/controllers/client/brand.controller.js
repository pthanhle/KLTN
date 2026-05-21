import Brand from '../../models/brandModel.js';
import Car from '../../models/carModel.js';

export const getBrands = async (req, res) => {
    try {
        const { is_partner, search, letter, page, limit } = req.query;
        let query = {};

        if (is_partner !== undefined) {
            query.is_partner = is_partner === 'true';
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (letter && letter !== 'ALL') {
            query.name = { $regex: `^${letter}`, $options: 'i' };
        }

        const isPaginated = page && limit;
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const skipNumber = (pageNum - 1) * limitNum;

        let brandsQuery = Brand.find(query).sort({ createdAt: -1 });

        if (isPaginated) {
            brandsQuery = brandsQuery.skip(skipNumber).limit(limitNum);
        }

        const brands = await brandsQuery.lean();

        const brandIds = brands.map(b => b._id.toString());
        const carCounts = await Car.aggregate([
            {
                $match: {
                    brandId: { $in: brandIds },
                    status: 'Published'
                }
            },
            {
                $group: {
                    _id: '$brandId',
                    count: { $sum: 1 }
                }
            }
        ]);

        const countMap = {};
        carCounts.forEach(item => {
            countMap[item._id] = item.count;
        });

        const enrichedBrands = brands.map(b => ({
            ...b,
            count: countMap[b._id.toString()] || 0
        }));

        if (isPaginated) {
            const totalItems = await Brand.countDocuments(query);
            return res.status(200).json({
                data: enrichedBrands,
                pagination: {
                    totalItems,
                    totalPages: Math.ceil(totalItems / limitNum),
                    currentPage: pageNum,
                    pageSize: limitNum
                }
            });
        }

        res.status(200).json(enrichedBrands);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) return res.status(404).json({ message: 'Không tìm thấy thương hiệu' });
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
