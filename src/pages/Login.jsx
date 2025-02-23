import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  // attempt to login
  try {
    const response = await axios.post /*sends a post request to backend server*/ ("http://localhost:5000/api/login", { email, password }); /*sends email and password as request data*/
  // backend sends a response in json format { "message": "login successfull", "token": "hdfsbc"}
    setMessage(response.data.message);
    // stores the jwt token in localstorage so that the user remains logged in
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    setMessage(error.response?.data?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input  
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : "Login"}
          </button>
        </form>
        <p>
            Don't have an account? <Link to= "/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
