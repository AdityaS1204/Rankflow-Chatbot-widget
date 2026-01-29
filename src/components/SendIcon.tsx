import React from 'react';

interface SendIconProps {
  size?: number;
}

export const SendIcon: React.FC<SendIconProps> = ({
  size = 15
}) => {
  return (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M12 20V4M12 4L6 10M12 4L18 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
  );
};