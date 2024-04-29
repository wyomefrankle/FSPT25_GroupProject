import { useState } from "react";
// import Modal from "./Modal";
// import { Modal } from "react-bootstrap";

function NewUser() {
  //   const [user_id, setUser_id] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skintype, setSkintype] = useState("");

  const handleCreateAccount = () => {
    fetch("/users", {
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
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message to the user
        console.error("Error creating user account:", error.message);
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
    <div className="App" style={{ width: "30rem" }}>
      <h1 className="title">Create Account</h1>
      <p className="new-user-message">
        Sign up to save your favorite products!
      </p>
      <form className="form">
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
        <div>
          <label className="form-label">First Name:</label>
          <input
            type="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="form-control"
            style={{ width: "40%" }}
          />
        </div>
        <div>
          <label className="form-label">Last Name:</label>
          <input
            type="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="form-control"
            style={{ width: "40%" }}
          />
        </div>
        <div>
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control-email"
            style={{ width: "40%" }}
          />
        </div>
        <div>
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            style={{ width: "40%" }}
          />
        </div>
        <div>
          <label className="form-label">Skin Type:</label>
          <input
            type="skintype"
            value={skintype}
            onChange={(e) => setSkintype(e.target.value)}
            className="form-control"
            style={{ width: "40%" }}
          />
        </div>
        {/* <Modal
          launchBtnText="Create Account"
          modalTitle="User successfully created! "
          handleCreateAccount={handleCreateAccount}
        /> */}

        {/* Having issues with accessing the Modal so commented it out for now*/}
        <button
          className="new-user-submit"
          onClick={() =>
            handleCreateAccount && alert("Account successfully created!")
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default NewUser;
