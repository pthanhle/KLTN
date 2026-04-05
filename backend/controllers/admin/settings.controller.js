import Contact from '../../models/contactModel.js'
import asyncHandler from 'express-async-handler'


export const updateContactInfo = asyncHandler(async (req, res) => {
    const {
        company_name, address, phone, email, hotline,
        working_hours, map_url, social_links, logo, description
    } = req.body

    let contact = await Contact.findOne().sort({ createdAt: -1 })

    if (contact) {
        contact.company_name = company_name || contact.company_name
        contact.address = address || contact.address
        contact.phone = phone || contact.phone
        contact.email = email || contact.email
        contact.hotline = hotline || contact.hotline
        contact.working_hours = working_hours || contact.working_hours
        contact.map_url = map_url || contact.map_url
        contact.social_links = social_links || contact.social_links
        contact.logo = logo || contact.logo
        contact.description = description || contact.description

        const updatedContact = await contact.save()
        res.json({ message: 'Cập nhật thông tin liên hệ thành công', contact: updatedContact })
    } else {
        const newContact = await Contact.create({
            company_name, address, phone, email, hotline,
            working_hours, map_url, social_links, logo, description
        })
        res.status(201).json({ message: 'Đã khởi tạo thông tin liên hệ', contact: newContact })
    }
})
