'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("banners", {
      id:{
        type: Sequelize.UUID,
        require: true,
        primaryKey: true,
        default: Sequelize.UUIDV4()
      },
      title:{
        type: Sequelize.STRING,
        require: true
      },
      url:{
        type: Sequelize.STRING,
        require: true
      },
      status:{
        type: Sequelize.STRING,
        enum:['active','inactive'],
        default: 'inactive'
      },
      image:{
        type: Sequelize.JSON
      },
      createdAt:{
        type: Sequelize.DATE,
        default: Date.now()
      },
       updatedAt:{
        type: Sequelize.DATE,
        default: Date.now()
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("banners")
  }
};
