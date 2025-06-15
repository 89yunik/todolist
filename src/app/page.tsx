"use client"

import { useEffect, useState } from "react"
import { TodoItem, TodoList } from "./types"

export default function Home() {
  const [todos, setTodos] = useState<TodoList>([])
  const [addTodoInput, setAddTodoInput] = useState<string>("")
  const [updateTodoInput, setUpdateTodoInput] = useState<string>("")
  const [editId, setEditId] = useState<string>("")

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos)
        setTodos(
          parsedTodos.map((todo: TodoItem) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            updatedAt: new Date(todo.updatedAt),
          }))
        )
      } catch (error) {
        console.error("Failed to parse todos from localStorage:", error)
        setTodos([])
      }
    }
  }, [])

  const handleAddTodo = (todoText: string, existingId?: string) => {
    if (todoText.trim() === "") return

    const now = new Date()

    if (existingId) {
      // 기존 todo 업데이트
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === existingId ? { ...todo, text: todoText, updatedAt: now } : todo)))
    } else {
      // 새 todo 추가
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: todoText,
        completed: false,
        createdAt: now,
        updatedAt: now,
      }
      setTodos((prevTodos) => [...prevTodos, newTodo])
      setAddTodoInput("")
    }

    // localStorage에 저장
    const updatedTodos = existingId
      ? todos.map((todo) => (todo.id === existingId ? { ...todo, text: todoText, updatedAt: now } : todo))
      : [
          ...todos,
          {
            id: existingId || Date.now().toString(),
            text: todoText,
            completed: false,
            createdAt: now,
            updatedAt: now,
          },
        ]

    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const handleEditTodo = (id: string, currentText: string, updatedText: string) => {
    if (!editId) {
      setEditId(id)
      setUpdateTodoInput(currentText)
    } else {
      setEditId("")
      handleAddTodo(updatedText, id)
    }
  }

  const handleRemoveTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const handleToggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date() } : todo))
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  return (
    <div id="app-container">
      <h1 id="app-name">Todo List</h1>
      <div id="add-todo-container">
        <input id="add-todo-input" className="todo-input" type="text" value={addTodoInput} onChange={(e) => setAddTodoInput(e.target.value)} placeholder="Add a new todo..." />
        <button className="todo-crud-button" onClick={() => handleAddTodo(addTodoInput)}>
          Add Todo
        </button>
      </div>

      <ul id="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <input type="checkbox" checked={todo.completed} onChange={() => handleToggleComplete(todo.id)} className="todo-checkbox" />

              {editId === todo.id ? (
                <input className="todo-input" value={updateTodoInput} onChange={(e) => setUpdateTodoInput(e.target.value)} />
              ) : (
                <span className={`todo-text ${todo.completed ? "completed" : ""}`} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.text}
                </span>
              )}

              <button className="todo-crud-button" onClick={() => handleEditTodo(todo.id, todo.text, updateTodoInput)}>
                {editId === todo.id ? "Save" : "Edit"}
              </button>

              <button className="todo-crud-button" onClick={() => handleRemoveTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <li className="empty-message"></li>
        )}
      </ul>
    </div>
  )
}
