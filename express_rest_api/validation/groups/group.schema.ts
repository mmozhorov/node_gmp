const NAME_PROPERTIES = {
    "type": "string"
};

const PERMISSIONS_PROPERTIES = {
    "type": "array",
    "items": {
        type:'string',
        transform:['trim','toEnumCase'],
        enum:[ 'READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES' ]
    }
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