import React, { useState } from "react";
import "./filterpanel.css";
import CategoryList from "./CategoryList";

const FILTER_ITEMS = [
  {
    id: "all",
    label: "ALL",
    icon: "✈️",
  },
  {
    id: "important",
    label: "IMPORTANT",
    icon: "⭐",
  },
  {
    id: "completed",
    label: "COMPLETED",
    icon: "✅",
  },
  {
    id: "deleted",
    label: "DELETE",
    icon: "🗑️",
  },
];

const FilterPanel = ({
  selectedFilterId,
  setSelectedFilterId,
  todoList,
  searchText,
  setSearchText,
}) => {
  // Counting occurrences of particular property value in array of objects [duplicate]

  const getCount = (filterId) => {
    switch (filterId) {
      case "important":
        return todoList.filter((todo) => todo.isImportant === true).length;
      case "completed":
        return todoList.filter((todo) => todo.isCompleted).length;
      case "deleted":
        return todoList.filter((todo) => todo.isDeleted).length;
      case "all":
      default:
        return todoList.length;
    }
  };

  return (
    <>
      <div className="filter-panel">
        <input
          name="search-text"
          placeholder="search"
          className="input-search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* tach ra filterlist cpn */}
        <div className="filter-container">
          {FILTER_ITEMS.map((item) => (
            <div
              className={`filter-item ${
                item.id === selectedFilterId ? "selected" : ""
              }`}
              key={item.id}
              onClick={() => setSelectedFilterId(item.id)}
            >
              <div className="filter-name">
                <span className="icon">{item.icon}</span>
                <p>{item.label}</p>
              </div>
              <p>{getCount(item.id)}</p>
            </div>
          ))}
        </div>
        <CategoryList todoList={todoList} />
      </div>
    </>
  );
};

export default FilterPanel;
