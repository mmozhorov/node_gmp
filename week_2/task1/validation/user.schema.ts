export const createUserSchema = {
    type: 'object',
    required: ['login', 'password', 'age'],
    properties: {
        "age": {
            "type": "integer",
            "minimum": 4,
            "maximum": 130
        },
        "login": {
            "type": "string"
        },
        "password": {
            "type": "string"
        },
    }
};