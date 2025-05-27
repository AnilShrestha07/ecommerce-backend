const {Sequelize} = require("sequelize");
const { PostgresConfig } = require("./constants");

const sequelize = new Sequelize(PostgresConfig.dbName, PostgresConfig.user, PostgresConfig.password, {
    host: PostgresConfig.host,
    dbName: PostgresConfig.dbName,
    dialect: PostgresConfig.dialect,
    pool: true
})



module.exports = sequelize