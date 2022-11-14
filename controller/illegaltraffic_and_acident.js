const Illegal_traf = require("../CleanData/illegal_traffic");
const acident = require("../CleanData/acident");
const clc = require("cli-color");

const { Illegal_traffic, Illegal_traffic_acident } = require('../models');
module.exports = {
  async createIllegaltraffic(value, vehicleId) {
    let finedate = Illegal_traf.fineDate(value)
      ? Illegal_traf.fineDate(value)
      : null;
    let releasdate = Illegal_traf.ReleasDate(value)
      ? Illegal_traf.ReleasDate(value)
      : null;
    let finelog = Illegal_traf.fineLog(value)
      ? Illegal_traf.fineLog(value)
      : null;
    if (finedate != null) {
      let data = {
        vehicle_id: vehicleId,
        date: finedate,
        status: "1",
        to_date: releasdate,
        log: finelog,
      };
      return await Illegal_traffic
        .findAll({
          where: {
            vehicle_id: vehicleId,
          },
          attributes: ["vehicle_id"],
        })
        .then(async (result) => {
          if (result.length == 0) {
            return await Illegal_traffic.create(data).then((result) => {
              console.log(clc.yellow("create Traffic is Success"));
              return result.id
            })
          } else {
            let find = await Illegal_traffic.findOne({ where: { vehicle_id: vehicleId } });
            return await find.destroy()
              .then(async () => {
                return await Illegal_traffic.create(data).then((result) => {
                  console.log(clc.yellow("create Traffic is Success"));
                  return result.id
                })
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    }
  },
  async crateAcident(value, illegal_Id) {
    let data = acident.checkData(value);
    if (data.length > 0 && illegal_Id != 0) {
      for (let index = 0; index < data.length; index++) {
        await Illegal_traffic_acident.findAll({ where: { illegal_traffic_id: illegal_Id } }).then(async result => {
          if (result.length == 0) {
            await Illegal_traffic_acident
              .create({
                illegal_traffic_id: illegal_Id,
                traffic_accidence_id: data[index],
              })
              .then(() => {
                console.log(clc.yellow("create Accident is Success"));
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            let find = await Illegal_traffic_acident.findOne({ where: { illegal_traffic_id: illegal_Id } });
            await find.destroy()
            await Illegal_traffic_acident
              .create({
                illegal_traffic_id: illegal_Id,
                traffic_accidence_id: data[index],
              })
              .then(() => {
                console.log(clc.yellow("create Accident is Success"));
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })

      }
    }
  },
};
