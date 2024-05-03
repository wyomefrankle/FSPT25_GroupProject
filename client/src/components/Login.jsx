import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AddContext from '../Context/AddContext';
import { useLocation } from 'react-router-dom';



function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const { login, logout } = useContext(AddContext);
    const navigate = useNavigate();
    

    const { email, password } = credentials;
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({...credentials, [name]: value });
    };

  
  const handleLogin = async () => {
    try {
        await login(credentials);
        setError("");
        navigate("/Profile");
    } catch (error) {
        console.error("Login failed:", error.message);
        window.alert("Incorrect email or password. Please try again. 👻");
    }
};


    const handleLogout = () => {
        try {
            logout();
        } catch (error) {
            console.log("Error logging out:", error.message);
        }
    };


    return (
      <div>
          <h1 style= {{ textShadow: "0 0 5px rgba(255, 255, 255, 0.8)" , color: "#d3783f"}}>SKINFINITY</h1>
          <p style={{ textShadow: "0 0 10px rgba(0, 0, 0, 1)" }} className="about-description" >
        Welcome to Skinfinity! Our mission is to take the guesswork out of your skincare routine to truly unlock your skin's infinite potential.
      </p>
          <div>
            <input
              value={email}
              onChange={handleChange}
              name="email"
              type="text"
              className="form-control mb-2"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={handleChange}
              name="password"
              type="password"
              className="form-control mb-2"
              placeholder="Password"
            />
            <div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-primary" onClick={handleLogin}>
                Log in
              </button>
              <button className="btn btn-outline-dark ml-2" onClick={handleLogout}>
                Log out
              </button>
            </div>
            <div className="mt-3 text-center">
              <p style= {{ textShadow: "0 0 10px rgba(0, 0, 0, 1)", fontWeight: "bold"}}>Don't have an Account?</p>
              <button className="btn btn outline-dark" onClick = {() => navigate("/new-user")}>
                Create new Account
              </button>
            </div>
          </div>
        </div>
      );
    }
  
 
export default Login;
