import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Log.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  // attempt to login
  try {
    const response = await axios.post /*sends a post request to backend server*/ ("http://localhost:5000/api/login", { email, password }); /*sends email and password as request data*/
  // backend sends a response in json format { "message": "login successfull", "token": "hdfsbc"}
   console.log("Login API Response", response.data);
    // stores the jwt token in localstorage so that the user remains logged in
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  } catch (error) {
    setMessage(error.response?.data?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Login</h2>
        {message && <p className="message">{message}</p>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
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
          <div className="input-group">
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
          <button type="submit" className="login" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : "Login"}
          </button>
        </form>
        <p className="signup">
            Don't have an account? <Link to= "/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
