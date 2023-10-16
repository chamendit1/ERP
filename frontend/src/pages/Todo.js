import React, { useState } from 'react'

const Todo = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async e => {
      e.preventDefault();
      try {
        const body = { description };
        const response = await fetch("http://localhost:5002/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
  
        // window.location = "/";
      } catch (err) {
        console.error(err.message);
      }
    };

  return (
    <>
    <h1 className="text-center mt-5">Pern Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  )
}

export default Todo