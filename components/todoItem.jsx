import React from "react";

const TodoItem = ({
  title,
  description,
  isCompleted,
  handleUpdate,
  handleDelete,
  id,
}) => {
  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div>
        <input
          onChange={() => handleUpdate(id)}
          type="checkbox"
          checked={isCompleted}
        />
        <button onClick={() => handleDelete(id)} className="btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
