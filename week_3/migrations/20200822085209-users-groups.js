'use strict';
const { USER_GROUP_SCHEMA } = require('../models/users-groups.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserGroup', USER_GROUP_SCHEMA);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserGroup');
  }
};
