import { TodoItem as TodoType } from "@/types"

interface Props {
  todo: TodoType
  isEditing: boolean
  updateInput: string
  onToggle: () => void
  onEdit: () => void
  onSave: () => void
  onDelete: () => void
  onChangeEditInput: (value: string) => void
}

export function TodoItemComponent({ todo, isEditing, updateInput, onToggle, onEdit, onSave, onDelete, onChangeEditInput }: Props) {
  return (
    <li className="todo-item">
      <input type="checkbox" checked={todo.completed} onChange={onToggle} className="todo-checkbox" />

      {isEditing ? <input className="todo-input" value={updateInput} onChange={(e) => onChangeEditInput(e.target.value)} /> : <span className={`todo-text ${todo.completed ? "completed" : ""}`}>{todo.text}</span>}

      <button className="todo-crud-button" onClick={isEditing ? onSave : onEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>

      <button className="todo-crud-button" onClick={onDelete}>
        Delete
      </button>
    </li>
  )
}
