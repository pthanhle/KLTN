import mongoose from 'mongoose'

const contactSchema = mongoose.Schema(
    {
        company_name: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        hotline: { type: String },
        working_hours: { type: String },
        map_url: { type: String },
        social_links: {
            facebook: { type: String },
            youtube: { type: String },
            zalo: { type: String },
            instagram: { type: String },
        },
        logo: { type: String },
        description: { type: String },
    },
    {
        timestamps: true,
    }
)

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
