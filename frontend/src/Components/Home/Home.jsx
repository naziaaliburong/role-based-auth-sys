import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleAdminClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are unauthorized");

      const response = await axios.get("http://localhost:5000/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Admin Response:", response.data);
      navigate('/admin');
    } catch (error) {
      console.error("Error fetching admin route:", error.response?.data || error.message);
      alert('Only admins can access the route');
    }
  };

  const handleUserClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are unauthorized");

      const response = await axios.get("http://localhost:5000/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User Response:", response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error fetching user route:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Welcome to homepage</h1>
      <ul>
        <li onClick={handleAdminClick} style={{cursor: 'pointer', color: 'blue', listStyle: 'none'}}>Admin Only</li>
        <li onClick={handleUserClick} style={{cursor: 'pointer', color: 'blue', listStyle: 'none'}}>User and Admin Both</li>
      </ul>
    </div>
  );
}

export default Home;
