# Custom API Validation Framework

A flexible and powerful validation framework for Node.js APIs that allows for custom validation rules and error messages.

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Usage

### Running the API

```bash
node app.js
```

The API will start on port 3000 by default.

### Testing the validation framework

```bash
node test.js
```

### Making API requests

Use any HTTP client (like Postman, curl, etc.) to make POST requests to `/api/validate` with a JSON body.

Example valid request:
```json
{
  "email": "dev@mailinator.com",
  "phone": 8080080800,
  "username": "hello-developer",
  "countryIso2": "IN",
  "hobbies": ["Reading", "Traveling"],
  "age": 15,
  "salary": 15000
}
```

## Project Structure

- `validation.js` - The core validation framework
- `app.js` - Express API implementation
- `test.js` - Test script for validation rules

## Validation Rules

The following validation rules are supported:

- `required` - Field must be present and not empty
- `email` - Field must be a valid email address
- `lowercase` - Field must be lowercase
- `uppercase` - Field must be uppercase
- `number` - Field must be a number
- `array` - Field must be an array
- `maxlength: n` - Field must not exceed n characters
- `exactlength: n` - Field must be exactly n characters
- `in: a, b, c` - Field must be one of the specified values
- `between: min, max` - Number must be between min and max
- `min: n` - Number must be at least n
- `key` - Field must contain only alphanumeric characters or dashes

## Custom Error Messages
To specify a custom error message, add it in parentheses after the rule:

```
lowercase (Usernames must be lowercase)
```

## Custom Field Labels

To specify a custom field label for error messages, use:

```
label: Mobile Number
```
