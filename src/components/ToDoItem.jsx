import React, { useState, useRef, useEffect } from "react";

function ToDoItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(props.text);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }, [isEditing, draft]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const el = textareaRef.current;
      const len = el.value.length;
      el.setSelectionRange(len, len);
    }
  }, [isEditing]);

  function saveEdit() {
    const trimmed = draft.trim();
    if (trimmed) {
      props.onEdit(props.id, trimmed);
    } else {
      setDraft(props.text);
    }
    setIsEditing(false);
  }

  return (
    <div
      className="todo-item"
      draggable={!isEditing}
      onDragStart={() => props.onDragStart(props.id)}
      onDragOver={(e) => props.onDragOver(e, props.id)}
      onDragEnd={props.onDragEnd}
    >
      {isEditing ? (
        <textarea
          ref={textareaRef}
          className="edit-input"
          value={draft}
          autoFocus
          rows={1}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              saveEdit();
            }
            if (e.key === "Escape") {
              setDraft(props.text);
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <li
          onClick={() => props.onToggle(props.id)}
          style={{
            textDecoration: props.completed ? "line-through" : "none",
            cursor: "pointer",
          }}
        >
          {props.text}
        </li>
      )}
      <button
        className="edit-btn"
        onClick={() => {
          setDraft(props.text);
          setIsEditing(true);
        }}
      >
        ✎
      </button>
      <button
        className="delete-btn"
        onClick={() => props.onDelete(props.id)}
      >
        X
      </button>
    </div>
  );
}

export default ToDoItem;
