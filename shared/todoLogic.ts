export const addTodo = (todos: Map<string, string>, id: string, text: string): Map<string, string> => {
  todos.set(id, text)
  return todos
}

export const removeTodo = (todos: Map<string, string>, id: string): Map<string, string> => {
  todos.delete(id)
  return todos
}
