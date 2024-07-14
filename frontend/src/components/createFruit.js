import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [form, setForm] = useState({
    name: "",
    comment: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Function to handle form submission
  async function onSubmit(e) {
    e.preventDefault();
    
    const token = localStorage.getItem("jwt");

    const newDocument = {
      name: form.name,
      comment: form.comment,
    };

    try {
      const response = await fetch("https://localhost:3001/fruit/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newDocument),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Record created:", result);
      setForm({ name: "", comment: "" });
      navigate("/");
    } catch (error) {
      window.alert(error);
    }
  }

  return (
    <div>
      <h3>Create New Post</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Fruit Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            className="form-control"
            id="comment"
            value={form.comment}
            onChange={(e) => updateForm({ comment: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Fruit"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
