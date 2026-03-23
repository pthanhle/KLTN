// Raw Database payload format for System Settings (Admin Panel)
export const mockSystemSettingsApi = {
    company_address: "01 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Hồ Chí Minh",
    company_hotline_sales: "1900 6789",
    company_hotline_support: "1900 9999",
    company_working_hours_weekday: "08:00 - 20:00",
    company_working_hours_weekend: "09:00 - 17:00",
    company_email: "contact@ttauto.com.vn",
    company_social: "facebook.com/ttauto.vn",
    contact_intro_text: "Tại TT AUTO, chúng tôi không chỉ bán xe, chúng tôi kiến tạo những trải nghiệm lái xe hoàn mỹ. Đội ngũ tư vấn sẵn sàng hỗ trợ bạn tìm kiếm chiếc xe trong mơ hoặc lịch bảo dưỡng chuyên sâu.",
    contact_quote_text: "Chất lượng dịch vụ là cam kết hàng đầu của chúng tôi đối với mỗi khách hàng sở hữu dòng xe hạng sang tại TT AUTO."
};

// Mapper utility: convert BE payload to UI Model
export const mapSettingsToContactData = (settings) => {
    return {
        address: {
            titleKey: 'info_address', // Static translation UI map
            content: settings?.company_address || ''
        },
        hotline: {
            titleKey: 'info_hotline',
            items: [
                { labelKey: 'info_sales', value: settings?.company_hotline_sales },
                { labelKey: 'info_support', value: settings?.company_hotline_support }
            ]
        },
        workingHours: {
            titleKey: 'info_workingHours',
            items: [
                { labelKey: 'info_weekday', value: settings?.company_working_hours_weekday },
                { labelKey: 'info_weekend', value: settings?.company_working_hours_weekend }
            ]
        },
        email: settings?.company_email || '',
        socialMedia: settings?.company_social || '',
        introText: settings?.contact_intro_text || '',
        quoteText: settings?.contact_quote_text || ''
    };
};
