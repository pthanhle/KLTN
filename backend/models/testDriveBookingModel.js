import mongoose from 'mongoose';

const testDriveBookingSchema = new mongoose.Schema({
  bookingCode: { type: String, required: true, unique: true },


  customerInfo: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true }
  },
  targetCar: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },

  driveType: { type: String, enum: ['showroom', 'home'], required: true },

  locationDetails: {
    showroomBranch: { type: mongoose.Schema.Types.ObjectId, ref: 'Parkingslot' },
  }
});
