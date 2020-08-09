const Sequelize = require('sequelize');

export const USER_SCHEMA = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
};