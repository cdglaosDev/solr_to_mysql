module.exports = {
    HOST: "127.0.0.1",
    PORT: 3306,
    USER: "root",
    PASSWORD: "chan@234",
    DB: "db_vrms",
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };