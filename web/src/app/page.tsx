"use client"

import { useState } from "react"
import { addTodo, removeTodo } from "@/../../shared/todoLogic"

export default function Home() {
  const [todos, setTodos] = useState<Map<string, string>>(new Map())
  const [input, setInput] = useState<string>("")

  const handleAddTodo = () => {
    if (input.trim() === "") return
    const id = Date.now().toString()
    setTodos(addTodo(todos, id, input))
    setInput("")
  }

  const handleRemoveTodo = (id: string) => {
    setTodos(removeTodo(todos, id))
  }

  return (
    <div id="app-container">
      <h1 id="app-name">Todo List</h1>
      <div id="add-todo-container">
        <input id="todo-list-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a new todo..." />
        <button id="todo-add-button" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <ul id="todo-list">
        {Array.from(todos).map(([todoId, todoText]) => (
          <li key={todoId} className="todo-item">
            <span>{todoText}</span>
            <button className="todo-remove-button" onClick={() => handleRemoveTodo(todoId)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
