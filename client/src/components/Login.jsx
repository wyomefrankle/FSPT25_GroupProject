import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AddContext from '../Context/AddContext';
import Picture1 from '../assets/img/Picture1.png';



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
      <div style={{
        backgroundImage: `url(${Picture1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        
          <h1 style= {{ textShadow: "0 0 10px rgba(255, 255, 255, 0.8)" , color: "#d3783f"}}>SKINFINITY</h1>
          <p style={{ textShadow: "0 0 8px rgba(0, 0, 0, 1)" }} className="about-description" >
        Welcome to Skinfinity! Our mission is to take the guesswork out of your skincare routine to truly unlock your skin's infinite potential.
      </p>
          <div className="input-container">
            <input
              value={email}
              onChange={handleChange}
              name="email"
              type="text"
              className="form-control mb-2 email-input"
              placeholder="Email"
              // style={{ borderRadius: "5px", padding: "10px", border: "1px solid #ccc", width: "120px" }}
            />
            <input
              value={password}
              onChange={handleChange}
              name="password"
              type="password"
              className="form-control mb-2 password-input"
              placeholder="Password"
              // style={{ borderRadius: "5px", padding: "10px", border: "1px solid #ccc", width: "120px" }}
            />
            </div>
             <div className="login-container">
             <button className="btn btn-primary" onClick={handleLogin}>Log in</button>
            <button className="btn btn-light" onClick={handleLogout}>Log out</button>
            </div>
            <div className="mt-3 text-center">
            <p style={{ textShadow: "0 0 10px rgba(0, 0, 0, 1)", color: "#f6eee9", fontWeight: "bold" }}>Don't have an Account?</p>
            <button className="btn btn-light btn-create-account" onClick={() => navigate("/new-user")}>Create new Account</button>
         </div>
       </div>

      );
     }
 
export default Login;
