"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
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
      this.belongsTo(models.User, {
        as: "Mrg",
        foreignKey: "mrgId",
        onDelete: "CASCADE",
      });
    }
  }
  Feedback.init(
    {
      description: {
        type: DataTypes.STRING,
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
      modelName: "Feedback",
    }
  );
  return Feedback;
};
