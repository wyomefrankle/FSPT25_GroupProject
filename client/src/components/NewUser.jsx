import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Picture1 from '../assets/img/Picture1.png';
// import Modal from "./Modal";
// import { Modal } from "react-bootstrap";

function NewUser() {
  //   const [user_id, setUser_id] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skintype, setSkintype] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateAccount();
  };

  const handleCreateAccount = () => {
    if (!firstname || !lastname || !email || !password || !skintype) {
      alert("Please fill in all the fields.");
      return;
    }
    fetch("http://localhost:4000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // user_id: user_id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        skintype: skintype,
      }),
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error("Error creating user account");
        }
        return result.json();
      })
      .then((json) => {
        // Handle the success response from the server, e.g., show a success message
        console.log("User account created successfully:", json);
        setError("");
        alert("Account successfully created! 🌸");
        navigate("/login");
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message to the user
        console.error("Error creating user account:", error.message);
        alert("This email is already in use, please try another one.");
      });
    // Clear the form inputs after successful submission
    // setUser_id("");
    setFirstname("");
    setLastname("");
    setPassword("");
    setEmail("");
    setSkintype("");
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
    <div className="App" style={{ width: "30rem" }}>
      <h1 style= {{ textShadow: "0 0 5px rgba(255, 255, 255, 0.8)" , color: "#d3783f"}}className="title">Create Account</h1>
      <p  className="new-user-message">
        Sign up to save your favorite products!
      </p>
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        {/* <div>
          <label className="form-label">Username:</label>
          <input
            type="text"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            className="form-control"
            style={{ width: "40%" }}
          />
        </div> */}
        <div className="form-group">
          <label  className="form-label">First Name:</label>
          <input
            type="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="form-control"
            // style={{ width: "40%" , cursor: "pointer"}}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name:</label>
          <input
            type="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="form-control"
            // style={{ width: "40%" , cursor: "pointer"}}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            // style={{ width: "40%" , cursor: "pointer"}}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            // style={{ width: "40%", marginLeft: "15px", cursor: "pointer" }}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Skin Type:</label>
          <input
            type="skintype"
            value={skintype}
            onChange={(e) => setSkintype(e.target.value)}
            className="form-control"
            // style={{ width: "40%", marginLeft: "15px", cursor: "pointer"}}
          />
        </div>
        {/* <Modal
          launchBtnText="Create Account"
          modalTitle="User successfully created! "
          handleCreateAccount={handleCreateAccount}
        /> */}

        {/* Having issues with accessing the Modal so commented it out for now*/}
        {/* <button
          className="new-user-submit"
          onClick={() =>
            handleCreateAccount && alert("Account successfully created!")
          }
        >
          Submit
        </button> */}
        <button type="submit" className="submit-button" style={{
               borderRadius: "5px",
               padding: "8px 10px", // Adjust padding to maintain button size
               border: "1px solid #ccc",
               cursor: "pointer", // Add pointer cursor>
               marginLeft: "25px",
               marginTop: "10px",
              }}
              >
          Submit
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
    </div>
   
  );
}
export default NewUser;
