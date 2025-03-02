const express = require('express');
const { validate } = require('./validation');
const app = express();
const PORT = 3000;

app.use(express.json());

// API endpoint with validation
app.post('/api/validate', (req, res) => {
  const validationRules = {
    email: `required | email | lowercase`,
    phone: `label: Mobile Number | required | number | maxlength: 10`,
    username: `required | lowercase (Usernames must be lowercase) | key (Usernames must be alphanumeric and may contain dashes)`,
    countryIso2: `uppercase | exactlength: 2 | in: IN, US, CA`,
    hobbies: `array`,
    age: `number | required | between: 12, 18`,
    salary: `number | min: 12000`,
  };
  
  const result = validate(req.body, validationRules);
  res.json(result);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    code: "E000",
    codeKey: "Server error",
    message: "An internal server error occurred"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});