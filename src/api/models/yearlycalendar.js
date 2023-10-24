"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class YearlyCalendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  YearlyCalendar.init(
    {
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
    },
    {
      sequelize,
      modelName: "YearlyCalendar",
    }
  );
  return YearlyCalendar;
};
