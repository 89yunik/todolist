import { TodoList } from "../types"

export const persistTodos = (todos: TodoList) => {
  localStorage.setItem("todos", JSON.stringify(todos))
}
