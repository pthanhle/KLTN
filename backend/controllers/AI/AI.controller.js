export const AiChatController = {
  askPricing: async (req, res) => {
    try {
      const { message, conversation_id } = req.body;
      const currentUser = req.user;

      if (!message) return res.status(400).json({ success: false, error: "Empty message" });

      const response = await fetch("http://ai-service:8000/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser ? currentUser._id.toString() : "anonymous",
          message: message,
          conversation_id: conversation_id || null
        }),
      });

      const data = await response.json();

      if (data.success) {
        return res.json({
          success: true,
          answer: data.answer,
          conversation_id: data.conversation_id,
          title: data.title
        });
      } else {
        throw new Error(data.detail || "AI Service Error");
      }
    } catch (err) {
      console.error("AI Proxy Error:", err);
      return res.status(500).json({ success: false, error: "Lỗi kết nối hệ thống AI" });
    }
  },


  getConversations: async (req, res) => {
    try {
      const currentUser = req.user;
      if (!currentUser) return res.status(401).json({ success: false, error: "Unauthorized" });

      const response = await fetch(`http://ai-service:8000/ai/conversations/${currentUser._id.toString()}`);
      const data = await response.json();

      if (data.success) {
        return res.json({ success: true, conversations: data.conversations });
      } else {
        throw new Error(data.detail || "AI Service Error");
      }
    } catch (err) {
      console.error("AI History Error:", err);
      return res.status(500).json({ success: false, error: "Không thể lấy lịch sử trò chuyện" });
    }
  },


  getConversationMessages: async (req, res) => {
    try {
      const { id } = req.params;
      const currentUser = req.user;
      const response = await fetch(`http://ai-service:8000/ai/conversations/${id}/messages?user_id=${currentUser._id.toString()}`);
      const data = await response.json();

      if (data.success) {
        return res.json({ success: true, messages: data.messages });
      } else {
        throw new Error(data.detail || "AI Service Error");
      }
    } catch (err) {
      console.error("AI Messages Error:", err);
      return res.status(500).json({ success: false, error: "Không thể tải nội dung cuộc hội thoại" });
    }
  },


  deleteConversation: async (req, res) => {
    try {
      const { id } = req.params;
      const currentUser = req.user;
      const response = await fetch(`http://ai-service:8000/ai/conversations/${id}?user_id=${currentUser._id.toString()}`, {
        method: "DELETE"
      });
      const data = await response.json();

      if (data.success) {
        return res.json({ success: true });
      } else {
        throw new Error(data.detail || "AI Service Error");
      }
    } catch (err) {
      console.error("AI Delete Error:", err);
      return res.status(500).json({ success: false, error: "Không thể xóa cuộc hội thoại" });
    }
  }
};