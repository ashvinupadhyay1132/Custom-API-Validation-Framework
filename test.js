const { validate } = require('./validation');

// Test case 1: All validations pass
console.log("Test Case 1: All validations pass");
const validBody = {
  email: "dev@mailinator.com",
  phone: 8080080800,
  username: "hello-developer",
  countryIso2: "IN",
  hobbies: ["Cricket", "Traveling"],
  age: 15,
  salary: 15000
};

const validationRules = {
  email: `required | email | lowercase`,
  phone: `label: Mobile Number | required | number | maxlength: 10`,
  username: `required | lowercase (Usernames must be lowercase) | key (Usernames must be alphanumeric and may contain dashes)`,
  countryIso2: `uppercase | exactlength: 2 | in: IN, US, CA`,
  hobbies: `array`,
  age: `number | required | between: 12, 18`,
  salary: `number | min: 12000`,
};

const result1 = validate(validBody, validationRules);
console.log(JSON.stringify(result1, null, 2));

// Test case 2: Multiple validation failures
console.log("Test Case 2: Multiple validation failures");
const invalidBody = {
  email: "DEV@MAILINATOR.COM",  
  phone: "NotANumber",          
  username: "HELLO-DEVELOPER",  
  countryIso2: "usa",           
  hobbies: "Reading",          
  age: "twenty",              
  salary: 10000                
};

const result2 = validate(invalidBody, validationRules);
console.log(JSON.stringify(result2, null, 2));

// Test case 3: Missing required fields
console.log("Test Case 3: Missing required fields");
const missingFieldsBody = {
  countryIso2: "IN",
  hobbies: ["Trekking"],
  salary: 15000
};

const result3 = validate(missingFieldsBody, validationRules);
console.log(JSON.stringify(result3, null, 2));