import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AddContext from '../Context/AddContext';


function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const { login, logout } = useContext(AddContext);
    const navigate = useNavigate();

    const { email, password } = credentials;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({...credentials, [name]: value });
    };

    const handleLogin = async () => {
        try {
            await login(credentials);
            navigate("/");
        } catch (error) {
            console.log("Error logging in:", error.message);
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
          </div>
        </div>
      );
    }
  
 
export default Login;
