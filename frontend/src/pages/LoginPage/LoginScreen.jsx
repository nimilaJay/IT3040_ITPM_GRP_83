import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("MenuOptionCache", "User Executive");
      history.push("/admin");
      window.location.reload();
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleRouteChange = (path) => {
    history.push(path);
  };

  return (
    <div className="login-screen">
      <div className="login-screen__content">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="login-screen__error">{error}</span>}
        <form onSubmit={loginHandler} className="login-screen__form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              tabIndex={1}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              required
              id="password"
              autoComplete="true"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              tabIndex={2}
            />
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="login-screen__button">
            Login
          </button>
          <div className="login-screen__register">
            <span>Don't have an account? </span>
            <Link to="/register">Register as Admin</Link>
          </div>
          <div className="login-screen__register">
            <span>Or </span>
            <Link to="/employeeregister">Register as Employee</Link>
          </div>
        </form>
        <button className="login-screen__employee-reports" onClick={() => handleRouteChange("/EmployeeReport")}>
          Employee Reports Portal
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
