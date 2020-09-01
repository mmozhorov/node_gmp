'use strict';
const { users_groups } = require('../config/dump.json');
const { USER_GROUP_SCHEMA } = require('../models/users-groups.model');

module.exports = {
  up: async ( queryInterface ) => {
    await queryInterface.createTable( 'UserGroups', USER_GROUP_SCHEMA );

    for await ( let record of users_groups ){
      await queryInterface.bulkInsert( 'UserGroups', [{
        groupId: record.groupId,
        userId: record.userId
      }
      ]);
    }
  },

  down: async ( queryInterface ) => {
    await queryInterface.dropTable( 'UserGroups' );
  }
};
