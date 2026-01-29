# RankFlow Chatbot Widget

A customizable, production-ready chatbot component for React and Next.js applications. Designed for seamless integration, high performance, and deep customizability.

[![npm version](https://img.shields.io/npm/v/rankflow-chatbot-widget.svg)](https://www.npmjs.com/package/rankflow-chatbot-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **TypeScript Native**: Full type safety for props and themes.
- **Dynamic Textarea**: Smart auto-expanding input field with support for multiline messages.
- **Persistence**: Optional message history persistence using `localStorage`.
- **Zero Configuration**: Sensible defaults for immediate deployment.
- **Theming API**: Granular control over colors, sizing, and positioning.
- **Responsive Design**: Optimized for mobile and desktop viewports.

## Installation

```bash
npm install rankflow-chatbot-widget
```

## Quick Start

```tsx
import { Chatbot } from 'rankflow-chatbot-widget';

const App = () => {
  const handleSendMessage = async (text: string) => {
    // Integrate with your backend API or LLM (e.g., OpenAI, Gemini)
    const response = await api.chat({ message: text });
    return response.content;
  };

  return (
    <Chatbot
      botName="RankFlow Support"
      onSendMessage={handleSendMessage}
      welcomeMessage="Hi! How can I assist you today?"
    />
  );
};
```

## API Reference

### Component Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onSendMessage` | `(msg: string) => Promise<string>` | *Required* | Async function called when a message is sent. |
| `botName` | `string` | `"AI Agent"` | Header display name. |
| `welcomeMessage` | `string` | (Contextual) | Initial greeting message. |
| `Logo` | `string \| ReactNode` | `null` | Header logo (URL string or React component). |
| `placeholder` | `string` | `"Type your message..."` | Input field placeholder text. |
| `position` | `ChatPosition` | `"bottom-right"` | Window placement on screen. |
| `persistMessages` | `boolean` | `false` | Enable/disable message history persistence. |
| `maxMessages` | `number` | `100` | Maximum number of messages kept in history. |
| `theme` | `ChatbotTheme` | `{}` | Customization object for UI elements. |

### Theme Configuration

The `theme` prop allows you to override default styles to match your application's design system.

```tsx
const customTheme = {
  primaryColor: '#000000',     // Header and primary actions
  backgroundColor: '#ffffff',  // Chat window background
  userMessageColor: '#000000', // User message bubble background
  botMessageColor: '#f3f4f6',  // Bot message bubble background
  textColor: '#1f2937'         // Main text color
};
```

## Technical Details

- **Built with**: React, TypeScript, and Tsup.
- **Compatibility**: React 16.8+ (Hooks required).
- **Styling**: Inline styles for maximum compatibility across different build environments (no external CSS dependencies).

## License

MIT © [Aditya](https://github.com/AdityaS1204)
