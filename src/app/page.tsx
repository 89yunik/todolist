"use client"

import { useEffect, useState } from "react"
import { TodoItem, TodoList } from "../types"
import { persistTodos } from "../utils/todoStorage"
import { TodoItemComponent } from "../components/TodoItem"

export default function Home() {
  const [todos, setTodos] = useState<TodoList>([])
  const [addTodoInput, setAddTodoInput] = useState<string>("")
  // const [updateTodoInput, setUpdateTodoInput] = useState<string>("")
  // const [currentEditingId, setEditId] = useState<string>("")
  const [editing, setEditing] = useState<{ id: string; text: string }>({ id: "", text: "" })

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos)
        if (Array.isArray(parsedTodos))
          setTodos(
            parsedTodos.map((todo: TodoItem) => ({
              ...todo,
              createdAt: new Date(todo.createdAt),
              updatedAt: new Date(todo.updatedAt),
            }))
          )
      } catch (error) {
        console.error("Failed to parse todos from localStorage:", error)
      }
    }
  }, [])

  const saveTodo = (todoText: string, existingId?: string) => {
    if (todoText.trim() === "") return

    const now = new Date()

    let updatedTodos: TodoList
    if (existingId) {
      // 기존 todo 업데이트
      updatedTodos = todos.map((todo) => (todo.id === existingId ? { ...todo, text: todoText, updatedAt: now } : todo))
    } else {
      // 새 todo 추가
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: todoText,
        completed: false,
        createdAt: now,
        updatedAt: now,
      }
      updatedTodos = [...todos, newTodo]
      setAddTodoInput("")
    }
    setTodos(updatedTodos)

    // localStorage에 저장
    persistTodos(updatedTodos)
  }

  const startEditingTodo = (id: string, text: string) => setEditing({ ...editing, id, text })

  const saveEditedTodo = (updatedText: string, id: string) => {
    saveTodo(updatedText, id)
    setEditing({ ...editing, id: "" })
  }

  const handleRemoveTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
    persistTodos(newTodos)
  }

  const handleToggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date() } : todo))
    setTodos(updatedTodos)
    persistTodos(updatedTodos)
  }

  return (
    <div id="app-container">
      <h1 id="app-name">Todo List</h1>
      <div id="add-todo-container">
        <input id="add-todo-input" className="todo-input" type="text" value={addTodoInput} onChange={(e) => setAddTodoInput(e.target.value)} placeholder="Add a new todo..." />
        <button className="todo-crud-button" onClick={() => saveTodo(addTodoInput)}>
          Add Todo
        </button>
      </div>

      <ul id="todo-list">{todos.length > 0 ? todos.map((todo) => <TodoItemComponent key={todo.id} todo={todo} isEditing={editing.id === todo.id} updateInput={editing.text} onToggle={() => handleToggleComplete(todo.id)} onEdit={() => startEditingTodo(todo.id, todo.text)} onSave={() => saveEditedTodo(editing.text, todo.id)} onDelete={() => handleRemoveTodo(todo.id)} onChangeEditInput={(newText) => setEditing({ ...editing, text: newText })} />) : <li className="empty-message"></li>}</ul>
    </div>
  )
}
