module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameColumn('Users', 'firstName', 'parentFirstName'),
      queryInterface.renameColumn('Users', 'lastName', 'parentLastName'),
      queryInterface.renameColumn('Users', 'birthday', 'childBirthday'),
      queryInterface.addColumn('Users', 'parentBirthday', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      }),
      queryInterface.addColumn('Users', 'childFirstName', {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false,
      }),
      queryInterface.addColumn('Users', 'childLastName', {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface) {
    return Promise.all([
      queryInterface.renameColumn('Users', 'parentFirstName', 'firstName'),
      queryInterface.renameColumn('Users', 'parentLastName', 'lastName'),
      queryInterface.renameColumn('Users', 'childBirthday', 'birthday'),
      queryInterface.removeColumn('Users', 'childLastName'),
      queryInterface.removeColumn('Users', 'childFirstName'),
      queryInterface.removeColumn('Users', 'parentBirthday'),
    ]);
  },
};
