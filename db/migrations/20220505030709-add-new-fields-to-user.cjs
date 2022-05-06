module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'termsAcepted', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });
    await queryInterface.addColumn('Users', 'genre', {
      type: Sequelize.STRING,
      defaultValue: 'Otro',
      allowNull: false,
    });
    await queryInterface.addColumn('Users', 'birthday', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Users', 'termsAcepted');
    await queryInterface.removeColumn('Users', 'genre');
    await queryInterface.removeColumn('Users', 'birthday');
  },
};
