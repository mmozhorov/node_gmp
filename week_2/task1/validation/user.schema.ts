export const createUserSchema = {
    type: 'object',
    required: ['login', 'password', 'age'],
    items: {
        "age": {
            "type": "string",
            "minLength": 3,
            "maxLength": 30
        },
        "login": {
            "type": "string",
            "minLength": 3,
            "maxLength": 30
        },
        "password": {
            "type": "string",
            "minLength": 6,
            "maxLength": 30
        },
    }
};