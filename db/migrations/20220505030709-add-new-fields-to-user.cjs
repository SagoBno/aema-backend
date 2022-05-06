module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => Promise.all([
      queryInterface.addColumn('Users', 'termsAcepted', {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        transaction: t,
      }),
      queryInterface.addColumn('Users', 'genre', {
        type: Sequelize.STRING,
        defaultValue: 'Otro',
        allowNull: false,
        transaction: t,
      }),
      queryInterface.addColumn('Users', 'birthday', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        transaction: t,
      }),
    ]));
  },

  async down(queryInterface) {
    return queryInterface.sequelize.transaction((t) => Promise.all([
      queryInterface.removeColumn('Users', 'termsAcepted', { transaction: t }),
      queryInterface.removeColumn('Users', 'genre', { transaction: t }),
      queryInterface.removeColumn('Users', 'birthday', { transaction: t }),
    ]));
  },
};
