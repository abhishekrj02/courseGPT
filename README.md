# CourseGPT

CourseGPT is an AI-powered platform that instantly generates personalized courses based on your topic, difficulty, and preferences. Built with Next.js and powered by Google Gemini, it delivers structured course content with chapters, quizzes, and a built-in AI course assistant.

---

## Features

- **AI Course Generation** — Generate full courses with chapters and content using Google Gemini
- **Course Assistant Chatbox** — Floating AI chatbot on every course page, context-aware of the course topic
- **Light / Dark Theme** — Toggle between light and dark mode with localStorage persistence
- **Thumbnail Upload** — Upload custom course banners via Firebase Storage
- **Collapsible Sidebar** — Desktop sidebar collapses to icon-only mode
- **Authentication** — Secure sign-in and user sessions via Clerk
- **Explore Courses** — Browse all publicly published courses
- **Mobile Friendly** — Responsive layout with mobile chapter drawer on course pages

---

## Tech Stack

### Frontend
- **Next.js 15** — App Router, server components, and API routes
- **Tailwind CSS** — Utility-first styling with semantic dark/light mode tokens
- **shadcn/ui** — Pre-built accessible UI components
- **Clerk** — Authentication and user management
- **Firebase Storage** — Course banner image uploads
- **Google Gemini** (`gemini-2.5-flash`) — AI course and content generation
- **Axios** — HTTP client for API calls
- **Lucide React** — Icon library

### Backend
- **Express.js** — REST API server
- **MongoDB + Mongoose** — Database and schema modeling
- **Clerk SDK** — Server-side auth middleware

---

## Project Structure

```
CourseGPT/
├── frontend/          # Next.js app
│   ├── app/
│   │   ├── api/chat/  # Chat API route (Gemini)
│   │   ├── course/    # Course viewer pages
│   │   ├── create-course/  # Course creation flow
│   │   ├── dashboard/ # User dashboard
│   │   └── _context/  # Theme + user context providers
│   └── config/        # Firebase + AI model config
└── backend/           # Express REST API
    ├── controllers/
    ├── models/
    ├── routes/
    └── middleware/
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- A [MongoDB](https://www.mongodb.com/) database
- A [Firebase](https://firebase.google.com/) project (Storage enabled)
- A [Clerk](https://clerk.com/) app
- A [Google Gemini](https://ai.google.dev/) API key

### Clone the repo

```bash
git clone https://github.com/abhishekrj02/CourseGPT.git
cd CourseGPT
```

### Setup Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
PORT=5000
```

Start the backend:

```bash
npm start
```

### Setup Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Start the frontend:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Contributing

Contributions are welcome! Fork the repo, create a feature branch, and open a pull request.

```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

---

## License

MIT
