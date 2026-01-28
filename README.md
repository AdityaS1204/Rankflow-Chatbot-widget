# React Chatbot Widget

A customizable, reusable chatbot component for React and Next.js applications.

## Status

🚧 Work in progress - Initial development

## Installation
```bash
npm install chatbot-widget
```

## Quick Start
```tsx
import { Chatbot } from 'chatbot-widget';

function App() {
  const handleMessage = async (message: string) => {
    // Your AI integration
    return "Response from AI";
  };

  return (
    <Chatbot
      companyName="My Company"
      onSendMessage={handleMessage}
    />
  );
}
```

## Development

This package is currently under active development.

## License

MIT
