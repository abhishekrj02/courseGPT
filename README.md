# Code3

Code3 is an AI-powered platform that generates personalized courses based on user preferences and needs. The application uses Next.js, Tailwind CSS, ShadCN components, Clerk for user authentication, Drizzle PostgreSQL ORM for database management, and Firebase Storage for file storage.

---

## 🚀 Features

- **AI Course Generation**: Generate personalized courses using AI based on user input.
- **Authentication**: Secure login and registration via Clerk.
- **Database Management**: Use Drizzle PostgreSQL ORM for efficient database interaction.
- **File Storage**: Integrated Firebase Storage for user-uploaded file handling.
- **Admin Interface**: Access database management using Drizzle Studio.
- **User-Friendly UI**: Designed with Tailwind CSS and ShadCN pre-built components.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js**: Framework for server-side rendering and optimized frontend development.
- **Tailwind CSS**: A utility-first CSS framework for fast and responsive UI design.
- **ShadCN Components**: A set of pre-built UI components for faster design and prototyping.

### Backend
- **Drizzle PostgreSQL ORM**: Efficient database schema management and queries with PostgreSQL.
- **Clerk Provider**: Authentication mechanism for secure user sessions.
- **Firebase Storage**: Secure, scalable cloud storage for image uploads.

---

## 💻 Installation

### Prerequisites
Make sure you have the following:
- [Node.js](https://nodejs.org/) (v14 or higher)
- A [Firebase](https://firebase.google.com/) account

---

### Clone Repository
First, clone the repository:

```bash
git clone https://github.com/abhishekrj02/Code3.git
cd Code3
```
### Start the Development Server
Finally, start the development server:
```bash
npm run dev
```
Visit http://localhost:3000 to explore the application.

### Open Drizzle Studio
To interact with your database schema visually, launch Drizzle Studio:
```bash
npm run db:studio
```

### Update Database Schema
Apply the database schema migrations:
```bash
npm run db:push
```
---

## 🤝 Contributing
We welcome contributions! If you find bugs, have ideas, or want to improve features, feel free to fork the repo and submit a pull request.

### Steps to Contribute
- Fork the repository.
- Create a new branch:
```bash
git checkout -b feature/your-feature
```
- Make your changes and commit them:
```bash
git commit -m "Add a feature or fix a bug"
```
- Push your branch:
```bash
git push origin feature/your-feature
```
- Open a Pull Request with a description of your changes.

---

