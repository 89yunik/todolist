// types.ts (별도 파일로 분리 권장)
export interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export type TodoList = TodoItem[]
