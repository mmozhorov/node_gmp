'use strict';
const { users } = require('../config/users_default.json');
const { USER_SCHEMA } = require('../models/user.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', USER_SCHEMA);

    for await ( let user of users ){
      await queryInterface.bulkInsert('users', [{
        id: user.id,
        login: user.login,
        password: user.password,
        age: user.age
      }
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
