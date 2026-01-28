import React, { useRef, useEffect, useState } from 'react';
import { Message } from './Message';
import { SendIcon } from './SendIcon';
import { Message as MessageType, ChatbotTheme, ChatPosition } from '../types';

interface ChatWindowProps {
    messages: MessageType[];
    isLoading: boolean;
    onSendMessage: (message: string) => void;
    onClose: () => void;
    companyName: string;
    botName?: string;
    placeholder?: string;
    theme?: ChatbotTheme;
    position?: ChatPosition;
    width?: string | number;
    height?: string | number;
    companyLogo?: string;
    customHeader?: React.ReactNode;
    customFooter?: React.ReactNode;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    messages,
    isLoading,
    onSendMessage,
    onClose,
    companyName,
    botName,
    placeholder = 'Type your message...',
    theme = {},
    position = 'bottom-right',
    width = '380px',
    height = '600px',
    companyLogo,
    customHeader,
    customFooter,
}) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim() || isLoading) return;
        onSendMessage(input);
        setInput('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const getPositionStyles = (): React.CSSProperties => {
        const base = {
            position: 'fixed' as const,
            zIndex: 9999,
        };

        switch (position) {
            case 'bottom-right':
                return { ...base, bottom: '90px', right: '20px' };
            case 'bottom-left':
                return { ...base, bottom: '90px', left: '20px' };
            case 'top-right':
                return { ...base, top: '90px', right: '20px' };
            case 'top-left':
                return { ...base, top: '90px', left: '20px' };
            default:
                return { ...base, bottom: '90px', right: '20px' };
        }
    };

    const containerStyle: React.CSSProperties = {
        ...getPositionStyles(),
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundColor: theme.backgroundColor || '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    };

    const headerStyle: React.CSSProperties = {
        backgroundColor: theme.headerBackground || '#000000ff',
        color: theme.headerTextColor || '#ffffff',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.1)',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
    };

    const messagesContainerStyle: React.CSSProperties = {
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.backgroundColor || '#ffffff',
    };

    const inputContainerStyle: React.CSSProperties = {
        display: 'flex',
        padding: '12px',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: theme.inputBackground || '#ffffffff',
    };

    const inputStyle: React.CSSProperties = {
        flex: 1,
        padding: '10px 12px',
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        color: theme.inputTextColor || '#000000',
        backgroundColor: 'transparent',
    };

    const sendButtonStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        backgroundColor: 'transparent',
        color: '#000000ff',
        border: 'none',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        opacity: isLoading || !input.trim() ? 0.6 : 1,
    };

    const promptBoxStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '0px',
        width: '100%',
        borderRadius: '10px',
        border: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
        paddingRight: '6px',
    }

    const closeButtonStyle: React.CSSProperties = {
        background: 'none',
        border: 'none',
        color: theme.headerTextColor || '#ffffff',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '0',
        lineHeight: '1',
    };

    return (
        <div style={containerStyle}>
            {customHeader || (
                <div style={headerStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {companyLogo && (
                            <img
                                src={companyLogo}
                                alt={companyName}
                                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                            />
                        )}
                        <div style={{ fontWeight: 'semi-bold', fontSize: '16px' }}>
                            {companyName} {botName ? botName : 'AI Agent'}
                        </div>
                    </div>
                    <button
                        style={closeButtonStyle}
                        onClick={onClose}
                        aria-label="Close chat"
                    >
                        ✕
                    </button>
                </div>
            )}

            <div style={messagesContainerStyle}>
                {messages.map((message, index) => (
                    <Message
                        key={message.id || index}
                        message={message}
                        theme={theme}
                    />
                ))}
                {isLoading && (
                    <div style={{
                        alignSelf: 'flex-start',
                        padding: '10px 14px',
                        backgroundColor: theme.botMessageColor || '#e9ecef',
                        borderRadius: '18px',
                        marginBottom: '8px',
                    }}>
                        <span style={{ opacity: 0.6 }}>Typing...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {customFooter || (
                <div style={inputContainerStyle}>
                    <div style={promptBoxStyle}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={placeholder}
                            style={inputStyle}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            style={sendButtonStyle}
                        >
                            <SendIcon />
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};