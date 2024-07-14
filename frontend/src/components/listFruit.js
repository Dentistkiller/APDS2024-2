import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Fruit = (props) => (
    <tr>
      <td>{props.fruit.name}</td>
      <td>{props.fruit.comment}</td>
      <td>
        <button className="btn btn-link"
          onClick={() => {
            props.deletefruit(props.fruit._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
   );

   export default function FruitList() {
    const [fruits, setfruits] = useState([]);
     // This method fetches the fruits from the database.
     useEffect(() => {
       async function getfruits() {
         const response = await fetch(`https://localhost:3001/fruit/`);
     
         if (!response.ok) {
           const message = `An error occurred: ${response.statusText}`;
           window.alert(message);
           return;
         }
     
         const fruits = await response.json();
         setfruits(fruits);
       }
     
       getfruits();
     
       return;
     }, [fruits.length]);
     
     // This method will delete a fruit
     async function deletefruit(id) {
      const token = localStorage.getItem("jwt");
       await fetch(`https://localhost:3001/fruit/${id}`, {
         method: "DELETE",
         headers: {
          "Authorization": `Bearer ${token}`,
        },
       });
     
       const newfruits = fruits.filter((el) => el._id !== id);
       setfruits(newfruits);
   }
     // This method will map out the fruits on the table
    function fruitList() {
      return fruits.map((fruit) => {
        return (
          <Fruit
            fruit={fruit}
            deletefruit={() => deletefruit(fruit._id)}
            key={fruit._id}
          />
        );
      });
    }
    // This method fetches the fruits from the database.
    useEffect(() => 
        {
            async function getfruits() 
            {
                const response = await fetch(`https://localhost:3001/fruit/`);
    
                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }
    
                const fruits = await response.json();
                setfruits(fruits);
            }
            getfruits();
            return;
        }, [fruits.length]);

     // create the layout
    return (
      <div>
        <h3>Fruit List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>comment</th>
            </tr>
          </thead>
          <tbody>{fruitList()}</tbody>
        </table>
      </div>
    );
   }