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
      "Designations",
      [
        {
          name: "CFO",
          salary: 50000,
          dptId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Finance Manager",
          salary: 30000,
          dptId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Accountant",
          salary: 35000,
          dptId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "CIO",
          salary: 60000,
          dptId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "It Manager",
          salary: 40000,
          dptId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Web developer",
          salary: 30000,
          dptId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "CMO",
          salary: 50000,
          dptId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marketing Manager",
          salary: 30000,
          dptId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Digital Marketing Assistant",
          salary: 10000,
          dptId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "CHRO",
          salary: 65000,
          dptId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HR Manager",
          salary: 50000,
          dptId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Requitment Officer",
          salary: 35000,
          dptId: 4,
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
      
     */
    await queryInterface.bulkDelete("Designations", null, {});
  },
};
