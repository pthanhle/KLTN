import Contact from '../../models/contactModel.js'
import asyncHandler from 'express-async-handler'


export const getContactInfo = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne().sort({ createdAt: -1 })
    
    if (!contact) {
        res.status(404)
        throw new Error('Chưa cấu hình thông tin liên hệ')
    }

    res.json(contact)
})
