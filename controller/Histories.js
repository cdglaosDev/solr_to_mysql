
const hisFunc = require('../CleanData/History');
const clc = require('cli-color');
const { History } = require('../models');

module.exports = {
  async createHistory(change_province, vehicleId) {
    try {
      const vehicle = await hisFunc
        .getVehicle(vehicleId)
        .then((result) => {
          if (result == null) throw `No data at vehicle_id: ${vehicleId}`;
          else return result;
        })
        .catch((err) => {
          throw err;
        });
      const log = await hisFunc.getLogOnlyQuickId(vehicleId).catch((err) => {
        throw err;
      });
      // ------------------------------------------------------------------------
      const history = await hisFunc.getHistory(vehicleId).catch((err) => {
        throw err;
      });
      const historyCleasing = [];
      let objects = [];
      if (log.length > 0) {
        for (let i = 0; i < log.length; i++) {
          const quick_id = log[i].to;
          const historyData = await hisFunc.checkQuickId(
            quick_id,
            vehicle.vehicle_type_id,
            vehicleId
          );
          if (historyData) {
            historyCleasing.push(historyData);
          } else {
            console.log(
              clc.red(
                `quick_id at vehicle_id: ${vehicleId} is invalid -- ${quick_id}`
              )
            );
          }
          change_province.forEach(element => {
            if (element.code_old == historyData.lice_no_province_code) {
              historyData.province_code = element.code_new
            }
          });
        }
        for (let i = 0; i < historyCleasing.length; i++) {
          let obj = {
            vehicle_id: vehicle.dataValues.id,
            vehicle_kind_code: historyCleasing[i].vehicle_kind_id,
            licence_no: historyCleasing[i].lice_no_number,
            province_code: historyCleasing[i].province_code,
            start_date: vehicle.dataValues.issue_date,
            end_date: vehicle.dataValues.expire_date,
            license_no_status: i == 0 ? "uses" : "not_uses",
          };
          objects.push(obj);
        }
      } else {
        const regex = /^[\u0E81-\u0EAE\u0ED6-\u0EDF]{2,3}/;
        if (vehicle.dataValues.licence_no !== null) {
          if (regex.test(vehicle.dataValues.licence_no)) {
            let obj = {
              vehicle_id: vehicle.dataValues.id,
              vehicle_kind_code: vehicle.dataValues.vehicle_kind_code,
              licence_no: vehicle.dataValues.licence_no,
              province_code: vehicle.dataValues.province_code,
              start_date: vehicle.dataValues.issue_date,
              end_date: vehicle.dataValues.expire_date,
              license_no_status: "uses",
            };
            objects.push(obj);
          } else {
            console.log(
              clc.magentaBright(
                "License is invalid at vehicle is " + vehicle.dataValues.id
              )
            );
          }
        }
      }
      if (history.length == 0) {
        let ele = await reducArray(objects);
        for (let i = 0; i < ele.length; i++) {
          await createHistory(ele[i], vehicle);
        }
      } else {
        let ele = await reducArray(objects);
        for (let i = 0; i < ele.length; i++) {
          await updateHistory(ele[i], vehicle);
        }
      }
      objects = [];
    } catch (error) {
      throw error;
    }
  },
};
async function reducArray(arr) {
  const uniqueIds = [];

  const unique = arr.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.licence_no);

    if (!isDuplicate) {
      uniqueIds.push(element.licence_no);
      return true;
    }
    return false;
  });
  let result = []
  for (let i = 0; i < unique.length; i++) {
    result.push(unique[i]);
  }
  return result;
}


async function updateHistory(historyData, vehicle) {
  let find = await History.findOne({ where: { vehicle_id: vehicle.id } });
  return await find.destroy()
    .then(async () => {
      await createHistory(historyData, vehicle);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function createHistory(historyData, vehicle) {
  return await History.create(historyData)
    .then(() => {
      console.log(
        clc.green(`Create history of vehicle_id: ${vehicle.id} success`)
      );
    })
    .catch((err) => {
      console.log(err);
    });
}




