const Sequelize = require("sequelize");
const config_db = require("../config/config_db");
const db = {};

const sequelize = new Sequelize(
  config_db.DB,
  config_db.USER,
  config_db.PASSWORD,
  {
    host: config_db.HOST,
    port: config_db.PORT,
    dialect: config_db.dialect,
    logging: config_db.logging,
    operatorAliases: false,
    pool: {
      max: config_db.pool.max,
      min: config_db.pool.min,
      acquire: config_db.pool.acquire,
      idle: config_db.pool.idle,
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Vehicle = require("./vehicle")(sequelize, Sequelize);
db.Vehicle_Old = require("./vehicle_old")(sequelize, Sequelize);
db.Changelog = require("./changelog")(sequelize, Sequelize);
db.Log = require("./vehicle_log")(sequelize, Sequelize);
db.History = require("./vehicle_history")(sequelize, Sequelize);
db.Illegal_traffic = require("./illegal_traffic")(sequelize, Sequelize);
db.Illegal_traffic_acident = require("./illegal_traffic_acident")(sequelize, Sequelize);




db.Vehicle.hasOne(db.Vehicle_Old, { foreignKey: "vehicle_id" });
db.Vehicle.hasOne(db.Changelog, { foreignKey: "vehicle_id" });
db.Vehicle.hasMany(db.Log, { foreignKey: "vehicle_id" });
db.Vehicle.hasMany(db.History, { foreignKey: "vehicle_id" });
db.Vehicle.hasMany(db.Illegal_traffic, { foreignKey: "vehicle_id" });
db.Illegal_traffic.hasMany(db.Illegal_traffic_acident, { foreignKey: "illegal_traffic_id" });

module.exports = db;