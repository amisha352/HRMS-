"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Departments",
      [
        {
          name: "Finance",
          managerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marketing",
          managerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "It",
          managerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Human Resource",
          managerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
