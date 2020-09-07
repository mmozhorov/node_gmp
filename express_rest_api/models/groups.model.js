const Sequelize = require('sequelize');

module.exports.GROUP_SCHEMA = {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    permissions: Sequelize.ARRAY(Sequelize.STRING)
};