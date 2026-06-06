/**
 * Centralized Email HTML Templates
 * All email HTML content should be defined here to keep controllers clean.
 */

const BASE_STYLE = `
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px;
`

const OTP_BOX_STYLE = `
    background-color: #f8fafc;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
    margin: 24px 0;
`

const OTP_SPAN_STYLE = `
    font-size: 32px;
    font-weight: bold;
    letter-spacing: 8px;
    color: #eab308;
`

const FOOTER_STYLE = `
    font-size: 12px;
    color: #94a3b8;
    text-align: center;
`

const HR_STYLE = `border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;`


export const customerOtpCreationEmail = (fullName, otp, tempPassword) => ({
    subject: 'Chào mừng khách hàng mới & Xác nhận tài khoản',
    html: `
        <div style="${BASE_STYLE}">
            <h2 style="color: #1e293b; text-align: center;">Chào mừng khách hàng mới!</h2>
            <p>Xin chào <strong>${fullName}</strong>,</p>
            <p>Một tài khoản khách hàng đã được tạo cho bạn trên hệ thống của chúng tôi.</p>
            
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p style="margin: 0; color: #475569; font-size: 14px;">Thông tin đăng nhập tạm thời:</p>
                <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 16px; font-weight: bold; color: #0f172a;">
                    Mật khẩu: ${tempPassword}
                </p>
            </div>

            <p>Vui lòng sử dụng mã OTP dưới đây để xác nhận và kích hoạt tài khoản:</p>
            <div style="${OTP_BOX_STYLE}">
                <span style="${OTP_SPAN_STYLE}">${otp}</span>
            </div>
            
            <p style="font-size: 14px; color: #64748b;">
                Mã OTP có hiệu lực trong <strong>10 phút</strong>. 
                Sau khi đăng nhập lần đầu, bạn nên đổi mật khẩu để đảm bảo an toàn.
            </p>
            <hr style="${HR_STYLE}">
            <p style="${FOOTER_STYLE}">Đây là email tự động, vui lòng không phản hồi.</p>
        </div>
    `,
})


export const customerOtpResendEmail = (otp) => ({
    subject: 'Mã OTP xác nhận tài khoản khách hàng (Gửi lại)',
    html: `
        <div style="${BASE_STYLE}">
            <h2 style="color: #1e293b; text-align: center;">Xác nhận tài khoản</h2>
            <p>Mã OTP mới của bạn là:</p>
            <div style="${OTP_BOX_STYLE}">
                <span style="${OTP_SPAN_STYLE}">${otp}</span>
            </div>
            <p style="font-size: 14px; color: #64748b;">Mã này có hiệu lực trong <strong>10 phút</strong>.</p>
            <hr style="${HR_STYLE}">
            <p style="${FOOTER_STYLE}">Đây là email tự động, vui lòng không phản hồi.</p>
        </div>
    `,
})


export const registerOtpEmail = (fullName, otp) => ({
    subject: 'Mã OTP xác nhận đăng ký',
    html: `
        <div style="${BASE_STYLE}">
            <h2 style="color: #1e293b; text-align: center;">Xác nhận đăng ký</h2>
            <p>Xin chào <strong>${fullName}</strong>,</p>
            <p>Mã OTP xác nhận email của bạn là:</p>
            <div style="${OTP_BOX_STYLE}">
                <span style="${OTP_SPAN_STYLE}">${otp}</span>
            </div>
            <p style="font-size: 14px; color: #64748b;">Mã có hiệu lực trong <strong>10 phút</strong>.</p>
            <hr style="${HR_STYLE}">
            <p style="${FOOTER_STYLE}">Đây là email tự động, vui lòng không phản hồi.</p>
        </div>
    `,
})


export const resendRegisterOtpEmail = (otp) => ({
    subject: 'Mã OTP xác nhận email (gửi lại)',
    html: `
        <div style="${BASE_STYLE}">
            <h2 style="color: #1e293b; text-align: center;">Mã OTP mới</h2>
            <p>Mã OTP mới của bạn là:</p>
            <div style="${OTP_BOX_STYLE}">
                <span style="${OTP_SPAN_STYLE}">${otp}</span>
            </div>
            <p style="font-size: 14px; color: #64748b;">Có hiệu lực trong <strong>10 phút</strong>.</p>
            <hr style="${HR_STYLE}">
            <p style="${FOOTER_STYLE}">Đây là email tự động, vui lòng không phản hồi.</p>
        </div>
    `,
})


export const resetPasswordEmail = (fullName, resetUrl) => ({
    subject: 'Đặt lại mật khẩu',
    html: `
        <div style="${BASE_STYLE}">
            <h2 style="color: #333;">Đặt lại mật khẩu</h2>
            <p>Xin chào <strong>${fullName}</strong>,</p>
            <p>Bạn đã yêu cầu đặt lại mật khẩu. Click vào nút bên dưới để tiếp tục:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}"
                   style="background-color: #eab308; color: white; padding: 12px 30px;
                          text-decoration: none; border-radius: 5px; display: inline-block;">
                    Đặt lại mật khẩu
                </a>
            </div>
            <p style="color: #666; font-size: 14px;">Link này chỉ có hiệu lực trong <strong>5 phút</strong>.</p>
            <p style="color: #666; font-size: 14px;">Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
            <hr style="${HR_STYLE}">
            <p style="color: #999; font-size: 12px;">
                Hoặc copy link này vào trình duyệt:<br>
                <span style="word-break: break-all;">${resetUrl}</span>
            </p>
        </div>
    `,
})

export const maintenanceReminderEmail = (fullName, bookingUrl) => ({
    subject: 'Nhắc nhở bảo dưỡng định kì – TT AUTO',
    html: `
        <div style="${BASE_STYLE}">
            <h2 style="color: #1e293b; text-align: center;">Đã đến lúc bảo dưỡng xe của bạn!</h2>
            <p>Xin chào <strong>${fullName}</strong>,</p>
            <p>Chúng tôi nhận thấy đã hơn <strong>3 tháng</strong> kể từ lần bảo dưỡng gần nhất của bạn tại <strong>TT AUTO</strong>.</p>

            <div style="background-color: #fffbeb; border-left: 4px solid #eab308; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0; font-weight: 700; color: #92400e;">Tại sao bảo dưỡng định kỳ quan trọng?</p>
                <ul style="margin: 10px 0 0 0; padding-left: 18px; color: #78350f; font-size: 14px;">
                    <li>Đảm bảo an toàn khi vận hành</li>
                    <li>Phát hiện sớm hư hỏng, tiết kiệm chi phí sửa chữa</li>
                    <li>Duy trì hiệu suất và tuổi thọ động cơ</li>
                    <li>Giữ nguyên giá trị xe lâu dài</li>
                </ul>
            </div>

            <p>Đặt lịch ngay hôm nay để nhận <strong>ưu đãi dành riêng cho khách hàng thân thiết</strong>!</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${bookingUrl}"
                   style="background-color: #eab308; color: #1e293b; padding: 14px 36px; font-weight: bold;
                          text-decoration: none; border-radius: 8px; display: inline-block; font-size: 15px;">
                    Đặt lịch bảo dưỡng ngay
                </a>
            </div>

            <hr style="${HR_STYLE}">
            <p style="${FOOTER_STYLE}">Đây là email tự động, vui lòng không phản hồi trực tiếp. Liên hệ hỗ trợ: support@ttauto.vn</p>
        </div>
    `,
})


export const serviceTrackingEmail = (fullName, trackingCode, trackingUrl, licensePlate, serviceItems = []) => ({
    subject: 'Thông tin dịch vụ & Theo dõi tiến độ',
    html: `
        <div style="${BASE_STYLE}">
            <h2 style="color: #1e293b; text-align: center;">Theo dõi tiến độ dịch vụ</h2>
            <p>Xin chào <strong>${fullName}</strong>,</p>
            <p>Yêu cầu dịch vụ của bạn đã được điều phối và đang được xử lý.</p>
            
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: center;">
                <p style="margin: 0; color: #475569; font-size: 14px;">Mã dịch vụ của bạn (Tracking Code):</p>
                <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 24px; font-weight: bold; color: #0f172a; letter-spacing: 2px;">
                    ${trackingCode}
                </p>
                ${licensePlate ? `<p style="margin: 10px 0 0 0; font-size: 14px; color: #64748b;">Biển số xe: <strong style="color: #0f172a;">${licensePlate}</strong></p>` : ''}
            </div>

            ${serviceItems.length > 0 ? `
            <div style="margin: 20px 0;">
                <p style="font-weight: 700; color: #1e293b; margin-bottom: 10px;">Hạng mục dịch vụ đã đăng ký:</p>
                <ul style="margin: 0; padding-left: 20px; border-left: 3px solid #eab308;">
                    ${serviceItems.map(s => `
                        <li style="margin: 8px 0; font-size: 14px; color: #0f172a;">
                            <strong>${s.service_name || s.name || 'Dịch vụ'}</strong>
                            ${(s.price && s.price > 0) ? `<span style="color: #64748b; margin-left: 8px;">(${Number(s.price).toLocaleString('vi-VN')} ₫)</span>` : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}

            <p>Bạn có thể theo dõi tiến độ dịch vụ trực tiếp qua liên kết dưới đây:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${trackingUrl}"
                   style="background-color: #eab308; color: white; padding: 12px 30px;
                          text-decoration: none; border-radius: 5px; display: inline-block;">
                    Theo dõi tiến độ
                </a>
            </div>
            
            <hr style="${HR_STYLE}">
            <p style="color: #999; font-size: 12px;">
                Hoặc truy cập trực tiếp link này:<br>
                <span style="word-break: break-all;">${trackingUrl}</span>
            </p>
            <p style="${FOOTER_STYLE}">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
        </div>
    `,
})
