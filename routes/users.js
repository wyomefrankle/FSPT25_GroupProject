require('dotenv').config();
var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const {API_KEY} = process.env; //storing in env variable for security reasons
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

async function run() {
  const prompt = "Give me recommendations for skincare products for oily skin that is available in the US and less than 20 USD and accessible in most stores. I want 3 product recommendations for a cleanser, 3 recommendations for a toner, 3 recommendations for a serum, 3 recommendations for a face cream. Note: Please make the output be in an easy to use object format that I can post to the backend of a full stack js app that has an SQL table like this: CREATE TABLE SkincareProducts (id INT PRIMARY KEY AUTO_INCREMENT, product_type VARCHAR(50) NOT NULL, brand VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, price DECIMAL(5,2) NOT NULL, description TEXT, imageURL TEXT);"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();

module.exports = router;
