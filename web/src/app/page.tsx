"use client"

import { useState } from "react"
import { addTodo, removeTodo } from "@/../../shared/todoLogic"

export default function Home() {
  const [todos, setTodos] = useState<Map<string, string>>(new Map())
  const [addTodoInput, setAddTodoInput] = useState<string>("")
  const [updateTodoInput, setUpdateTodoInput] = useState<string>("")
  const [editId, setEditId] = useState<string>("")

  const handleAddTodo = (todoText: string, id: string = "") => {
    if (todoText.trim() === "") return
    if (!id) {
      id = Date.now().toString()
      setAddTodoInput("")
    }
    setTodos(addTodo(todos, id, todoText))
  }

  const handleEditTodo = (id: string, rawText: string, updatedText: string) => {
    if (!editId) {
      setEditId(id)
      setUpdateTodoInput(rawText)
    } else {
      setEditId("")
      handleAddTodo(updatedText, id)
    }
  }

  const handleRemoveTodo = (id: string) => {
    setTodos(removeTodo(todos, id))
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
        {Array.from(todos).map(([todoId, todoText]) => (
          <li key={todoId} className="todo-item">
            {editId == todoId ? <input className="todo-input" value={updateTodoInput} onChange={(e) => setUpdateTodoInput(e.target.value)}></input> : <span className="todo-text">{todoText}</span>}
            <button className="todo-crud-button" onClick={() => handleEditTodo(todoId, todoText, updateTodoInput)}>
              Update
            </button>
            <button className="todo-crud-button" onClick={() => handleRemoveTodo(todoId)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
