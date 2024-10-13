import React from "react";

const TodoItem = ({
  todo,
  handleCompleteCheckbox,
  handleTodoItemClick,
  style,
}) => {
  const { id, name, isImportant, isCompleted } = todo;
  return (
    <div
      className="todo-item"
      onClick={() => handleTodoItemClick(todo)}
      style={style}
    >
      <div style={{ display: "flex", gap: 4 }}>
        <input
          style={{ width: "20px" }}
          type="checkbox"
          checked={isCompleted}
          onChange={() => {
            handleCompleteCheckbox(id);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <p className="todo-item-text">{name}</p>
      </div>
      {isImportant && <span>⭐</span>}
      {/* window dot */}
    </div>
  );
};

export default TodoItem;
