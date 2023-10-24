"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Salary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.User, {
        foreignKey: "empId",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Department, {
        foreignKey: "dptId",
        onDelete: "CASCADE",
      });
    }
  }
  Salary.init(
    {
      empId: {
        type: DataTypes.INTEGER,
      },
      dptId: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.DOUBLE,
      },
      workingDays: {
        type: DataTypes.INTEGER,
      },
      totalLeaves: {
        type: DataTypes.INTEGER,
      },
      workingHours: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "Salary",
    }
  );
  return Salary;
};
