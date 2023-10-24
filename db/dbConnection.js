const Sequelize = require("sequelize");
const dbConfig = require("./config")[process.env.NODE_ENV];

const connection = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
    // pool: {
    //     max: 30,
    //     min: 0,
    //     acquire: 10000000,
    //     idle: 1000000
    // },
  }
);

module.exports = connection;
