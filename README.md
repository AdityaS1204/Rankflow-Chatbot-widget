# React Chatbot Widget

A beautiful, high-performance, and fully customizable chatbot component for React and Next.js applications.

## Features

- 🚀 **Lightweight & Fast**: Built with TypeScript and optimized for performance.
- ✨ **Modern UI**: Sleek, premium design with smooth animations.
- 📱 **Responsive**: Works perfectly on desktop and mobile.
- 🎨 **Fully Customizable**: Personalize colors, icons, and behavior via themes and props.
- 📝 **Dynamic Input**: Auto-expanding textarea for a seamless typing experience.
- 📦 **Zero Dependencies**: Minimal footprint on your bundle size.

## Installation

```bash
npm install react-chatbot-widget
```

## Quick Start

```tsx
import { Chatbot } from 'react-chatbot-widget';

function App() {
  const handleMessage = async (message: string) => {
    // Your AI integration (e.g., OpenAI, Gemini, etc.)
    const response = await fetch('/api/chat', {
       method: 'POST',
       body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data.reply;
  };

  return (
    <Chatbot
      botName="Assistant"
      onSendMessage={handleMessage}
      welcomeMessage="Hi there! How can I help you today?"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSendMessage` | `(msg: string) => Promise<string>` | **Required** | Handler for user messages, must return bot response. |
| `botName` | `string` | `"AI Agent"` | Name displayed in the chat header. |
| `welcomeMessage`| `string` | (Automatic) | The initial message shown to the user. |
| `Logo` | `string \| ReactNode` | `null` | Logo displayed in the chat header. |
| `placeholder` | `string` | `"Type your message..."`| Input field placeholder. |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Window position. |
| `persistMessages`| `boolean` | `false` | Whether to save chat history in localStorage. |
| `theme` | `ChatbotTheme` | `{}` | Custom styling object (see below). |

### Customizing the Theme

```tsx
const myTheme = {
  primaryColor: '#000000',
  backgroundColor: '#ffffff',
  userMessageColor: '#000000',
  botMessageColor: '#f3f4f6',
  textColor: '#1f2937'
};

<Chatbot theme={myTheme} ... />
```

## Development

```bash
# Install dependencies
npm install

# Run build
npm run build

# Run in watch mode
npm run dev
```

## License

MIT © [Aditya](https://github.com/AdityaS1204)
