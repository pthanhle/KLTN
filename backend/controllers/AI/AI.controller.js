export const AiChatController = {
  askPricing: async (req, res) => {
    try {
      const { message } = req.body;
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
        }),
      });

      const data = await response.json();

      if (data.success) {
        return res.json({ success: true, answer: data.answer });
      } else {
        throw new Error(data.detail || "AI Service Error");
      }
    } catch (err) {
      console.error("AI Proxy Error:", err);
      return res.status(500).json({ success: false, error: "Lỗi kết nối hệ thống AI" });
    }
  }
};