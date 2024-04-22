var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDR7RxChfeLuMtqGjWMq5LcwTuYmgpBkxE");

// ...

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// ...
async function run() {
  const prompt = "Give me a recommendation for a skincare product for oily skin that is available in the US and less than 20 USD and accessible in most stores."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();

module.exports = router;
