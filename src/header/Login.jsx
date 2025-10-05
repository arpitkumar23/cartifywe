import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/Title.css";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const res = await axios.post("https://back-y9z8.onrender.com/api/register", formData);
        toast.success(res.data.message || "Registration successful");
        setCurrentState("Login");
      } else {
        const res = await axios.post("https://back-y9z8.onrender.com/api/login", {
          email: formData.email,
          password: formData.password,
        });

        const { accessToken, refreshToken, user } = res.data.data;

        if (accessToken && user) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("role", user.role);

          window.dispatchEvent(new Event("userUpdated"));

          toast.success(res.data.message || "Login Successful");

          if (user.role === 1) {
            navigate("/adminPanel");
          } else {
            navigate("/");
          }
        } else {
          toast.error("Token or user info missing from response");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={ handleSubmit }>
        <h2>{ currentState }</h2>

        { currentState === "Sign Up" && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={ formData.name }
            onChange={ handleChange }
            required
          />
        ) }

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={ formData.email }
          onChange={ handleChange }
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={ formData.password }
          onChange={ handleChange }
          required
        />

        <button type="submit">{ currentState }</button>

        { currentState === "Login" ? (
          <p>
            Don’t have an account?{ " " }
            <span onClick={ () => setCurrentState("Sign Up") }>Sign Up</span>
          </p>
        ) : (
          <p>
            Already have an account?{ " " }
            <span onClick={ () => setCurrentState("Login") }>Login</span>
          </p>
        ) }
      </form>
    </div>
  );
};

export default Login;
