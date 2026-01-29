
import { ReactNode } from 'react';

export interface ChatbotTheme {
    primaryColor?: string;
    userMessageColor?: string;
    botMessageColor?: string;
    textColor?: string;
    backgroundColor?: string;
    headerBackground?: string;
    headerTextColor?: string;
    inputBackground?: string;
    inputTextColor?: string;
    buttonColor?: string;
}

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    id: string;
}

export type ChatPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface ChatbotProps {
    onSendMessage: (message: string) => Promise<string>;
    botName?: string;
    theme?: ChatbotTheme;
    position?: ChatPosition;
    chatbotIcon?: ReactNode | string;
    Logo?: string | ReactNode;
    placeholder?: string;
    welcomeMessage?: string;
    initialMessages?: Message[];
    persistMessages?: boolean;
    maxMessages?: number;
    width?: string | number;
    height?: string | number;
    onOpen?: () => void;
    onClose?: () => void;
    onMessageSent?: (message: Message) => void;
    onMessageReceived?: (message: Message) => void;
    customHeader?: ReactNode;
    customFooter?: ReactNode;
    showBranding?: boolean;
}
