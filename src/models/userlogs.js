'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserLogs.init({
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    is_userloggedin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserLogs',
  });
  return UserLogs;
};