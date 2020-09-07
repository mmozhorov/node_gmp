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

const ERROR_MESSAGES = {
    type: 'should be an object',
    required: {
        login: 'should have an string property "login"',
        password: 'should have a string property "password"',
        age: 'should have a number property "age"'
    },
    properties: {
        password: 'Password property should contain no less 1 number and 1 letter',
        age: 'Age property should be between 4 and 130'
    }
}

export const createUserSchema = {
    type: 'object',
    required: ['login', 'password', 'age'],
    properties: {
        "age": USER_AGE_PROPERTIES,
        "login": USER_LOGIN_PROPERTIES,
        "password": USER_PASSWORD_PROPERTIES,
    },
    errorMessage: ERROR_MESSAGES
};

export const updateUserSchema = {
    type: 'object',
    required: [],
    properties: {
        "age": USER_AGE_PROPERTIES,
        "login": USER_LOGIN_PROPERTIES,
        "password": USER_PASSWORD_PROPERTIES,
    },
    errorMessage: ERROR_MESSAGES
};