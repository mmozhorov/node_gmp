const USER_AGE_PROPERTIES = {
    "type": "integer",
    "minimum": 4,
    "maximum": 130
};

const USER_LOGIN_PROPERTIES = {
    "type": "string"
};

const USER_PASSWORD_PROPERTIES = {
    "type": "string",
    "pattern": "(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,255})$"
};

export const createUserSchema = {
    type: 'object',
    required: ['login', 'password', 'age'],
    properties: {
        "age": USER_AGE_PROPERTIES,
        "login": USER_LOGIN_PROPERTIES,
        "password": USER_PASSWORD_PROPERTIES,
    }
};

export const updateUserSchema = {
    type: 'object',
    required: [],
    properties: {
        "age": USER_AGE_PROPERTIES,
        "login": USER_LOGIN_PROPERTIES,
        "password": USER_PASSWORD_PROPERTIES,
    }
};