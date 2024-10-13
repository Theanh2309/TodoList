import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { CATEGORY_ITEMS } from "./CategoryList";
const Sidebar = ({ todoItem, handleTodoItemChange, setShowSidebar }) => {
  const [name, setName] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    setName(todoItem.name);
    setIsImportant(todoItem.isImportant);
    setIsCompleted(todoItem.isCompleted);
    setCategory(todoItem.category);
  }, [todoItem]);
  const handleSave = () => {
    // copy lai de ghi de cho nhanh
    const newTodo = {
      ...todoItem,
      name: name,
      isImportant,
      isCompleted,
      category: category,
    };
    handleTodoItemChange(newTodo);
    setShowSidebar(false);
    // setName(null);
    // setIsImportant(null);
    // setIsCompleted(null);
  };
  return (
    <div className="sidebar">
      <form>
        <div className="sb-item">
          <label htmlFor="sb-name">Todo Name</label>
          <input
            id="sb-name"
            name="name"
            type="text"
            // value={todoItem.name}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              //   handleTodoNameChange(todoItem.id, e.target.value);
            }}
          />
        </div>

        <div className="sb-item">
          <label htmlFor="sb-important">Is important?</label>
          <input
            id="sb-important"
            name="important"
            type="checkbox"
            // checked={todoItem.isImportant}
            checked={isImportant}
            onChange={() => setIsImportant(!isImportant)}
          />
        </div>

        <div className="sb-item">
          <label htmlFor="sb-completed">Is completed?</label>
          <input
            id="sb-completed"
            name="completed"
            type="checkbox"
            // checked={todoItem.isCompleted}
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
        </div>

        <div className="sb-item">
          <label htmlFor="sb-important">Is important?</label>
          <input
            id="sb-important"
            name="important"
            type="checkbox"
            // checked={todoItem.isImportant}
            checked={isImportant}
            onChange={() => setIsImportant(!isImportant)}
          />
        </div>
        <div className="sb-item">
          <label htmlFor="sb-important">Category</label>
          <select
            id="sb-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORY_ITEMS.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="sb-footer">
        <button onClick={handleSave}>Save</button>
        <button
          onClick={() => {
            setShowSidebar(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
