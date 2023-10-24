"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Designation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, {
        foreignKey: "dsgId",
      });
      this.belongsTo(models.Department, {
        foreignKey: "dptId",
        onDelete: "CASCADE",
      });
    }
  }
  Designation.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      salary: {
        type: DataTypes.BIGINT,
      },
      dptId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Designation",
    }
  );
  return Designation;
};
