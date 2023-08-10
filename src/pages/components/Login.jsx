import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import '../../pages/signup.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      navigate('/homepage');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      alert('Wrong Username or Password');
    }
  };

  return (
    <div id="loginModal">
      <form onSubmit={handleSubmit} className="signupForm">
        <input
          onChange={e => setName(e.target.value)}
          className="signInp"
          type="text"
          placeholder="Full Name"
          required
        />
        <input
          onChange={e => setEmail(e.target.value)}
          className="signInp"
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          onChange={e => setPassword(e.target.value)}
          className="signInp"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit" className="signUpBtn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
