'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Routes', [
      {
        name: 'Department',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Designation',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Leave',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Salary',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Permissions',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      

      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
