"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "mrgId",
      });
      this.belongsTo(models.Department, {
        foreignKey: "dptId",
      });
    }
  }
  Project.init(
    {
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
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
