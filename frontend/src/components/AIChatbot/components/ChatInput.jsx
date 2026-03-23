import { Send } from 'lucide-react';
import { Button, Form, Input } from 'antd';

const ChatInput = ({ inputText, setInputText, isLoading, handleSendMessage, t }) => {
    return (
        <div className="p-3 bg-white dark:bg-[#161a23] border-t border-gray-100 dark:border-gray-800">
            <Form 
                onFinish={handleSendMessage}
                className="flex items-center bg-slate-50 dark:bg-[#0b0f19] border border-gray-200 dark:border-gray-800 rounded-full px-2 py-1.5 m-0"
            >
                <div className="flex-1 ml-2">
                    <Input 
                        placeholder={t('chatbot_input_placeholder', 'Hỏi AI tiếp...')} 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="bg-transparent border-none outline-none shadow-none focus:ring-0 focus:shadow-none p-0 text-[14px] text-slate-700 dark:text-slate-300 placeholder-slate-400 w-full hover:bg-transparent focus:bg-transparent"
                        disabled={isLoading}
                    />
                </div>
                <Button 
                    htmlType="submit" 
                    disabled={!inputText.trim() || isLoading}
                    icon={<Send size={14} className="ml-0.5" />}
                    className="w-8 h-8 rounded-full !bg-yellow-500 flex items-center justify-center !text-slate-900 hover:!bg-yellow-400 disabled:opacity-50 disabled:hover:!bg-yellow-500 transition-colors shrink-0 p-0 border-0"
                />
            </Form>
        </div>
    );
};

export default ChatInput;
