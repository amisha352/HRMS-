"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("YearlyCalendars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      month: {
        type: DataTypes.STRING,
      },
      totalDays: {
        type: DataTypes.INTEGER,
      },
      holydays: {
        type: DataTypes.INTEGER,
      },
      holydaysNm: {
        type: DataTypes.STRING,
      },
      workingDays: {
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
    await queryInterface.dropTable("YearlyCalendars");
  },
};
