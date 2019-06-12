'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friendship = sequelize.define('Friendship', {
    user_id: DataTypes.INTEGER,
    friend_id: DataTypes.INTEGER,
    friend_name: DataTypes.STRING
  }, {});
  Friendship.associate = function(models) {
  };
  return Friendship;
};