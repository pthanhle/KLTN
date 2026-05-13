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


export const customerOtpCreationEmail = (fullName, otp) => ({
    subject: 'Mã OTP xác nhận tài khoản khách hàng',
    html: `
        <div style="${BASE_STYLE}">
            <h2 style="color: #1e293b; text-align: center;">Xác nhận tài khoản</h2>
            <p>Xin chào <strong>${fullName}</strong>,</p>
            <p>Một tài khoản khách hàng đã được tạo cho bạn trên hệ thống của chúng tôi.</p>
            <p>Mã OTP để xác nhận tài khoản của bạn là:</p>
            <div style="${OTP_BOX_STYLE}">
                <span style="${OTP_SPAN_STYLE}">${otp}</span>
            </div>
            <p style="font-size: 14px; color: #64748b;">
                Mã này có hiệu lực trong <strong>10 phút</strong>.
                Vui lòng cung cấp mã này cho nhân viên hỗ trợ hoặc nhập vào trang web để kích hoạt tài khoản.
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
