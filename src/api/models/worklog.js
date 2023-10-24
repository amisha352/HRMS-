"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Worklog extends Model {
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
    }
  }
  Worklog.init(
    {
      in: {
        type: DataTypes.DATE,
      },
      out: {
        type: DataTypes.DATE,
      },
      workingHours:{
        type:DataTypes.FLOAT
      },
      empId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Worklog",
    }
  );
  return Worklog;
};
