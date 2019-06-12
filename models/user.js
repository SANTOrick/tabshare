'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    balance: DataTypes.INTEGER 
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Activity, { through: "Event", foreignKey: "user_id" });
    User.belongsToMany(models.Friend, {through: "Friendship", foreignKey: "user_id" })
  };
  return User;
};