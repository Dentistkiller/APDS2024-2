import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const [form, setForm] = useState({
    name: "",
    comment: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  //fetches data for a specific record
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("jwt");

      try {
        const response = await fetch(`https://localhost:3001/fruit/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setForm({ name: result.name, comment: result.comment });
      } catch (error) {
        window.alert(error);
      }
    }

    fetchData();
  }, [id]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Function to handle form submission
  async function onSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("jwt");

    const updates = {
      name: form.name,
      comment: form.comment,
    };

    try {
      const response = await fetch(`https://localhost:3001/fruit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Record updated:", result);
      navigate("/");
    } catch (error) {
      window.alert(error);
    }
  }

  return (
    <div>
      <h3>Edit Fruit</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
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
            value="Update Fruit"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
