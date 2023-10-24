"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      discription: {
        type: DataTypes.STRING,
      },
      endDate: {
        type: DataTypes.DATEONLY,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["approved", "done", "rejected", "pending"],
        defaultValue: "pending",
      },
      empId: {
        type: DataTypes.INTEGER,
      },
      mrgId: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tasks");
  },
};
