import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../App.css'; 

export default function EditPost() {
  const [post, setPost] = useState({
    user: "",
    content: "",
    image: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the post data when the component mounts
  useEffect(() => {
    async function getPost() {
      const response = await fetch(`https://localhost:3001/posts/${id}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const post = await response.json();
      setPost(post);
    }

    getPost();

    return;
  }, [id]);

  function updateForm(value) {
    return setPost((prev) => {
      return { ...prev, ...value };
    });
  }

  // Function to handle form submission
  async function onSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("jwt");

    const updatedPost = {
      content: post.content,
    };

    try {
      const response = await fetch(`https://localhost:3001/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Post updated:", result);
      navigate("/");
    } catch (error) {
      window.alert(error);
    }
  }

  return (
    <div className="container">
      <h3 className="header">Edit Post</h3>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <label htmlFor="user">User</label>
          <input
            type="text"
            className="form-control"
            id="user"
            value={post.user}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <input
            type="text"
            className="form-control"
            id="content"
            value={post.content}
            onChange={(e) => updateForm({ content: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={post.image}
            disabled
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Post"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}