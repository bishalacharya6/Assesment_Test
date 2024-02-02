// src/components/Signup.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform validation here before sending data to the server
    // Send the form data to your backend for user creation
    fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Signup successful:", data);
        // Redirect to the login page after successful signup
        navigate('/login');
      })
      .catch((error) => {
        console.error("Signup failed:", error);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-6">Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              First Name:
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Last Name:
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
