'use strict';
const { groups } = require('../config/groups_default.json');
const { GROUP_SCHEMA } = require('../models/groups.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Groups', GROUP_SCHEMA);

    for await ( let group of groups ){
      await queryInterface.bulkInsert('Groups', [{
        id: group.id,
        name: group.name,
        permissions: group.permissions
      }
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Groups');
  }
};
