"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Leave extends Model {
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
      this.belongsTo(models.User,{
        as:'mrg',
        foreignKey:'mrgId'
      })
    }
  }
  Leave.init(
    {
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
      mrgId: {
        type:DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: "Leave",
    }
  );
  return Leave;
};
