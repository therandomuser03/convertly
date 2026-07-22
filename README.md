# Convertly

> A modern, fast, and privacy-focused file conversion platform built with Next.js and React. Convertly enables users to compress and convert files directly in the browser with a clean and responsive interface.

## ✨ Features

* ⚡ Fast client-side file processing
* 🖼️ Image compression and optimization (Supports WebP, JPEG, PNG, and AVIF)
* 🔄 Multiple file conversion utilities
* 🌙 Dark and light theme support
* 📱 Fully responsive UI
* 🎨 Modern component architecture with Radix UI
* 🚀 Smooth animations and interactions
* 🔒 Privacy-friendly processing (files remain on the client whenever possible)

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Tailwind CSS v4**
* **Radix UI**
* **Lucide React**
* **Motion**

### State Management

* **Zustand**

### Theming

* **next-themes**

### File Processing & Optimization

* **Sharp**
* **browser-image-compression**
* **@squoosh/lib**

### Utilities

* **clsx**
* **class-variance-authority (CVA)**
* **tailwind-merge**
* **tw-animate-css**

### Development Tools

* **ESLint 9**
* **TypeScript 5**

---

## 📂 Project Structure

```bash
.
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                 # Utility functions
├── store/               # Zustand stores
├── public/              # Static assets
├── hooks/               # Custom React hooks
└── types/               # Shared TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js 20+
* npm, pnpm, or yarn

### Installation

```bash
git clone https://github.com/therandomuser03/convertly.git
cd convertly
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## 🎨 UI & Design

Convertly uses:

* Radix UI primitives for accessibility
* Tailwind CSS v4 for styling
* Motion for animations
* Responsive and theme-aware components

---

## 🔒 Privacy

Convertly prioritizes user privacy by performing file processing directly in the browser whenever possible. Uploaded files are not permanently stored.

---

## 📦 Main Dependencies

```json
{
  "next": "^16.2.10",
  "react": "19.1.0",
  "tailwindcss": "^4",
  "zustand": "^5.0.8",
  "@squoosh/lib": "^0.2.0-0",
  "browser-image-compression": "^2.0.2",
  "sharp": "^0.34.4"
}
```

---

## 📝 Notes

* Updated to reflect **Next.js 16** and **React 19**.
* Corrected development command to `npm run dev`.
* Added missing dependencies used in the project.
* PWA support is **not currently evident from `package.json`**. If PWA functionality exists, consider adding the relevant dependencies and documentation.

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
