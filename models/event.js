'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    activity_id: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
  };
  return Event;
};