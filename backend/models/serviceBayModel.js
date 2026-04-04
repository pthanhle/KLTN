// backend/models/serviceBayModel.js
import mongoose from 'mongoose'

const serviceBaySchema = mongoose.Schema(
    {
        bay_number: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ['available', 'occupied', 'maintenance'],
            default: 'available',
        },
        current_booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
            default: null,
        },
        last_maintenance: {
            type: Date,
        },
        notes: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
)

const ServiceBay = mongoose.model('ServiceBay', serviceBaySchema)

export default ServiceBay