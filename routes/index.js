var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");
const multer = require("multer");
const upload = multer({ dest: "public/img/" });
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



// Function to fetch avatars for all users
const getAvatar = async (req, res) => {
  try {
    const results = await db("SELECT id, avatar FROM users;");
    res.send(results.data);
  } catch (err) {
    // Handle any errors that occur during the database query
    res.status(500).send(err);
  }
};

// Endpoint to handle GET requests for avatars
router.get("/avatar", userShouldBeLoggedin, getAvatar);

// Endpoint to handle POST requests for uploading avatars
router.post("/avatar", userShouldBeLoggedin, upload.single("avatarfile"), async (req, res) => {
  console.log("Request received to upload avatar:", req.file);

  const avatarfile = req.file;

  // Check if a file was uploaded
  if (!avatarfile) {
    console.log("No file uploaded");
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Extract file extension and generate a unique filename
  const extension = mime.extension(avatarfile.mimetype);
  const filename = uuidv4() + "." + extension;

  // Define paths for temporary and target locations
  const tmp_path = avatarfile.path;
  const target_path = path.join(__dirname, "../public/img/") + filename;

  try {
    // Move the uploaded file to the target location
    await fs.rename(tmp_path, target_path);

    // Retrieve the user ID from the request
    const userId = req.user_id;
    console.log("User id:", req.user_id);

    // Update the user's avatar filename in the database
    await db(`UPDATE users SET avatar = "${filename}" WHERE id = ${userId}`);
    console.log("Avatar uploaded successfully");

    // Retrieve and send updated avatar data to the client
    getAvatar(req, res);

    // Send a success response (commented out for now)
    // res.status(201).json({ message: "Avatar uploaded successfully" });
  } catch (err) {
    // Handle errors that occur during file upload or database update
    console.error("Error uploading avatar", err);
    res.status(500).json({ error: "Internal server error" });
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



router.get("/favorites", userShouldBeLoggedin, async (req, res) => {
  try{
  const results = await db(`SELECT * FROM favorites WHERE user_id = ${req.user_id}`);
      res.send(results.data);
    } catch(err) {
      res.status(500).send(err);
    }
  });
  
  router.post("/favorites", userShouldBeLoggedin, async (req, res) => {
    const { product_type, brand, name, price, productURL } = req.body;

    try {
      const results = await db(
        `INSERT INTO favorites (user_id, product_type, brand, name, price, productURL) VALUES ("${req.user_id}", "${product_type}", "${brand}", "${name}", "${price}", "${productURL}")`);

      if (results.error) {
        throw results.error;
      }
      res.status(201).json({ message: "Favorite created successfully" });
    } catch (err) {
      console.error("Error creating favorite:", err);
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  });

  router.delete("/favorites/:id", userShouldBeLoggedin, async(req, res) => {
    try {
      const results = await db(
        `DELETE FROM favorites WHERE id = ${req.params.id} AND user_id = ${req.user_id}`);
      res.status(200).json({ message: "Favorite deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
