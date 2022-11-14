const cleansing = require('../CleanData/Cleansing');
const clc = require('cli-color');
const { Vehicle, Vehicle_Old, Changelog } = require('../models');
const { connection } = require('../config/config_mysql2');

module.exports = {
  async findVehicle(noteId) {
    return new Promise((resolve, reject) => {
      connection.execute(
        `SELECT id FROM vehicles WHERE binary note_id = "${noteId}" `,
        (err, result) => {
          if (err) console.log(err);
          if (result.length == 0) {
            resolve(false);
          } else {
            resolve(result[0].id);
          }
          reject(err);
        }
      );
    });
    // return await Vehicle.findAll({
    //   where: { note_id: noteId },
    //   attributes: ["id"],
    // })
    //   .then(async (result) => {
    //     if (result.length == 0) {
    //       return false;
    //     } else {
    //       return result[0].id;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     process.exit(0);
    //   });
  },
  //
  async createNewVehicle(vehicle, cleansingData) {
    return await getCleansing(vehicle, cleansingData).then(async (data) => {
      return await Vehicle.create(data.vehicles)
        .then(async (result) => {

          // vehicle old
          data.vehicle_old.vehicle_id = result.id;
          await Vehicle_Old.create(data.vehicle_old).then(() => {
            console.log(clc.green("Create vehicle_old success"))
          })


          // change log
          data.log.vehicle_id = result.id;
          await Changelog.create(data.log).then(() => {
            console.log(clc.green("Create change log success"))
          })

          console.log(
            clc.green(
              "Create new vehicle success note_Id: " + vehicle.note_id_t
            )
          );
          return result.id;
        })
        .catch((err) => {
          console.log(err);
          process.exit(0);
        });
    })
      .catch((err) => {
        console.log(err);
        process.exit(0);
      });
  },

  // update
  async updateVehicle(vehicle, cleansingData, id) {
    return await getCleansing(vehicle, cleansingData).then(async (data) => {
      const vh = await Vehicle.findByPk(id);
      return await vh.update(data.vehicles)
        .then(async (result) => {

          // vehicle old
          data.vehicle_old.vehicle_id = result.id;
          const old = await Vehicle_Old.findOne({ where: { vehicle_id: id } });
          await old.update(data.vehicle_old).then(() => {
            console.log(clc.yellow("update Vehicle old success"));
          })

          // // change log
          data.log.vehicle_id = result.id;
          const log = await Changelog.findOne({ where: { vehicle_id: id } });
          await log.update(data.log).then(() => {
            console.log(clc.yellow("update change log success"))
          })
          console.log(
            clc.yellow(
              "Update vehicle success note_Id: " + vehicle.note_id_t
            )
          );
          return id;
        })
        .catch((err) => {
          console.log(err);
          process.exit(0);
        });
    })
      .catch((err) => {
        console.log(err);
        process.exit(0);
      });
  },
};

async function getCleansing(vehicle, cleansingData) {
  return await cleansing
    .cleansingData(vehicle, cleansingData)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
}
