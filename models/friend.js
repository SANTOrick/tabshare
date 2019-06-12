'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Friend.associate = function(models) {
    Friend.belongsToMany(models.User, {through: "Friendship", foreignKey: "user_id" })
  };
  return Friend;
};