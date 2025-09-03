# 🔮 PRISM - AI-Powered Code Editor & Execution Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.0-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Monaco_Editor-VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="Monaco" />
</div>

<br />

**PRISM** is a revolutionary web-based code editor that combines the power of AI assistance with real-time code execution, creating an immersive development experience with stunning visual effects and professional-grade features.

## ✨ Key Features

### 🚀 **Multi-Language Code Execution**

- **Real-time execution** of JavaScript, TypeScript, Python, Java, C++, and C
- **Cloud-based compilation** using Piston API for secure sandboxed execution
- **Instant output display** with error handling and debugging assistance
- **Version-specific runtimes** with optimized performance

### 🤖 **AI-Powered Development Assistant**

- **Multiple AI Models**: Choose from Gemini 2.0 Flash, GPT-4o, GPT-4o mini, DeepSeek V3, and DeepSeek R1
- **Intelligent code explanations** with context-aware responses
- **Smart error resolution** with automatic debugging suggestions
- **Code translation** between programming languages using advanced AI
- **Interactive chat interface** for technical discussions and problem-solving

### 💻 **Professional Code Editor**

- **Monaco Editor integration** (VS Code's editor engine)
- **Advanced syntax highlighting** for all supported languages
- **IntelliSense autocompletion** with smart suggestions
- **Multi-cursor editing** and advanced text manipulation
- **Customizable themes** with smooth animations

### 🎯 **Smart Context Menus & Shortcuts**

- **Right-click context menus** for quick actions on selected code
- **Language translation**: Convert code between different programming languages
- **Explain code**: Get AI explanations for complex code segments
- **Add to chat**: Send selected code directly to AI assistant
- **Keyboard shortcuts** for power users (⌘R for rewrite, ⇧⌘E for explain)

### 🔄 **Advanced Diff View System**

- **Side-by-side comparison** of original and AI-modified code
- **Visual diff highlighting** with accept/reject controls
- **Smart change tracking** with undo/redo functionality
- **Merge conflict resolution** interface

### 🎨 **Stunning Visual Design**

- **Glassmorphism UI** with backdrop blur effects
- **Dynamic backgrounds** with scenic landscapes
- **Smooth animations** powered by Framer Motion
- **Responsive design** that works on all devices
- **Professional dark theme** with carefully crafted color schemes

### 🧠 **State Management & Performance**

- **Zustand store architecture** for efficient state management
- **Optimized re-renders** with selective updates
- **Fast hot reloading** in development mode
- **Memory leak prevention** with proper cleanup

### 🌐 **Modern Web Technologies**

- **Next.js 15** with App Router for optimal performance
- **React 19** with latest concurrent features
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for utility-first styling
- **React Three Fiber** for 3D model rendering

## 🛠️ Technical Architecture

### Frontend Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom design system
- **Components**: Radix UI for accessible, headless components
- **Animations**: Framer Motion for smooth transitions
- **Editor**: Monaco Editor (VS Code engine)
- **3D Graphics**: Three.js with React Three Fiber

### AI Integration

- **Multiple Providers**: Support for Google Gemini, OpenAI, and DeepSeek
- **Streaming Responses**: Real-time AI responses with streaming
- **Context Management**: Intelligent conversation history
- **Error Handling**: Robust error recovery and fallbacks

### Code Execution

- **Piston API**: Secure, sandboxed code execution
- **Multi-language Support**: 6+ programming languages
- **Real-time Output**: Instant execution results
- **Error Analysis**: Detailed error reporting and suggestions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- API keys for AI services (optional for local development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shahidhustles/prism.git
   cd prism
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your API keys:

   ```env
   GEMINI_API_KEY=your_gemini_key_here
   CHATANYWHERE_API_KEY=your_openai_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage Guide

### Basic Code Editing

1. **Select a language** from the dropdown menu
2. **Write your code** in the Monaco editor
3. **Click "Run"** to execute and see results
4. **Use AI chat** for explanations and debugging

### Advanced Features

- **Right-click on selected code** to access context menu
- **Use keyboard shortcuts** for quick actions
- **Accept/Reject AI suggestions** in diff view
- **Interact with 3D model** in the bottom panel

### AI Assistant Commands

- Ask questions about your code
- Request code explanations
- Get debugging help
- Translate between languages
- Generate code snippets

## 🏗️ Project Structure

```
prism/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── chat/         # AI chat endpoint
│   │   └── execute/      # Code execution endpoint
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── AiComposer.tsx    # AI chat interface
│   ├── Background.tsx    # Dynamic background
│   ├── CodeSnippet.tsx   # Code display component
│   ├── Editor.tsx        # Main Monaco editor
│   ├── MarkdownRenderer.tsx # AI response renderer
│   ├── ModelViewer.tsx   # 3D model display
│   ├── Navbar.tsx        # Navigation bar
│   └── Output.tsx        # Code execution output
├── store/                 # Zustand state management
│   ├── diffStore.ts      # Diff view state
│   ├── languageStore.ts  # Language selection
│   ├── messageStore.ts   # Chat messages
│   └── outputStore.ts    # Code execution results
├── actions/              # Server actions
│   └── rewriteInLanguage.ts # AI code translation
└── lib/                  # Utilities and helpers
    └── utils.ts          # Common utilities
```

## 🎯 Why This Project Stands Out

### **Innovation & Technology**

- **Cutting-edge tech stack** with the latest React 19 and Next.js 15
- **Multiple AI model integration** showcasing API expertise
- **Real-time code execution** with professional-grade sandboxing
- **Advanced diff algorithms** for intelligent code comparison

### **User Experience Design**

- **Glassmorphism aesthetic** with modern visual trends
- **Intuitive interactions** with smart context menus
- **Responsive design** that works beautifully on all devices
- **Accessibility-first** approach with Radix UI components

### **Engineering Excellence**

- **Type-safe development** with comprehensive TypeScript usage
- **Performance optimization** with efficient state management
- **Modular architecture** with clean separation of concerns
- **Error handling** with graceful degradation

### **Real-World Application**

- **Educational tool** for learning programming
- **Code playground** for experimentation
- **AI assistant** for problem-solving
- **Professional development** environment

## 🤝 Perfect for College Clubs

This project demonstrates:

- **Full-stack development skills**
- **Modern web technologies**
- **AI/ML integration capabilities**
- **UI/UX design principles**
- **Software architecture knowledge**
- **Problem-solving abilities**

Whether you're interested in **frontend development**, **AI integration**, **developer tools**, or **user experience design**, PRISM showcases proficiency across multiple domains while creating genuine value for developers and learners.

## 🌟 Future Enhancements

- [ ] **Collaborative editing** with real-time synchronization
- [ ] **Version control integration** with Git
- [ ] **Plugin system** for extensibility
- [ ] **Mobile app** for on-the-go coding
- [ ] **Advanced debugging tools** with breakpoints
- [ ] **Code sharing** and embedding features

---

<div align="center">
  <p><strong>Built with ❤️ for the developer community</strong></p>
  <p>Showcasing the perfect blend of AI, modern web technologies, and exceptional user experience</p>
</div>
