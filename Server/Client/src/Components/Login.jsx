import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Importing icons
// import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  axios.defaults.withCredentials = true;

  const validateLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        if (result.status === 200) {
          localStorage.setItem("token", result.data.token);
          navigate("/home");
        } else {
          setErrorMessage(result.data.msg);
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.msg);
      });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, rgb(10, 25, 50), rgb(30, 60, 90))", // Dark blue RGB gradient
      }}
    >
      <div
        className="card p-4"
        style={{
          width: "400px",
          backgroundColor: "white", // Change card background to white
          border: "1px solid #ced4da",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h3 className="text-center text-dark mb-4">Login</h3> {/* Change text color to dark */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={validateLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="text-dark">Email</label> {/* Change label color to dark */}
            <div className="input-group">
              <span className="input-group-text bg-light text-dark"><FaEnvelope /></span> {/* Light background for icon */}
              <input
                type="email"
                id="email"
                className="form-control"
                style={{ backgroundColor: 'rgba(245, 245, 245, 1)', color: 'black' }} // Light input field
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="text-dark">Password</label> {/* Change label color to dark */}
            <div className="input-group">
              <span className="input-group-text bg-light text-dark"><FaLock /></span> {/* Light background for icon */}
              <input
                type="password"
                id="password"
                className="form-control"
                style={{ backgroundColor: 'rgba(245, 245, 245, 1)', color: 'black' }} // Light input field
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              background: 'linear-gradient(to right, rgb(0, 0, 128), rgb(0, 0, 200))', // Dark blue gradient for button
              color: 'white',
            }}
          >
            Login
          </button>
        </form>
        <div className="mt-2 text-center">
          <p className="small text-dark">Not registered yet? <a href="/" className="text-decoration-none text-primary">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
