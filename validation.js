function validate(data, rules) {
    const errors = {};

    // Check each field 
    Object.keys(rules).forEach(field => {
        const fieldRules = extractRules(rules[field]);
        const value = data[field];
        const fieldName = fieldRules.label || field;

        if (!fieldRules.required && isEmpty(value)) {
            return;
        }

        for (const rule of fieldRules.rules) {
            if (!checkRule(rule.name, value, rule.params)) {
                errors[field] = rule.message || createErrorMessage(rule.name, fieldName, rule.params);
                break;
            }
        }
    });

    if (Object.keys(errors).length > 0) {
        return {
            code: "C000",
            codeKey: "Client error",
            errors
        };
    }

    return {
        code: "0000",
        codeKey: "Ok",
        data: {}
    };
}

//Check if a value is empty
function isEmpty(value) {
    return value === undefined || value === null || value === '';
}

//Extract structured rules from rule string
function extractRules(ruleString) {
    const result = {
        rules: [],
        required: false,
        label: null
    };

    const ruleParts = ruleString.split('|').map(part => part.trim());

    ruleParts.forEach(part => {

        if (part.startsWith('label:')) {
            result.label = part.substring('label:'.length).trim();
            return;
        }

        if (part === 'required') {
            result.required = true;
        }

        // Create rule object
        const rule = {
            name: part,
            params: null,
            message: null
        };

        //Extract custom error message if present
        const messageMatch = part.match(/(.+)\s+\((.+)\)/);
        if (messageMatch) {
            rule.name = messageMatch[1].trim();
            rule.message = messageMatch[2].trim();
        }

        const paramMatch = rule.name.match(/(.+):\s*(.+)/);
        if (paramMatch) {
            rule.name = paramMatch[1].trim();
            rule.params = paramMatch[2].split(',').map(p => p.trim());
        }

        result.rules.push(rule);
    });

    return result;
}

//Check if a value passes a specific validation rule
function checkRule(ruleName, value, params) {

    if (isEmpty(value)) {
        return ruleName !== 'required';
    }

    switch (ruleName) {
        case 'required':
            return !isEmpty(value);

        case 'email':
            return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        case 'lowercase':
            return typeof value === 'string' && value === value.toLowerCase();

        case 'uppercase':
            return typeof value === 'string' && value === value.toUpperCase();

        case 'number':
            return typeof value === 'number' || (typeof value === 'string' && !isNaN(value));

        case 'array':
            return Array.isArray(value);

        case 'maxlength':
            return String(value).length <= parseInt(params[0]);

        case 'exactlength':
            return String(value).length === parseInt(params[0]);

        case 'in':
            return params.includes(value);

        case 'between':
            const num = Number(value);
            const min = Number(params[0]);
            const max = Number(params[1]);
            return !isNaN(num) && num >= min && num <= max;

        case 'min':
            return Number(value) >= Number(params[0]);

        case 'key':
            return typeof value === 'string' && /^[a-z0-9-]+$/.test(value);

        default:
            return true;
    }
}

//Create error message for failed validation
function createErrorMessage(ruleName, fieldName, params) {
    switch (ruleName) {
        case 'required':
            return `${fieldName} is required.`;

        case 'email':
            return `${fieldName} must be a valid email address.`;

        case 'lowercase':
            return `${fieldName} must be lowercase.`;

        case 'uppercase':
            return `${fieldName} must be uppercase.`;

        case 'number':
            return `${fieldName} must be a number.`;

        case 'array':
            return `${fieldName} must be an array.`;

        case 'maxlength':
            return `${fieldName} must not exceed ${params[0]} characters.`;

        case 'exactlength':
            return `${fieldName} must be exactly ${params[0]} characters.`;

        case 'in':
            return `${fieldName} must be one of: ${params.join(', ')}.`;

        case 'between':
            return `${fieldName} must be between ${params[0]} and ${params[1]}.`;

        case 'min':
            return `${fieldName} must be at least ${params[0]}.`;

        case 'key':
            return `${fieldName} can only contain alphanumeric characters or dashes.`;

        default:
            return `${fieldName} is invalid.`;
    }
}

module.exports = { validate };