'use strict';
const { users } = require('../config/users_default.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const USER_TABLE_FIELDS = {
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

    await queryInterface.createTable('users', USER_TABLE_FIELDS);

    for await ( let user of users ){
      await queryInterface.bulkInsert('users', [{
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
