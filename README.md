# Prism – Code IDE UI (Design Only)

This document serves as a design brief for the UI of **Prism**, an AI-powered code editor. No logic or functionality is needed — only visual structure, layout, and style.

---

## 🎨 Design Overview

- **Visual Style**: Glassmorphism (blurred translucent containers)
- **Background**: Scenic image (user can change it later)
- **Theme**: Futuristic, elegant, minimal UI
- **Color Mode**: Dark mode by default

---

## 🧱 Main UI Components (Focus Areas)

### 1. 🖊️ Editor Panel
- Use Monaco Editor layout
- Center-left positioning
- Large glassmorphic card with slight padding
- Rounded corners, soft shadow

### 2. 📤 Output Panel
- Below or to the right of editor (configurable)
- Glass-style console with monospaced font
- Space for logs, errors, and program output

### 3. 🤖 AI Composer
- Right-side collapsible drawer or sidebar
- Shows AI chat, suggestions, and debugging tips
- Styled like a messaging UI, in a frosted glass container

---

## 🧭 Secondary UI Components

### 📌 Navbar (Top)
- Fixed at the top of the screen
- Left: Prism logo
- Center: File, Edit, Language dropdowns
- Right: Run button, AI toggle, Spotify toggle

### 🎵 Spotify Player
- Floating, Dynamic Island-style
- Top-right corner
- Displays current song info
- Mini play/pause/skip buttons
- Translucent, blurred background with smooth animation

---

## 🧪 Layout Structure

```plaintext
+----------------------------------------------------------+
| Navbar (Logo | File | Lang | Run | AI | Spotify)        |
+----------------------------+-----------------------------+
|                            | AI Composer (Sidebar)       |
|        Code Editor         |                             |
|                            |                             |
|----------------------------+-----------------------------|
|         Output Panel (Bottom or Side)                    |
+----------------------------------------------------------+
|   Background: Scenic image behind all glass components   |
+----------------------------------------------------------+

Design Tools & Styling
CSS: TailwindCSS (or plain CSS with backdrop-filter, blur)

Corner Radius: 2xl or xl

Shadows: Soft, subtle

Font: Monospaced for code, modern sans-serif for UI

Glass Effect: Use backdrop-blur and bg-white/10 or similar

This file is only for layout and styling. No JavaScript logic, data handling, or integration needed at this stag