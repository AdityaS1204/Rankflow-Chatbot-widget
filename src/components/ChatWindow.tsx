import React, { useRef, useEffect, useState } from 'react';
import { Message } from './Message';
import { SendIcon } from './SendIcon';
import { ScrollBottomIcon } from './ScrollBottomIcon';
import { Message as MessageType, ChatbotTheme, ChatPosition } from '../types';

interface ChatWindowProps {
    messages: MessageType[];
    isLoading: boolean;
    onSendMessage: (message: string) => void;
    onClose: () => void;
    botName?: string;
    placeholder?: string;
    theme?: ChatbotTheme;
    position?: ChatPosition;
    width?: string | number;
    height?: string | number;
    Logo?: string | React.ReactNode;
    customHeader?: React.ReactNode;
    customFooter?: React.ReactNode;
    showBranding?: boolean;
    enableMarkdown?: boolean;
    enableCodeHighlighting?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    messages,
    isLoading,
    onSendMessage,
    onClose,
    botName,
    placeholder = 'Type your message...',
    theme = {},
    position = 'bottom-right',
    width = '400px',
    height = '590px',
    Logo,
    customHeader,
    customFooter,
    showBranding = true,
    enableMarkdown = false,
    enableCodeHighlighting = false,
}) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
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
        borderRadius: '20px',
        boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    };

    const headerStyle: React.CSSProperties = {
        backgroundColor: theme.headerBackground || '#000000ff',
        color: theme.headerTextColor || '#ffffff',
        padding: '20px',
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
        padding: '6px',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: theme.inputBackground || '#ffffffff',
    };

    const inputStyle: React.CSSProperties = {
        flex: 1,
        padding: '2px 0px 7px 15px',
        marginTop: '8px',
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        color: theme.inputTextColor || '#000000',
        backgroundColor: 'transparent',
        resize: 'none',
        maxHeight: '150px',
        overflowY: 'auto',
        lineHeight: '1.2',
        fontFamily: 'inherit',
    };

    const sendButtonStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        backgroundColor: '#000000',
        color: '#ffffff',
        border: 'none',
        borderRadius: '50%',
        marginBottom: '6px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        opacity: isLoading || !input.trim() ? 0.6 : 1,
    };

    const promptBoxStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'flex-end',

        gap: '0px',
        width: '100%',
        borderRadius: '20px',
        border: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
        paddingRight: '6px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
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

    const [showScrollBottom, setShowScrollBottom] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (messagesContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
            // Show button if we are more than 100px away from the bottom
            setShowScrollBottom(scrollHeight - scrollTop - clientHeight > 100);
        }
    };

    const scrollToBottomAuto = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    return (
        <div style={containerStyle}>
            <style>
                {`
                    .chatbot-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .chatbot-scrollbar::-webkit-scrollbar-track {
                        background: #ffffff;
                    }
                    .chatbot-scrollbar::-webkit-scrollbar-thumb {
                        background: #e0e0e0;
                        border-radius: 10px;
                    }
                    .chatbot-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #d0d0d0;
                    }
                    .chatbot-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: #e0e0e0 #ffffff;
                    }
                    @keyframes wave {
                        0%, 60%, 100% { transform: translateY(0); }
                        30% { transform: translateY(-4px); }
                    }
                    .typing-dot {
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        background-color: #000000;
                        opacity: 0.4;
                        margin: 0 1.5px;
                        animation: wave 1.3s infinite;
                    }
                    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
                    .rankflow-branding-link {
                        color: #666;
                        text-decoration: none;
                        transition: color 0.2s, text-decoration 0.2s;
                    }
                    .rankflow-branding-link:hover {
                        color: #007bff !important;
                        text-decoration: underline !important;
                    }
                    /* Markdown Styles */
                    .chatbot-markdown p { margin: 0 0 8px 0; }
                    .chatbot-markdown p:last-child { margin-bottom: 0; }
                    .chatbot-markdown ul, .chatbot-markdown ol { margin: 8px 0; padding-left: 20px; }
                    .chatbot-markdown li { margin-bottom: 4px; }
                    .chatbot-markdown code { 
                        background: rgba(0,0,0,0.05); 
                        padding: 2px 4px; 
                        border-radius: 4px; 
                        font-family: monospace; 
                    }
                    .chatbot-markdown pre { 
                        background: #1e1e1e; 
                        color: #ffffff;
                        padding: 12px; 
                        border-radius: 8px; 
                        overflow-x: auto;
                        margin: 10px 0;
                    }
                    .chatbot-markdown pre code { background: none; padding: 0; color: inherit; }
                `}
            </style>
            {customHeader || (
                <div style={headerStyle}>
                    {/* ... header content ... */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {Logo && (
                            typeof Logo === 'string' ? (
                                <img
                                    src={Logo}
                                    alt={botName}
                                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {Logo}
                                </div>
                            )
                        )}
                        <div style={{ fontWeight: 'semi-bold', fontSize: '16px' }}>
                            {botName ? botName : 'AI Agent'}
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

            <div
                ref={messagesContainerRef}
                style={messagesContainerStyle}
                onScroll={handleScroll}
                className="chatbot-scrollbar"
            >
                {messages.map((message, index) => (
                    <Message
                        key={message.id || index}
                        message={message}
                        theme={theme}
                        enableMarkdown={enableMarkdown}
                        enableCodeHighlighting={enableCodeHighlighting}
                    />
                ))}
                {isLoading && (
                    <div style={{
                        alignSelf: 'flex-start',
                        padding: '12px 16px',
                        backgroundColor: theme.botMessageColor || '#e9ecef',
                        borderRadius: '18px',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px'
                    }}>
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                    </div>
                )}
                <div ref={messagesEndRef} />
                {showScrollBottom && (
                    <button
                        onClick={scrollToBottomAuto}
                        style={{
                            position: 'sticky',
                            bottom: '2px',
                            right: '10px',
                            alignSelf: 'flex-end',
                            marginRight: '20px',
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                            zIndex: 10,
                            padding: 6,
                        }}
                        aria-label="Scroll to bottom"
                    >
                        <ScrollBottomIcon size={25} />
                    </button>
                )}
            </div>



            {customFooter || (
                <div style={inputContainerStyle}>
                    <div style={promptBoxStyle}>
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={placeholder}
                            style={inputStyle}
                            disabled={isLoading}
                            rows={1}
                            className="chatbot-scrollbar"
                        />
                        {input && (<button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            style={sendButtonStyle}
                        >
                            <SendIcon />
                        </button>)}
                    </div>
                </div>
            )}

            {showBranding && (
                <div style={{
                    padding: '4px 0 8px 0',
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#999',
                    backgroundColor: theme.inputBackground || '#ffffff',
                }}>
                    ⚡️Powered by{' '}
                    <a
                        href="https://rankflow.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rankflow-branding-link"
                    >
                        Rankflow
                    </a>
                </div>
            )}
        </div>
    );
};