import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if either username or password is empty
    if (!credentials.username || !credentials.password) {
      alert('Please enter both username and password.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: credentials.username, password: credentials.password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        history('/');
      } else {
        // Display error in an alert
        alert(json.error || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      // Display a generic error in case of unexpected issues
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form className="m-3 p-3" onSubmit={handleSubmit}>
        <div className="mb-3 mx-3 p-3">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="username"
            className="border rounded p-3 w-full"
            id="username"
            name="username"
            aria-describedby="usernameHelp"
            onChange={onChange}
            value={credentials.username}
          />
        </div>
        <div className="mb-3 mx-3 p-3">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            className="border rounded p-3 w-full"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <div className="container mx-3 p-3">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
