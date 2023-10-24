'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role,{
        foreignKey:'roleId'
      })
      this.belongsTo(models.Routes,{
        foreignKey:'routeId'
      })
    }
  }
  Permissions.init({
   roleId:{
    type:DataTypes.INTEGER
   },
   routeId:{
    type:DataTypes.INTEGER
   },
   canCreate:{
    type:DataTypes.BOOLEAN
   },
   canRead:{
    type:DataTypes.BOOLEAN
   },
   canUpdate:{
    type:DataTypes.BOOLEAN
   },
   canDelete:{
    type:DataTypes.BOOLEAN
   }
  }, {
    sequelize,
    modelName: 'Permissions',
  });
  return Permissions;
};