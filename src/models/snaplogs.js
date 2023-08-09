'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SnapLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SnapLogs.init({
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    is_captured: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SnapLogs',
  });
  return SnapLogs;
};