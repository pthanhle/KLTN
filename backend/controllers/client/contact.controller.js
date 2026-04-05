import Contact from '../../models/contactModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Lấy thông tin liên hệ và showroom
// @route   GET /api/client/contact
// @access  Public
export const getContactInfo = asyncHandler(async (req, res) => {
    // Luôn lấy bản ghi đầu tiên hoặc bản ghi mới nhất
    const contact = await Contact.findOne().sort({ createdAt: -1 })
    
    if (!contact) {
        res.status(404)
        throw new Error('Chưa cấu hình thông tin liên hệ')
    }

    res.json(contact)
})
