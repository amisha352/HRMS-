"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.User, {
        foreignKey: "empId",
      });
      this.belongsTo(models.User, {
        as: "Manager",
        foreignKey: "mrgId",
      });
    }
  }
  Tasks.init(
    {
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
    },
    {
      sequelize,
      modelName: "Tasks",
    }
  );
  return Tasks;
};
