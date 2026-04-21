import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'Cuộc trò chuyện mới'
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Conversation = mongoose.model('Conversation', conversationSchema, 'conversations');
export default Conversation;
