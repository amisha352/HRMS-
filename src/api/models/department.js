"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, {
        foreignKey: "dptId",
        onDelete: "",
      });
      this.belongsTo(models.User, {
        as: "manager",
        foreignKey: "managerId",
      });
      this.hasMany(models.Salary, {
        foreignKey: "dptId",
      });
      this.hasMany(models.Project, {
        foreignKey: "dptId",
      });
    }
  }
  Department.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Department",
    }
  );
  return Department;
};
