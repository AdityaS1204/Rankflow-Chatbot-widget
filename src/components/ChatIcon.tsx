import React from 'react';

import { ChatPosition } from '../types';

interface ChatIconProps {
    isOpen: boolean;
    onClick: () => void;
    icon?: React.ReactNode | string;
    position?: ChatPosition;
    theme?: {
        primaryColor?: string;
    };
}

export const ChatIcon: React.FC<ChatIconProps> = ({
    isOpen,
    onClick,
    icon,
    position = 'bottom-right',
    theme,
}) => {
    const getPositionStyles = (): React.CSSProperties => {
        const base = {
            position: 'fixed' as const,
            zIndex: 9998,
        };

        switch (position) {
            case 'bottom-right':
                return { ...base, bottom: '20px', right: '20px' };
            case 'bottom-left':
                return { ...base, bottom: '20px', left: '20px' };
            case 'top-right':
                return { ...base, top: '20px', right: '20px' };
            case 'top-left':
                return { ...base, top: '20px', left: '20px' };
            default:
                return { ...base, bottom: '20px', right: '20px' };
        }
    };

    const buttonStyle: React.CSSProperties = {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: theme?.primaryColor || '#000000',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease',
        color: '#ffffff',
        fontSize: '24px',
    };

    const renderIcon = () => {
        if (typeof icon === 'string') {
            return <img src={icon} alt="Chat" style={{ width: '30px', height: '30px' }} />;
        }
        if (icon) {
            return icon;
        }
        return isOpen ? '✕' : '💬';
    };

    return (
        <div style={getPositionStyles()}>
            <button
                style={buttonStyle}
                onClick={onClick}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {renderIcon()}
            </button>
        </div>
    );
};