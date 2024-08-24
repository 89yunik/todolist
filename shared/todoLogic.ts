export const addTodo = (prevTodos: Map<string, string>, id: string, input: string): Map<string, string> => {
  const newTodos = new Map(prevTodos)
  newTodos.set(id, input)
  return newTodos
}

export const removeTodo = (prevTodos: Map<string, string>, id: string): Map<string, string> => {
  const newTodos = new Map(prevTodos)
  newTodos.delete(id)
  return newTodos
}
