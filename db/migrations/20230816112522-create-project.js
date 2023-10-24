"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      },
      emps: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "approved", "done", "rejected"],
        defaultValue: "pending",
      },
      deadLine: {
        type: DataTypes.DATEONLY,
      },
      mrgId: {
        type: DataTypes.INTEGER,
      },
      dptId: {
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
    await queryInterface.dropTable("Projects");
  },
};
