import React, { useState, useEffect, useRef } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";

function App() {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("todoItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(items));
  }, [items]);

  function deleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function editItem(id, newText) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  }

  function toggleItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  const dragId = useRef(null);

  function handleDragStart(id) {
    dragId.current = id;
  }

  function handleDragOver(e, overId) {
    e.preventDefault();
    const draggedId = dragId.current;
    if (draggedId === null || draggedId === overId) return;
    setItems((prevItems) => {
      const fromIdx = prevItems.findIndex((i) => i.id === draggedId);
      const toIdx = prevItems.findIndex((i) => i.id === overId);
      if (fromIdx === -1 || toIdx === -1) return prevItems;
      const next = [...prevItems];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      return next;
    });
  }

  function handleDragEnd() {
    dragId.current = null;
  }

  function addItem(inputText) {
    if (!inputText.trim()) return;
    setItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), text: inputText, completed: false },
    ]);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea addItem={addItem} />
      <div>
        <ul>
          {items.map((todoItem) => (
            <ToDoItem
              key={todoItem.id}
              id={todoItem.id}
              text={todoItem.text}
              completed={todoItem.completed}
              onToggle={toggleItem}
              onDelete={deleteItem}
              onEdit={editItem}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
