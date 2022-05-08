module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => Promise.all([
      queryInterface.renameColumn('Users', 'firstName', 'parentFirstName'),
      queryInterface.renameColumn('Users', 'lastName', 'parentLastName'),
      queryInterface.renameColumn('Users', 'birthday', 'childBirthday'),
      queryInterface.addColumn('Users', 'parentBirthday', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        transaction: t,
      }),
      queryInterface.addColumn('Users', 'childFirstName', {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false,
        transaction: t,
      }),
      queryInterface.addColumn('Users', 'childLastName', {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false,
        transaction: t,
      }),
    ]));
  },

  async down(queryInterface) {
    return queryInterface.sequelize.transaction((t) => Promise.all([
      queryInterface.renameColumn('Users', 'parentFirstName', 'firstName'),
      queryInterface.renameColumn('Users', 'parentLastName', 'lastName'),
      queryInterface.renameColumn('Users', 'childBirthday', 'birthday'),
      queryInterface.removeColumn('Users', 'termsAcepted', { transaction: t }),
      queryInterface.removeColumn('Users', 'genre', { transaction: t }),
      queryInterface.removeColumn('Users', 'birthday', { transaction: t }),
    ]));
  },
};
