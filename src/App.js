import { useEffect, useState } from "react";
import './index.css';
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState(null);

  // Function to check for duplicate IDs
  const checkUniqueIds = (data) => {
    const ids = data.map(item => item._id);
    const uniqueIds = new Set(ids);

    if (ids.length !== uniqueIds.size) {
      console.warn('Duplicate IDs found');
    }
  };

  useEffect(() => {
    getAllToDo((data) => {
      console.log('Fetched to-dos:', data);
      checkUniqueIds(data); // Check for unique IDs
      setToDo(data);
    });
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const handleAddOrUpdate = () => {
    if (isUpdating) {
      updateToDo(toDoId, text, setToDo, setText, setIsUpdating);
    } else {
      addToDo(text, setText, setToDo);
    }
  };

  const handleInputChange = (e) => setText(e.target.value);

  return (
    <div className="App">
      <div className="container">
        <h1>ToDoMatic App</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add Todos.."
            value={text}
            onChange={handleInputChange}
          />
        </div>
        <div
          className="add"
          onClick={handleAddOrUpdate}
        >
          {isUpdating ? "Update" : "Add"}
        </div>
      </div>
      <div className="list">
        {toDo.map((item) => (
          <ToDo
            key={item._id} // Ensure each child has a unique "key" prop
            text={item.text}
            updateMode={() => updateMode(item._id, item.text)}
            deleteToDo={() => deleteToDo(item._id, setToDo)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
