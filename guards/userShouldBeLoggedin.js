const jwt = require("jsonwebtoken");
require("dotenv").config();


const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedin(req, res, next) {
    const token = req.headers["authorization"]?.replace(/^Bearer\s/, ""); 
  
    if (!token) {
        return res.status(401).send({ message: "Please provide a token" });
    }
  
    jwt.verify(token, supersecret, function (err, decoded) {
        if (err) {
            return res.status(401).send({ message: err.message });
        } else {
            req.user_id = decoded.user_id;
            next();
        }
    });
}

module.exports = userShouldBeLoggedin;