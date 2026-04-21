import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AiAPI } from '@/services/api/ai';
import { DEFAULT_BOT_MSG } from '../constants/chatbot.constants';

export const useAIChatbotLogic = (isOpen) => {
    const { user } = useSelector((state) => state.auth);
    const [sessions, setSessions] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!user) {
            const tempId = Date.now();
            setSessions([{
                id: tempId,
                title: 'Khách',
                messages: [DEFAULT_BOT_MSG]
            }]);
            setCurrentSessionId(tempId);
            return;
        }

        const fetchSessions = async () => {
            try {
                const res = await AiAPI.getConversations();
                if (res && res.conversations) {
                    const formattedSessions = res.conversations.map(c => ({
                        id: c.id,
                        title: c.title,
                        messages: []
                    }));

                    if (formattedSessions.length > 0) {
                        setSessions(formattedSessions);
                        setCurrentSessionId(formattedSessions[0].id);
                    } else {
                        handleCreateNewSession();
                    }
                }
            } catch (error) {
                console.error('Error fetching sessions:', error);
                handleCreateNewSession();
            }
        };
        fetchSessions();
    }, [user]);

    useEffect(() => {
        if (!currentSessionId || typeof currentSessionId === 'number') return;

        const fetchMessages = async () => {
            const session = sessions.find(s => s.id === currentSessionId);
            if (session && session.messages.length > 0) return;

            try {
                const res = await AiAPI.getMessages(currentSessionId);
                if (res && res.messages) {
                    const formattedMessages = res.messages.map(m => ({
                        sender: m.role === 'user' ? 'user' : 'bot',
                        text: m.content
                    }));
                    if (formattedMessages.length === 0) {
                        formattedMessages.push(DEFAULT_BOT_MSG);
                    }
                    setSessions(prev => prev.map(s =>
                        s.id === currentSessionId ? { ...s, messages: formattedMessages } : s
                    ));
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [currentSessionId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [sessions, currentSessionId, isOpen, isLoading]);

    const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];
    const messages = currentSession?.messages || [];

    const handleCreateNewSession = () => {
        const tempId = Date.now();
        const newSession = {
            id: tempId,
            title: 'Cuộc trò chuyện mới',
            messages: [DEFAULT_BOT_MSG]
        };
        setSessions([newSession, ...sessions]);
        setCurrentSessionId(tempId);
    };

    const handleDeleteSession = async (e, id) => {
        e.stopPropagation();

        // Call API if it's a real ID
        if (typeof id === 'string') {
            try {
                await AiAPI.deleteConversation(id);
            } catch (error) {
                console.error('Error deleting conversation:', error);
            }
        }

        const updated = sessions.filter(s => s.id !== id);
        if (updated.length === 0) {
            handleCreateNewSession();
        } else {
            setSessions(updated);
            if (currentSessionId === id) setCurrentSessionId(updated[0].id);
        }
    };

    const updateCurrentSessionMessages = (newMessages, newConvId = null, newTitle = null) => {
        setSessions(prev => prev.map(s => {
            if (s.id === currentSessionId) {
                return {
                    ...s,
                    messages: newMessages,
                    id: newConvId || s.id,
                    title: newTitle || s.title
                };
            }
            return s;
        }));
        if (newConvId) setCurrentSessionId(newConvId);
    };

    const handleSendMessage = async (e) => {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        if (!inputText.trim() || isLoading) return;

        const userMsg = inputText.trim();
        const currentMessages = [...messages, { sender: 'user', text: userMsg }];

        // Optimistic update
        setSessions(prev => prev.map(s => {
            if (s.id === currentSessionId) {
                // Only update title optimistically if it's the very first message
                const title = s.messages.length <= 1 ? (userMsg.slice(0, 20) + (userMsg.length > 20 ? '...' : '')) : s.title;
                return { ...s, title, messages: currentMessages };
            }
            return s;
        }));

        const conversationIdForApi = typeof currentSessionId === 'string' ? currentSessionId : null;

        setInputText('');
        setIsLoading(true);

        try {
            const res = await AiAPI.askPricing(userMsg, conversationIdForApi);
            if (res && res.answer) {
                updateCurrentSessionMessages(
                    [...currentMessages, { sender: 'bot', text: res.answer }],
                    res.conversation_id,
                    res.title
                );
            } else {
                updateCurrentSessionMessages([...currentMessages, { sender: 'bot', text: 'Xin lỗi, tôi chưa hiểu rõ ý bạn.' }]);
            }
        } catch (error) {
            console.error(error);
            updateCurrentSessionMessages([...currentMessages, { sender: 'bot', text: 'Xin lỗi, hệ thống AI đang gặp sự cố.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        sessions,
        currentSessionId,
        setCurrentSessionId,
        inputText,
        setInputText,
        isLoading,
        messagesEndRef,
        messages,
        handleCreateNewSession,
        handleDeleteSession,
        handleSendMessage
    };
};
