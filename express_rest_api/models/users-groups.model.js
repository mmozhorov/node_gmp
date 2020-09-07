const Sequelize = require('sequelize');

module.exports.USER_GROUP_SCHEMA = {
    groupId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    }
};