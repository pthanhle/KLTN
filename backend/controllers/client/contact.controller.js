import Contact from '../../models/contactModel.js'
import asyncHandler from 'express-async-handler'
import emailQueue from '../../queues/emailQueue.js'

const SUBJECT_LABELS = {
    new_car: 'Tư vấn mua xe mới',
    test_drive: 'Đăng ký lái thử',
    maintenance: 'Dịch vụ bảo dưỡng',
    accessories: 'Phụ kiện & trang bị',
    other: 'Khác',
}

export const getContactInfo = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne().sort({ createdAt: -1 })

    if (!contact) {
        res.status(404)
        throw new Error('Chưa cấu hình thông tin liên hệ')
    }

    res.json(contact)
})

export const submitContactForm = asyncHandler(async (req, res) => {
    const { fullName, phone, email, subject, message } = req.body

    if (!fullName || !email || !message) {
        res.status(400)
        throw new Error('Thiếu thông tin bắt buộc')
    }

    const subjectLabel = SUBJECT_LABELS[subject] || subject

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #c9a227; border-bottom: 2px solid #c9a227; padding-bottom: 8px;">
                Yêu cầu tư vấn mới từ website TT AUTO
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="background: #f9f9f9;">
                    <td style="padding: 10px; font-weight: bold; width: 140px;">Họ và tên:</td>
                    <td style="padding: 10px;">${fullName}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Số điện thoại:</td>
                    <td style="padding: 10px;">${phone || 'Không cung cấp'}</td>
                </tr>
                <tr style="background: #f9f9f9;">
                    <td style="padding: 10px; font-weight: bold;">Email:</td>
                    <td style="padding: 10px;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Chủ đề:</td>
                    <td style="padding: 10px;">${subjectLabel}</td>
                </tr>
                <tr style="background: #f9f9f9;">
                    <td style="padding: 10px; font-weight: bold; vertical-align: top;">Lời nhắn:</td>
                    <td style="padding: 10px; white-space: pre-wrap;">${message}</td>
                </tr>
            </table>
            <p style="color: #888; font-size: 12px; margin-top: 20px;">
                Email này được gửi tự động từ form liên hệ trên website TT AUTO.
            </p>
        </div>
    `

    await emailQueue.add('sendEmail', {
        to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
        subject: `[TT AUTO] ${subjectLabel} - ${fullName}`,
        html,
    })

    res.json({ success: true, message: 'Yêu cầu của bạn đã được gửi thành công' })
})
