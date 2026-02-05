import React, { useState, useEffect } from 'react';
import { ChatIcon } from './ChatIcon';
import { ChatWindow } from './ChatWindow';
import { ChatbotProps, Message } from '../types';

export const Chatbot: React.FC<ChatbotProps> = ({
    onSendMessage,
    botName,
    theme = {},
    position = 'bottom-right',
    chatbotIcon,
    Logo,
    placeholder,
    welcomeMessage = `Hi!👋 I'm ${botName} AI assistant. How can I help you today?`,
    initialMessages = [],
    persistMessages = false,
    maxMessages = 100,
    width,
    height,
    onOpen,
    onClose,
    onMessageSent,
    onMessageReceived,
    customHeader,
    customFooter,
    showBranding = true,
    enableMarkdown = false,
    enableCodeHighlighting = false,
    enableStreaming = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(() => {
        // Load from localStorage if persistence is enabled
        if (persistMessages && typeof window !== 'undefined') {
            const stored = localStorage.getItem(`chatbot-${botName}-messages`);
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch (e) {
                    console.error('Failed to parse stored messages:', e);
                }
            }
        }

        // Return initial messages with welcome message
        const welcome: Message = {
            role: 'assistant',
            content: welcomeMessage,
            timestamp: new Date(),
            id: 'welcome-message',
        };

        return initialMessages.length > 0 ? initialMessages : [welcome];
    });
    const [isLoading, setIsLoading] = useState(false);

    // Persist messages when they change
    useEffect(() => {
        if (persistMessages && typeof window !== 'undefined') {
            localStorage.setItem(
                `chatbot-${botName}-messages`,
                JSON.stringify(messages.slice(-maxMessages))
            );
        }
    }, [messages, persistMessages, botName, maxMessages]);

    const handleOpen = () => {
        setIsOpen(true);
        onOpen?.();
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose?.();
    };

    const handleSendMessage = async (content: string) => {
        const userMessage: Message = {
            role: 'user',
            content,
            timestamp: new Date(),
            id: `user-${Date.now()}`,
        };

        // Add user message
        setMessages((prev) => [...prev, userMessage].slice(-maxMessages));
        onMessageSent?.(userMessage);

        setIsLoading(true);

        try {
            if (enableStreaming) {
                const assistantMessageId = `assistant-${Date.now()}`;
                const assistantMessage: Message = {
                    role: 'assistant',
                    content: '',
                    timestamp: new Date(),
                    id: assistantMessageId,
                };

                setMessages((prev) => [...prev, assistantMessage].slice(-maxMessages));

                const response = await (onSendMessage as any)(content, (chunk: string) => {
                    setMessages((prev) =>
                        prev.map((m) =>
                            m.id === assistantMessageId
                                ? { ...m, content: m.content + chunk }
                                : m
                        )
                    );
                });

                const finalMessage = {
                    role: 'assistant' as const,
                    content: typeof response === 'string' ? response : '',
                    timestamp: new Date(),
                    id: assistantMessageId,
                };
                onMessageReceived?.(finalMessage);
            } else {
                const response = await onSendMessage(content);

                // Handle regular response
                const assistantMessage: Message = {
                    role: 'assistant',
                    content: response || '',
                    timestamp: new Date(),
                    id: `assistant-${Date.now()}`,
                };

                setMessages((prev) => [...prev, assistantMessage].slice(-maxMessages));
                onMessageReceived?.(assistantMessage);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
                id: `error-${Date.now()}`,
            };
            setMessages((prev) => [...prev, errorMessage].slice(-maxMessages));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ChatIcon
                isOpen={isOpen}
                onClick={isOpen ? handleClose : handleOpen}
                icon={chatbotIcon}
                position={position}
                theme={theme}
            />

            {isOpen && (
                <ChatWindow
                    messages={messages}
                    isLoading={isLoading}
                    onSendMessage={handleSendMessage}
                    onClose={handleClose}
                    botName={botName}
                    placeholder={placeholder}
                    theme={theme}
                    position={position}
                    width={width}
                    height={height}
                    Logo={Logo}
                    customHeader={customHeader}
                    customFooter={customFooter}
                    showBranding={showBranding}
                    enableMarkdown={enableMarkdown}
                    enableCodeHighlighting={enableCodeHighlighting}
                />
            )}
        </>
    );
};


