const logFunc = require('../CleanData/Log');
const clc = require('cli-color');
const { Log } = require('../models');

module.exports = {
  async craeteLog(changelog, id) {
    if (changelog == null || changelog == "") {
      return "Log is null";
    } else {
      try {
        var log = await logFunc
          .getLogActivity(changelog)
          .then((result) => {
            return result;
          })
          .catch((err) => {
            console.log(err);
            throw "Error at getLogActivity";
          });
        await Log.findAll({ where: { vehicle_id: id } })
          .then(async (result) => {
            if (result.length == 0) {
              for (let i = 0; i < log.length; i++) {
                log[i].vehicle_id = id;
                await createNewLog(log[i]).catch((err) => {
                  throw err;
                });
              }
            } else {
              for (let i = 0; i < log.length; i++) {
                log[i].vehicle_id = id;
                const index = result.findIndex(
                  (value) =>
                    value.vehicle_id == log[i].vehicle_id &&
                    value.name == log[i].name &&
                    value.from == log[i].from &&
                    value.to == log[i].to &&
                    value.app_request_no == log[i].app_request_no &&
                    value.veh_log_activity == log[i].veh_log_activity &&
                    value.datetime == log[i].datetime
                );
                if (index == -1) {
                  await createNewLog(log[i]).catch((err) => {
                    throw err;
                  });
                } else {
                  console.log(clc.red("Log already exist"));
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
            throw "Error to find All log";
          });
        return "create log success";
      } catch (error) {
        throw error;
      }
    }
  },
};

async function createNewLog(log) {
  return await Log.create(log)
    .then(() => {
      console.log(clc.green(`Create log from id: ${log.vehicle_id} success.`));
      return true;
    })
    .catch((err) => {
      console.log(err);
      throw "Error to create new log";
    });
}

