import React from 'react';
import { Streamdown } from 'streamdown';
import { Message as MessageType } from '../types/index';

interface MessageProps {
  message: MessageType;
  theme?: {
    userMessageColor?: string;
    botMessageColor?: string;
    textColor?: string;
  };
  enableMarkdown?: boolean;
}

export const Message: React.FC<MessageProps> = ({ message, theme, enableMarkdown }) => {
  const isUser = message.role === 'user';

  const messageStyle: React.CSSProperties = {
    maxWidth: '85%',
    padding: '10px 14px',
    borderTopRightRadius: isUser ? '2px' : '10px',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    borderTopLeftRadius: isUser ? '10px' : '2px',
    marginBottom: '8px',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    backgroundColor: isUser
      ? theme?.userMessageColor || '#007bff'
      : theme?.botMessageColor || '#e9ecef',
    color: isUser
      ? '#ffffff'
      : theme?.textColor || '#000000',
    wordWrap: 'break-word',
    fontSize: '14px',
    lineHeight: '1.5',
  };

  return (
    <div style={messageStyle}>
      {enableMarkdown ? (
        <React.Suspense fallback={<div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>}>
          <div className="chatbot-markdown">
            <Streamdown>
              {message.content}
            </Streamdown>
          </div>
        </React.Suspense>
      ) : (
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {message.content}
        </div>
      )}
    </div>
  );
};