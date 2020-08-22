const NAME_PROPERTIES = {
    "type": "string"
};

const PERMISSIONS_PROPERTIES = {
    "type": "array"
};

const ERROR_MESSAGES = {
    type: 'should be an object',
    required: {
        name: 'should have an string property "name"',
        permissions: 'should have a string property "permissions"'
    }
}

export const createGroupSchema = {
    type: 'object',
    required: ['name', 'permissions'],
    properties: {
        "name": NAME_PROPERTIES,
        "permissions": PERMISSIONS_PROPERTIES
    },
    errorMessage: ERROR_MESSAGES
};

export const updateGroupSchema = {
    type: 'object',
    required: [],
    properties: {
        "name": NAME_PROPERTIES,
        "permissions": PERMISSIONS_PROPERTIES
    },
    errorMessage: ERROR_MESSAGES
};