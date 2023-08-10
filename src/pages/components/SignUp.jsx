import React from "react";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../signupmodal.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      localStorage.setItem("userEmail", email); // Save email in local storage
      localStorage.setItem("userName", name);   // Save name in local storage
      navigate("/homepage");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };
  

  return (
    <div className="createAcc">
      <form className="signupForm" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          className="signInp"
          type="text"
          placeholder="Full Name"
          required
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="signInp"
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="signInp"
          type="password"
          placeholder="Password"
          required
        />

        <button className="signUpBtn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
