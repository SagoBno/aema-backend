module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'password'),
      queryInterface.addColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.removeColumn('Users', 'salt'),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'password'),
      queryInterface.addColumn('Users', 'password', {
        type: Sequelize.BLOB,
      }),
      queryInterface.addColumn('Users', 'salt', {
        type: Sequelize.BLOB,
      }),
    ]);
  },
};
