import { useContext, useMemo, useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import { AppContext } from "./context/AppProvider";
function App() {
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      name: "Di choi",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "2",
      name: "Di ngu",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "3",
      name: "Di hoc",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: "travel",
    },
    {
      id: "4",
      name: "Di xem phim",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "idea",
    },
  ]);
  const { selectedCategoryId } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const handleCompleteCheckbox = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          // lấy tất cả các field và cập nhật lại field cần thiết
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleTodoItemClick = (todo) => {
    console.log({ todo });
    setShowSidebar(true);
    setActiveTodoItem(todo);
  };

  const filteredTodo = todoList
    .filter((todo) => {
      // kiem tra search text
      if (!todo.name.includes(searchText)) {
        return false;
      }

      if (selectedCategoryId && todo.category !== selectedCategoryId) {
        return false;
      }
      // kiem tra selected filter
      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant === true;
        case "completed":
          return todo.isCompleted === true;
        case "deleted":
          return todo.isDeleted === true;
        default:
          return false;
      }
    })
    .map((todo) => {
      return (
        <TodoItem
          style={{ padding: "10px", borderRadius: "5px" }}
          key={todo.id}
          todo={todo}
          handleCompleteCheckbox={handleCompleteCheckbox}
          handleTodoItemClick={handleTodoItemClick}
        />
      );
    });

  // lay id cua phan tu dan duoc click va luu vao 1 state(lift up state)
  // ấn vào item nào thì lưu lại item đó và truyền cho Sidebar

  // lay ra item tuong ung voi id

  const [activeTodoItem, setActiveTodoItem] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  //dung state cho input de kiem soat value cua no

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      // tìm đúng việc lần làm thì cập nhật lại nó
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const inputRef = useRef();

  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        todoList={todoList}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="main-content">
        {searchText}
        <input
          style={{ padding: "10px", borderRadius: "5px" }}
          type="text"
          ref={inputRef}
          name="add-new-task"
          placeholder="Add new task"
          className="task-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.target.value;
              setTodoList([
                ...todoList,
                {
                  id: crypto.randomUUID(),
                  name: value,
                  isCompleted: false,
                  isImportant: false,
                  isDeleted: false,
                  category: "personal",
                },
              ]);
              inputRef.current.value = "";
            }
          }}
        />
        <div>{filteredTodo}</div>
        {showSidebar && (
          <Sidebar
            // Tái tạo component:
            // Khi key thay đổi, React sẽ hủy bỏ component cũ và tạo lại một instance mới của component đó. Điều này rất quan trọng trong trường hợp của Sidebar.
            // Tại sao cần tái tạo Sidebar:
            // Mỗi khi người dùng chọn một todo item khác, bạn muốn Sidebar hiển thị thông tin của item mới đó. Nếu không có key, React có thể sẽ không nhận ra rằng nó cần tạo lại Sidebar với dữ liệu mới.

            // key={activeTodoItem.id}

            todoItem={activeTodoItem}
            handleTodoItemChange={handleTodoItemChange}
            setShowSidebar={setShowSidebar}
          />
        )}
      </div>
    </div>
  );
}

export default App;
