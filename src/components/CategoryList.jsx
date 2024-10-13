import { useContext } from "react";
import "./category.css";
import { AppContext } from "../context/AppProvider";
export const CATEGORY_ITEMS = [
  {
    id: "personal",
    label: "Personal",
  },
  {
    id: "company",
    label: "Company",
  },
  {
    id: "travel",
    label: "Travel",
  },
  {
    id: "idea",
    label: "Idea",
  },
];

const CategoryList = ({ todoList }) => {
  const { selectedCategoryId, setSelectedCategoryId } = useContext(AppContext);
  const getCount = (categoryId) => {
    switch (categoryId) {
      case "personal":
        return todoList.filter((todo) => todo.category === "personal").length;
      case "company":
        return todoList.filter((todo) => todo.category === "company").length;
      case "travel":
        return todoList.filter((todo) => todo.category === "travel").length;
      case "idea":
        return todoList.filter((todo) => todo.category === "idea").length;
      default:
        return todoList.length;
    }
  };
  return (
    <div className="category-container">
      <p>CategoryList</p>
      <div>
        {CATEGORY_ITEMS.map((item) => {
          return (
            <div
              key={item.id}
              className={`category-item ${
                item.id === selectedCategoryId ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedCategoryId(item.id);
              }}
            >
              <p className="category-name">{item.label}</p>
              <p>{getCount(item.id)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
