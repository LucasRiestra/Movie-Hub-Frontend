import "./Login.css"


function Login() {
  return (
    <div>
    <h1 className="login-title">CineXpert</h1>
    <div className="login-container">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <p>
        You don't have a account? <span className="register-link">Register</span>
      </p>
    </div>
    </div>
  );
}

export default Login;
