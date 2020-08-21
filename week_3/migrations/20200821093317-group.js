'use strict';
const { groups } = require('../config/groups_default.json');
const { GROUP_SCHEMA } = require('../models/group.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('groups', GROUP_SCHEMA);

    for await ( let group of groups ){
      await queryInterface.bulkInsert('groups', [{
        id: group.id,
        name: group.name,
        permissions: group.permissions
      }
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('groups');
  }
};
