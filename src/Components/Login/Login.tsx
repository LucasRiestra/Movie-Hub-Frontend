import "./Login.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.trim()) {
      alert('Please write your email');
      return;
    }

    if (!password.trim()) {
      alert('Please write your password');
      return;
    }

    navigate('/home');
  };

  return (
    <div>
      <h1 className="login-title">CineXpert</h1>
      <div className="login-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button className="button-login" onClick={handleLogin}>Log-In</button>
        </div>
        <p>
          You don't have an account? <span className="register-link">Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
