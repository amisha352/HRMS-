"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, {
        foreignKey: "mrgId",
      });
      this.belongsTo(models.User, {
        foreignKey: "mrgId",
      });
      this.belongsTo(models.Role, {
        foreignKey: "roleId",
      });
      this.belongsTo(models.Department, {
        foreignKey: "dptId",
      });
      this.belongsTo(models.Designation, {
        foreignKey: "dsgId",
      });
      this.hasOne(models.Department, {
        as: "manager",
        foreignKey: "managerId",
      });
      this.hasOne(models.Worklog, {
        foreignKey: "empId",
      });
      this.hasMany(models.Leave, {
        foreignKey: "empId",
      });
      this.hasMany(models.Salary, {
        foreignKey: "empId",
      });
      this.hasMany(models.Tasks, {
        foreignKey: "empId",
      });
      this.hasMany(models.Tasks, {
        as: "Manager",
        foreignKey: "mrgId",
      });
      this.hasMany(models.Project, {
        foreignKey: "mrgId",
      });
      this.hasMany(models.Feedback, {
        foreignKey: "empId",
      });
      this.hasMany(models.Feedback, {
        as: "Mrg",
        foreignKey: "mrgId",
      });
      this.hasMany(models.Leave,{
        as:'mrg',
        foreignKey:'mrgId'
      })
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      jwtToken: {
        type: DataTypes.STRING,
      },
      otp: {
        type: DataTypes.STRING,
      },
      roleId: {
        type: DataTypes.INTEGER,
      },
      profilePic: {
        type: DataTypes.STRING,
        defaultValue: "/public/user.png",
      },
      workingDays: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      workingHours: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
