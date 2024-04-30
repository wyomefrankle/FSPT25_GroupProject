require('dotenv').config();
var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const {API_KEY} = process.env; //storing in env variable for security reasons
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access API key as an environment variable
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//AI response to skincare quiz for user
router.get('/', async (req, res) => {
  try {
  const { skintype, budget, country, skinconcern } = req.query;
const prompt = `
Give me recommendations for skincare products based on the following criteria:

Skin Type: ${skintype}
Budget: less than ${budget} USD
Country: ${country}
Skin Concern: ${skinconcern}

Please provide recommendations for the following product categories:
- Cleanser: [Number of recommendations = 3]
- Toner: [Number of recommendations = 3]
- Serum: [Number of recommendations = 3]
- Moisturizer: [Number of recommendations = 3]

Ensure that the recommendations meet the following criteria:
- Availability: Products should be accessible in most stores.
- Price: All recommended products should be lower than ${budget}.
- Format: Provide the response in a structured format suitable for backend integration with an SQL table.

The expected format for each product recommendation is as follows:
{
  "product_type": "Cleanser/Toner/Serum/Face Cream",
  "brand": "Brand Name",
  "name": "Product Name",
  "price": "Price",
  "imageURL": "URL of the product image",
  "productURL": "URL of the product"
}

Please ensure that the response is in plain text without any formatting like bold characters. Additionally, decimal numbers should use a period (.) as the decimal separator. Only display the object so that the data can be easily parsed in JSON format. Ensure each recommendation object should be separated by a newline character (\n) to ensure proper splitting and parsing. Each product recommendation should be enclosed in curly braces {}, and the entire set of recommendations should be within square brackets [] to form a JSON array.`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text)
  res.json({text});

} catch (error) {
  console.error('Error using Gemini AI:', error);
  response.status(500).json({ error: 'An error occurred while using Gemini AI' });
}
});


module.exports = router;
