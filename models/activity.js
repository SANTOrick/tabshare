'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    activity_Balance: DataTypes.INTEGER
  }, {});
  Activity.associate = function(models) {
    Activity.belongsToMany(models.User, { through: "Event", foreignKey: "activity_id" });
  };
  return Activity;
};