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
      await queryInterface.bulkInsert('Permissions', [
        {
          routeId:1,
          roleId:1,
          canCreate:true,
          canRead:true,
          canUpdate:true,
          canDelete:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          routeId:2,
          roleId:1,
          canCreate:true,
          canRead:true,
          canUpdate:true,
          canDelete:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          routeId:3,
          roleId:1,
          canCreate:true,
          canRead:true,
          canUpdate:true,
          canDelete:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          routeId:4,
          roleId:1,
          canCreate:true,
          canRead:true,
          canUpdate:true,
          canDelete:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          routeId:5,
          roleId:1,
          canCreate:true,
          canRead:true,
          canUpdate:true,
          canDelete:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

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
