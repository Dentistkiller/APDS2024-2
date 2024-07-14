import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Login() {
 const [form, setForm] = useState({
   name: "",
   password: "",
 });
 const navigate = useNavigate();

 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
// This function will handle the submission.
async function onSubmit(e) {
    e.preventDefault();
  
    // Passes the form data to the API on our backend.
    const newPerson = { ...form };
  
    const response = await fetch("https://localhost:3001/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    const data = await response.json();
    const { token, name } = data;
    console.log(name + " " + token)

    // Save the JWT to localStorage
    localStorage.setItem("jwt", token);

    // Optionally, save the username if needed
    localStorage.setItem("name", name);
  
    setForm({ name: "", password: ""});
    navigate("/");
}
  // HTML for the login page.
 return (
   <div>
     <h3>Login</h3>
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
         <label htmlFor="password">Password</label>
         <input
           type="text"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
    
       <div className="form-group">
         <input
           type="submit"
           value="Login"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}