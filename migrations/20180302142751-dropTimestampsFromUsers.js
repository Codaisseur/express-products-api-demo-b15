'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'createdAt')
      .then(_ => {
        return queryInterface.removeColumn('users', 'updatedAt');
      })
  },

  down: (queryInterface, Sequelize) => {}
};
