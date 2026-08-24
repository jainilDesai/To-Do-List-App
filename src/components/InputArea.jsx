import React, { useState } from "react";

function InputArea(props) {
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function submit() {
    props.addItem(inputText);
    setInputText("");
  }

  return (
    <div className="form">
      <input
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        type="text"
        value={inputText}
      />
      <button onClick={submit}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
