import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    parts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Part'
      }
    ],
    mock_cars: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Wishlist', wishlistSchema);
