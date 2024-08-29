"use client"

interface Todo {
  [key: string]: string
}

import { useState } from "react"

export default function Home() {
  const [todos, setTodos] = useState<Todo>()
  const [addTodoInput, setAddTodoInput] = useState<string>("")
  const [updateTodoInput, setUpdateTodoInput] = useState<string>("")
  const [editId, setEditId] = useState<string>("")

  const handleAddTodo = (todoText: string, id: string = "") => {
    if (todoText.trim() === "") return
    if (!id) {
      id = Date.now().toString()
      setAddTodoInput("")
    }
    const newTodos: Todo = { ...todos, id: todoText }
    setTodos(newTodos)
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
    const { [id]: _, ...newTodos } = todos as Todo
    setTodos(newTodos)
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
        {todos
          ? Object.entries(todos).map(([todoId, todoText]) => (
              <li key={todoId} className="todo-item">
                {editId == todoId ? <input className="todo-input" value={updateTodoInput} onChange={(e) => setUpdateTodoInput(e.target.value)}></input> : <span className="todo-text">{todoText}</span>}
                <button className="todo-crud-button" onClick={() => handleEditTodo(todoId, todoText, updateTodoInput)}>
                  Update
                </button>
                <button className="todo-crud-button" onClick={() => handleRemoveTodo(todoId)}>
                  Delete
                </button>
              </li>
            ))
          : ""}
      </ul>
    </div>
  )
}
