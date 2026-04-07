import mongoose from 'mongoose';

const partReviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    part_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Part',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: { type: String, required: true },
    variant: { type: String, default: '' },
    images: { type: [String], default: [] },
    likes: { type: Number, default: 0 },
    liked_by: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    replies: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending', // Requires admin approval before display
    },
  },
  {
    timestamps: true,
  }
);

// Auto-calculate Part metrics after review is published/updated
partReviewSchema.post('save', async function() {
  if (this.part_id && this.status === 'approved') {
    const Part = mongoose.model('Part');
    const stats = await mongoose.model('PartReview').aggregate([
      { $match: { part_id: this.part_id, status: 'approved' } },
      {
        $group: {
          _id: '$part_id',
          average: { $avg: '$rating' },
          total: { $sum: 1 },
          star1: { $sum: { $cond: [{ $eq: ['$rating', 1] }, 1, 0] } },
          star2: { $sum: { $cond: [{ $eq: ['$rating', 2] }, 1, 0] } },
          star3: { $sum: { $cond: [{ $eq: ['$rating', 3] }, 1, 0] } },
          star4: { $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] } },
          star5: { $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] } }
        }
      }
    ]);
    
    if (stats.length > 0) {
      const s = stats[0];
      const distribution = {
        1: Math.round((s.star1 / s.total) * 100),
        2: Math.round((s.star2 / s.total) * 100),
        3: Math.round((s.star3 / s.total) * 100),
        4: Math.round((s.star4 / s.total) * 100),
        5: Math.round((s.star5 / s.total) * 100)
      };

      await Part.findByIdAndUpdate(this.part_id, {
        rating: Math.round(s.average * 10) / 10,
        reviews_count: s.total,
        reviews_summary: {
          average: Math.round(s.average * 10) / 10,
          total: s.total,
          distribution
        }
      });
    }
  }
});

const PartReview = mongoose.model('PartReview', partReviewSchema);
export default PartReview;
