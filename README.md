# Peblo AI - Premium Neural Note-Taking Platform

Peblo AI is a high-end, full-stack productivity platform that combines the elegance of "Dark Luxury" design with the power of Google Gemini AI. It allows users to create, manage, and synthesize their thoughts into a neural knowledge network.

## ✨ Features

- **Luxury UI/UX**: Dark-themed, glassmorphic design with smooth Framer Motion animations.
- **Neural Assistant**: Integrated Google Gemini AI (1.5 Flash) for summarizing, improving, and grammar-checking notes.
- **Auto-Access Auth**: Seamless login experience where accounts are created automatically upon first sign-in.
- **Global Navigation**: Persistent sidebar for effortless switching between Home, Recent Notes, and Settings.
- **Smart Knowledge Base**: Full CRUD functionality with real-time database persistence using MongoDB.

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express.js, Mongoose (MongoDB).
- **AI Engine**: Google Generative AI (Gemini Pro/Flash).
- **Security**: JWT (JSON Web Tokens) for session management.

## 🚀 Getting Started

### Prerequisites
- Node.js installed.
- MongoDB Server running locally on `mongodb://localhost:27017`.
- A Google Gemini API Key from [AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd PebloAI
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # Create a .env file with the following:
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/pebloai
   JWT_SECRET=your_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Setup Frontend**:
   ```bash
   cd ../client
   npm install
   ```

### Running the App

1. **Start Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend App**:
   ```bash
   cd client
   npm run dev
   ```

## 🧠 AI Assistant Usage
To enable the AI power:
1. Open any note in the Editor.
2. Use the **Neural Assistant** sidebar on the right.
3. Ask for summaries, grammar checks, or creative expansions of your notes.

## 📄 License
This project is licensed under the MIT License.
