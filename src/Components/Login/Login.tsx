import { useAuth0 } from '@auth0/auth0-react';
import "./Login.css";



function Login() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className='login-container'>
      <h1 className="login-title">CineXpress</h1>
      
        <button className="button-login" onClick={handleLogin}>
          Log-In
        </button>
      
    </div>
  );
}

export default Login;
