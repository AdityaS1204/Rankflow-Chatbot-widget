# RankFlow Chatbot Widget

A customizable, production-ready chatbot component for React and Next.js applications. Designed for seamless integration, high performance, and deep customizability.

[![npm version](https://img.shields.io/npm/v/rankflow-chatbot-widget.svg)](https://www.npmjs.com/package/rankflow-chatbot-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **TypeScript Native**: Full type safety for props and themes.
- **Streaming Markdown**: Real-time rendering of AI responses with Vercel's Streamdown.
- **Code Syntax Highlighting**: Professional code blocks with Shiki (requires `enableCodeHighlighting`).
- **Dynamic Textarea**: Smart auto-expanding input field with support for multiline messages.
- **Persistence**: Optional message history persistence using `localStorage`.
- **Theming API**: Granular control over colors, sizing, and positioning.

## Installation

```bash
npm install rankflow-chatbot-widget
```

## Quick Start

### Basic Usage

```tsx
import { Chatbot } from 'rankflow-chatbot-widget';

const App = () => {
  const handleSendMessage = async (text: string) => {
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

### Streaming Example (Markdown & Code Highlighting)

```tsx
import { Chatbot } from 'rankflow-chatbot-widget';

const App = () => {
  const handleStreamingMessage = async (text: string, updateMessage: (chunk: string) => void) => {
    // Example using an AI SDK that supports streaming
    const response = await fetch('/api/chat', {
       method: 'POST',
       body: JSON.stringify({ message: text })
    });
    
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      updateMessage(chunk); // Update the UI in real-time
    }
  };

  return (
    <Chatbot
      botName="Assistant"
      enableStreaming={true}
      enableMarkdown={true}
      enableCodeHighlighting={true}
      onSendMessage={handleStreamingMessage}
    />
  );
};
```

## API Reference

### Component Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onSendMessage` | `(msg: string, update?: (chunk: string) => void) => Promise<string \| void>` | *Required* | Async function called when a message is sent. Supports streaming if `enableStreaming` is true. |
| `enableStreaming` | `boolean` | `false` | Enable support for chunk-based message updates (useful for LLMs). |
| `enableMarkdown` | `boolean` | `false` | Renders bot responses using Markdown. |
| `enableCodeHighlighting` | `boolean` | `false` | Enables syntax highlighting for code blocks (requires `enableMarkdown`). |
| `botName` | `string` | `"AI Agent"` | Header display name. |
| `welcomeMessage` | `string` | (Contextual) | Initial greeting message. |
| `Logo` | `string \| ReactNode` | `null` | Header logo (URL string or React component). |
| `placeholder` | `string` | `"Type your message..."` | Input field placeholder text. |
| `position` | `ChatPosition` | `"bottom-right"` | Window placement on screen. |
| `persistMessages` | `boolean` | `false` | Enable/disable message history persistence. |
| `showBranding` | `boolean` | `true` | Toggle the "Powered by RankFlow" branding footer. |
| `maxMessages` | `number` | `100` | Maximum number of messages kept in history. |
| `theme` | `ChatbotTheme` | `{}` | Customization object for UI elements. |
| `onMessageSent` | `(msg: Message) => void` | `undefined` | Callback fired when user sends a message. |
| `onMessageReceived` | `(msg: Message) => void` | `undefined` | Callback fired when bot responds. |

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
