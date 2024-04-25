var express = require('express');
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const saltRounds = 10;
const userShouldBeLoggedin = require("../guards/userShouldBeLoggedin");

const supersecret = process.env.SUPER_SECRET;


router.get("/users", function(req, res, next) {
  db("SELECT * FROM users;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.post("/users", async (req, res) => {
  const { firstname, lastname, password, email, skintype } = req.body;

  try{
    if (!firstname || !lastname || !password || !email || !skintype ) {
      return res.status(400).json({ error: "All fields are required" });
     }

     const hash = await bcrypt.hash(password, saltRounds);
     const results = await db(
     `INSERT INTO users ( firstname, lastname, password, email, skintype ) VALUES ("${firstname}", "${lastname}", "${hash}", "${email}", "${skintype}")`); 

     if (results.error) {
      throw results.error;
     }

     return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/users/login", async(req, res) => {
  const { email, password } = req.body;

  try {
    const results = await db(`SELECT * FROM users WHERE email = "${email}"`);
    const user = results.data[0];

    if (!user) {
      return res.status(401).json({ error: "Incorrect username or password" }); // First response
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect username or password" }); // Second response
    }

    const token = jwt.sign({ user_id: user.id }, supersecret);

    return res.json({ message: "Successfully logged in", token });

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/profile", userShouldBeLoggedin, async (req, res) => {
  try {
    const userId = req.user_id;
    const results = await db(`SELECT * FROM users WHERE id = ${userId}`);
    res.send(results.data[0]);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

router.get('/auth/status', userShouldBeLoggedin, (req, res) => {
  try {
      // If userShouldBeLoggedin middleware passes, user is authenticated
      // You can also add additional checks here if needed
      res.status(200).json({ authenticated: true, message: 'User is authenticated' });
  } catch (err) {
      // If userShouldBeLoggedin middleware fails, user is not authenticated
      res.status(401).json({ authenticated: false, message: 'User is not authenticated' });
  }
});


router.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists
    const existingUser = await db(`SELECT * FROM users WHERE id = ${userId}`);
    if (existingUser.data.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Delete the user from the database
    await db(`DELETE FROM users WHERE id = ${userId}`);

    console.log("User deleted successfully:", userId);
    
    // Return a success message upon successful deletion
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error:", err); // Log any errors that occur
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});



module.exports = router;
