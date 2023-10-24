"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Leaves", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: DataTypes.STRING,
      },
      leaveDay: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["approved", "pending", "rejected"],
        defaultValue: "pending",
      },
      leaveType: {
        type: DataTypes.ENUM,
        values: ["paid", "unpaid"],
        defaultValue: "paid",
      },
      empId: {
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
    await queryInterface.dropTable("Leaves");
  },
};
