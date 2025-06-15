# 📝 Todo List App (Next.js)

A simple and interactive Todo List app built with **Next.js App Router** and **React**.  
Todos are persisted using the browser's `localStorage` and support features like add, edit, complete, and delete.

## 📦 Getting Started

https://todolist-tau-sooty.vercel.app/

## 🚀 Features

- ✅ Add a new todo
- 📝 Edit existing todos
- ❌ Delete todos
- ☑️ Mark todos as completed
- 💾 Persist todos in `localStorage`
- 📅 Timestamps for `createdAt` and `updatedAt`
- 🎨 Simple CSS styling with `globals.css`

## 🔧 Technologies Used

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React](https://reactjs.org/)
- TypeScript
- CSS Modules

## 🧠 How It Works

- Todos are managed using `useState` and persisted with `localStorage`
- On initial load (`useEffect`), saved todos are parsed and loaded
- The app distinguishes between *editing mode* and *normal view mode*
- Date objects (`createdAt`, `updatedAt`) are preserved correctly when parsed from `localStorage`

## 📜 License
This project is open-source and available under the MIT License.
