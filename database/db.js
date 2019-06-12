const Sequelize = require("sequelize")
const db = {}
const sequelize = new sequelize("test", "root", "asda1234", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,


    pool: {
        max: 1000,
        min: 0,
        idle: 100000,
        acquire: 30000,

    }

})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db